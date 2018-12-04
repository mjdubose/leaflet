var app = angular.module('leafletApp', ['leaflet-directive']);




app.controller('leafletController', ['$scope', function leafletController($scope) {

    angular.extend($scope, {
        sanFran: {
            lat: 37.8294,
            lng: -122.2668,
            zoom: 12
        },
        markers: {}
    });


    $scope.triggerpoint = {
        orientation: 'target'
    };

   var  turnTripIdPointArraysIntoTriggerPoints = function(newArray, triggerpoints,orientation, triggerpointStore, route) {

        var pointArray = newArray.sort(_sortById).reduce(_combineConsecutiveArrays, []);

        for (var i = 0; i < pointArray.length; i++) {
            _addStopOrPointMarker(pointArray[i], i);
        }

        var clonedArray = [].concat(pointArray.reverse());
        var tp;


        for (var j = 0; j < clonedArray.length - 1; j++) {
            if (clonedArray[j].stop_sequence) {

                tp = _buildTriggerPoint(clonedArray, j, orientation);
                if (!triggerpointStore[route]) {
                    triggerpointStore[route] = {};
                }
                if (!triggerpointStore[route][clonedArray[j].headsign]) {
                    triggerpointStore[route][clonedArray[j].headsign] = {}
                }
                var insertObj = {};
                insertObj.first = tp;

                if (tp.length > 0) {
                    triggerpointStore[route][clonedArray[j].headsign][clonedArray[j].stop_id] = insertObj;
                    triggerpoints.push(tp);
                }
            }
        }

    };

    var computeDistanceAndBearing = function (lat1, lon1, lat2, lon2, bearings) {
        // Based on http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf
        // using the "Inverse Formula" (section 4)

        var bearing, bearing1;

        if (bearings) {
            bearing = true;
            bearing1 = true;
        }

        var MAXITERS = 20;
        // Convert lat/long to radians
        lat1 *= Math.PI / 180.0;
        lat2 *= Math.PI / 180.0;
        lon1 *= Math.PI / 180.0;
        lon2 *= Math.PI / 180.0;

        var a = 6378137.0; // WGS84 major axis
        var b = 6356752.3142; // WGS84 semi-major axis
        var f = (a - b) / a;
        var aSqMinusBSqOverBSq = (a * a - b * b) / (b * b);

        var L = lon2 - lon1;
        var A = 0.0;
        var U1 = Math.atan((1.0 - f) * Math.tan(lat1));
        var U2 = Math.atan((1.0 - f) * Math.tan(lat2));

        var cosU1 = Math.cos(U1);
        var cosU2 = Math.cos(U2);
        var sinU1 = Math.sin(U1);
        var sinU2 = Math.sin(U2);
        var cosU1cosU2 = cosU1 * cosU2;
        var sinU1sinU2 = sinU1 * sinU2;

        var sigma = 0.0;
        var deltaSigma = 0.0;
        var cosSqAlpha = 0.0;
        var cos2SM = 0.0;
        var cosSigma = 0.0;
        var sinSigma = 0.0;
        var cosLambda = 0.0;
        var sinLambda = 0.0;

        var lambda = L; // initial guess
        for (var iter = 0; iter < MAXITERS; iter++) {
            var lambdaOrig = lambda;
            cosLambda = Math.cos(lambda);
            sinLambda = Math.sin(lambda);
            var t1 = cosU2 * sinLambda;
            var t2 = cosU1 * sinU2 - sinU1 * cosU2 * cosLambda;
            var sinSqSigma = t1 * t1 + t2 * t2; // (14)
            sinSigma = Math.sqrt(sinSqSigma);
            cosSigma = sinU1sinU2 + cosU1cosU2 * cosLambda; // (15)
            sigma = Math.atan2(sinSigma, cosSigma); // (16)
            var sinAlpha = (sinSigma === 0) ? 0.0 : cosU1cosU2 * sinLambda
                / sinSigma; // (17)
            cosSqAlpha = 1.0 - sinAlpha * sinAlpha;
            cos2SM = (cosSqAlpha === 0) ? 0.0 : cosSigma - 2.0 * sinU1sinU2
                / cosSqAlpha; // (18)

            var uSquared = cosSqAlpha * aSqMinusBSqOverBSq; // defn
            A = 1 + (uSquared / 16384.0) * // (3)
                (4096.0 + uSquared * (-768 + uSquared * (320.0 - 175.0 * uSquared)));
            var B = (uSquared / 1024.0) * // (4)
                (256.0 + uSquared * (-128.0 + uSquared * (74.0 - 47.0 * uSquared)));
            var C = (f / 16.0) * cosSqAlpha * (4.0 + f * (4.0 - 3.0 * cosSqAlpha)); // (10)
            var cos2SMSq = cos2SM * cos2SM;
            deltaSigma = B
                * sinSigma
                * // (6)
                (cos2SM + (B / 4.0)
                    * (cosSigma * (-1.0 + 2.0 * cos2SMSq) - (B / 6.0) * cos2SM
                        * (-3.0 + 4.0 * sinSigma * sinSigma)
                        * (-3.0 + 4.0 * cos2SMSq)));

            lambda = L
                + (1.0 - C)
                * f
                * sinAlpha
                * (sigma + C * sinSigma
                    * (cos2SM + C * cosSigma * (-1.0 + 2.0 * cos2SM * cos2SM))); // (11)

            var delta = (lambda - lambdaOrig) / lambda;
            if (Math.abs(delta) < 1.0e-12) {
                break;
            }
        }
        var results = [];
        var distance = (b * A * (sigma - deltaSigma));
        results.push(distance);
        if (bearing) {
            var initialBearing = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2
                - sinU1 * cosU2 * cosLambda);
            initialBearing *= 180.0 / Math.PI;
            results.push(initialBearing);
            if (bearing1) {
                var finalBearing = Math.atan2(cosU1 * sinLambda, -sinU1 * cosU2
                    + cosU1 * sinU2 * cosLambda);
                finalBearing *= 180.0 / Math.PI;
                results.push(finalBearing);
            }
        }
        return results;

    };

    var computeDestinationAndBearing = function (lat1, lon1, brng, dist) {
        var a = 6378137, b = 6356752.3142, f = 1 / 298.257223563;

        var s = dist;
        var alpha1 = toRad(brng);
        var sinAlpha1 = Math.sin(alpha1);
        var cosAlpha1 = Math.cos(alpha1);

        var tanU1 = (1 - f) * Math.tan(toRad(lat1));
        var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
        var sigma1 = Math.atan2(tanU1, cosAlpha1);
        var sinAlpha = cosU1 * sinAlpha1;
        var cosSqAlpha = 1 - sinAlpha * sinAlpha;
        var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
        var A = 1 + uSq / 16384
            * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
        var sinSigma = 0, cosSigma = 0, deltaSigma = 0, cos2SigmaM = 0;
        var sigma = s / (b * A), sigmaP = 2 * Math.PI;

        while (Math.abs(sigma - sigmaP) > 1e-12) {
            cos2SigmaM = Math.cos(2 * sigma1 + sigma);
            sinSigma = Math.sin(sigma);
            cosSigma = Math.cos(sigma);
            deltaSigma = B
                * sinSigma
                * (cos2SigmaM + B
                    / 4
                    * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6
                        * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma)
                        * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
            sigmaP = sigma;
            sigma = s / (b * A) + deltaSigma;
        }

        var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
        var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
            (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
        var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1
            * sinSigma * cosAlpha1);
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        var L = lambda
            - (1 - C)
            * f
            * sinAlpha
            * (sigma + C * sinSigma
                * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
        var lon2 = (toRad(lon1) + L + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalise
        // to
        // -180...+180

        var revAz = Math.atan2(sinAlpha, -tmp); // final bearing, if required

        var results = [];

        results.push(toDegrees(lat2));
        results.push(toDegrees(lon2));
        // results.push(toDegrees(revAz));

        return results;

    };

    var toRad = function (angle) {
        return angle * Math.PI / 180;
    };

    var toDegrees = function (radians) {
        return radians * 180 / Math.PI;
    }

    var latLngDistance = function (lat1, lon1, lat2, lon2) {
        if ((((lat1 * 1) - (lat2 * 1)) === 0) && ((lon1 * 1) - (lon2 * 1) === 0)) {
            return 0;
        }

        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist;
    };

    var _calcLatLngDistance = function (lat1, lon1, lat2, lon2) {
        return latLngDistance(lat1, lon1, lat2, lon2) * 1609.34; //get distance in miles and convert to meters
    };

    var _combineConsecutiveArrays = function (combined, point) {
        var lastValue;

        var x;
        if (combined.length === 0) {
            point.array.forEach(function (item) {
                x = item;
                x.lat = x.lat * 1;
                x.lon = x.lon * 1;
                x.shape_dist_traveled = x.shape_dist_traveled * 1;
                x.headsign = x.headsign.split(' ').join('_');
                combined.push(x);
            });
        } else {
            var priorLastArrayItem = combined[combined.length - 1];
            point.array.forEach(function (item) {
                if (!lastValue) lastValue = combined[combined.length - 1].shape_dist_traveled;
                x = item;
                x.lat = x.lat * 1;
                x.lon = x.lon * 1;
                x.shape_dist_traveled = x.shape_dist_traveled * 1 + lastValue;
                x.headsign = x.headsign.split(' ').join('_');
                if (priorLastArrayItem.lon !== x.lon && priorLastArrayItem.lat !== x.lat) {
                    combined.push(x);
                }
            });
        }
        return combined;
    };

    var _sortById = function (a, b) {
        if (a.id < b.id) {
            return -1
        } else if (a.id === b.id) {
            return 0;
        } else {
            return 1;
        }
    };

    var _addStopOrPointMarker = function (point, num) {

        if (point.stop_id) {
            $scope.markers['stop' + point.stop_id + num] =
                {
                    lat: point.lat * 1,
                    lng: point.lon * 1,
                    draggable: false,
                    message: point.stop_id,
                    icon: {
                        type: "awesomeMarker",
                        icon: "star",
                        markerColor: 'red'
                    }
                };
        } else if (point.shape_pt_sequence) {
            $scope.markers['point' + point.shape_pt_sequence + num] =
                {
                    lat: point.lat * 1,
                    lng: point.lon * 1,
                    draggable: false,
                    message: 'point ' + point.shape_pt_sequence,
                    icon: {
                        type: "awesomeMarker",
                        icon: "star",
                        markerColor: 'blue'
                    }
                };
        }

    };

    var _getBorderingPoints = function (center, currentStop, clonedArray, j) {

        var index = 1;
        while (((j + index) < clonedArray.length - 1) && (center > _calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon))) {  //get going until we are over 40 meters or we hit the last item in the array
            center = center - _calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon);
            index = index + 1;
        }
        return {
            nextMaxPoint: clonedArray[j + index],
            nextMinPoint: clonedArray[j + index - 1],
            distance: center
        };
    };

    var _getBorderingPointsFollowingPreviousStop = function (center, currentStop, clonedArray, j) {
        var stopindex = 1;
        while (!clonedArray[j + stopindex].stop_id && ((j + stopindex) < clonedArray.length - 1)) {

            stopindex++;
        }

        if (clonedArray[j + stopindex].stop_id) {
            var previousStop = clonedArray[j + stopindex];
            var index = -1;
            //loop until we are over center meters or we hit the first item in the array
            while (((j + stopindex + index) > 0) && (center > _calcLatLngDistance(previousStop.lat, previousStop.lon, clonedArray[j + stopindex + index].lat, clonedArray[j + stopindex + index].lon))) {


                center = center - _calcLatLngDistance(previousStop.lat, previousStop.lon, clonedArray[j + stopindex + index].lat, clonedArray[j + stopindex + index].lon);
                index = index - 1;
            }
            var returnedObj = {
                nextMaxPoint: clonedArray[j + stopindex + index],
                nextMinPoint: clonedArray[j + stopindex + index + 1],
                distance: center
            };

            return returnedObj;
        } else {
            return {};
        }
    };

    var getTriggerPointForTarget = function (center, currentStop, clonedArray, j) {
        var borderPoints = _getBorderingPoints(center, currentStop, clonedArray, j);
        var check = computeDistanceAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon, borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon, true);
        var computed = computeDestinationAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon, check[2], borderPoints.distance);
        return ({lat: computed[0], lon: computed[1], stop: currentStop.stop_id});
    };

    var getTriggerPointLocatedFollowingPreviousStop = function (center, currentStop, clonedArray, j) {
        var borderPoints = _getBorderingPointsFollowingPreviousStop(center, currentStop, clonedArray, j);
        if (borderPoints.nextMaxPoint) {

            var check = computeDistanceAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon, borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon, true);
            var computed = computeDestinationAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon, check[2], borderPoints.distance);
            return ({lat: computed[0], lon: computed[1], stop: currentStop.stop_id});
        } else {
            return {};
        }
    };

    var _buildTriggerPoint = function (clonedArray, j, proximity) {
        var currentStop = clonedArray[j];

        //we have a stop and now we need to find a lat/lng that is 40 meters away
        //lets get items in the array until we are over 40 meters away then we want to grab that item and the one before
        //and we'll have a line in which the 40 meter point is in.  default distances for center points are 55 and 85..
        //[55,85]

        //we need to determine if trigger points with default values will fit between stops.. if not we need to reduce the trigger point center point default distances

        var distanceTracker = 0;

        var previousPoint = currentStop;

        for (var counter = 1; (j + counter < clonedArray.length); counter++) {

            var currentPoint = clonedArray[j + counter];
            distanceTracker = distanceTracker + _calcLatLngDistance(previousPoint.lat, previousPoint.lon, currentPoint.lat, currentPoint.lon);
            previousPoint = currentPoint;
            if (currentPoint.stop_id) {
                break;
            }

        }
        var distance = [55, 85];
        while (distanceTracker < distance[0] && distanceTracker < distance[1]) {
            distance = distance.map(function (item) {
                return item / 2;
            });
        }

        if (proximity !== 'target') {
            distance = distance.reverse();
        }
        var triggerpoint = [];
        distance.forEach(function (center) {
            if (proximity === 'target') {
                triggerpoint.push(getTriggerPointForTarget(center, currentStop, clonedArray, j, triggerpoint));
            } else {

                var test = getTriggerPointLocatedFollowingPreviousStop(center, currentStop, clonedArray, j, triggerpoint);

                if (test.lon) {
                    triggerpoint.push(test);
                }
            }
        });

        return triggerpoint;
    };

    var _makeTriggerPointMarker = function (i, triggerpoint) {
        $scope.markers['triggerpointclosest' + i] =
            {
                lat: triggerpoint[0].lat * 1,
                lng: triggerpoint[0].lon * 1,
                draggable: false,
                message: 'exit ' + triggerpoint[0].stop,
                icon: {
                    type: "awesomeMarker",
                    icon: "star",
                    markerColor: 'green'
                }
            };
        $scope.markers['triggerpointfarthest' + i] =
            {
                lat: triggerpoint[1].lat * 1,
                lng: triggerpoint[1].lon * 1,
                draggable: false,
                message: 'entry ' + triggerpoint[1].stop,
                icon: {
                    type: "awesomeMarker",
                    icon: "star",
                    markerColor: 'green'
                }
            };
    };


    $scope.route = "powell";
    $scope.service_id = "sat";
    $scope.headsign = "to BART Station";

    var onkarrSays = {
        "shapesAndStops": [
            {
                "route": "holldcut", "data": {
                    "authorityId": "emery-avas", "route": "holldcut", "sat": {
                        "228": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "Loop",
                            "trip_id": "230"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "Loop",
                            "trip_id": "230"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "330.6392",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "346.9929",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "541.3525",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "992.4247",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1024.9488",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1297.7274",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1317.1054",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1543.4938",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1683.5166",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1713.4594",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1809.4369",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 14,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1835.9861",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 15,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1955.5289",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 16,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1981.8569",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 17,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2000.2852",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2179.7421",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "2446.7046",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 20,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "2464.8440",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 21,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2681.6706",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3029.2695",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3137.6438",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 24,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3290.0117",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 25,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3309.4588",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 26,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3354.2690",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 27,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3435.8672",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3467.5581",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 30,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3818.4230",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3839.8340",
                            "lat": "37.8409",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 32,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3969.5052",
                            "lat": "37.8412",
                            "lon": "-122.2898",
                            "shape_pt_sequence": 33,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3986.8472",
                            "lat": "37.8413",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 34,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4015.2824",
                            "stop_sequence": 8,
                            "stop_id": "ho59_o",
                            "stop_name": "Hollis at 59th",
                            "lat": "37.8416",
                            "lon": "-122.2897",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4409.4007",
                            "stop_sequence": 9,
                            "stop_id": "ho64_o",
                            "stop_name": "Hollis at 64th",
                            "lat": "37.8450",
                            "lon": "-122.2908",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4619.5971",
                            "stop_sequence": 10,
                            "stop_id": "ho65_o",
                            "stop_name": "Hollis at 65th",
                            "lat": "37.8468",
                            "lon": "-122.2914",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "4904.3846",
                            "lat": "37.8493",
                            "lon": "-122.2922",
                            "shape_pt_sequence": 38,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "4944.9422",
                            "lat": "37.8497",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 39,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5045.9902",
                            "lat": "37.8499",
                            "lon": "-122.2910",
                            "shape_pt_sequence": 40,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5082.2897",
                            "lat": "37.8502",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 41,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5192.5382",
                            "lat": "37.8511",
                            "lon": "-122.2910",
                            "shape_pt_sequence": 42,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5306.0009",
                            "lat": "37.8521",
                            "lon": "-122.2914",
                            "shape_pt_sequence": 43,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5317.9556",
                            "lat": "37.8522",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 44,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5472.4168",
                            "stop_sequence": 11,
                            "stop_id": "bbowl_i",
                            "stop_name": "Berkeley Bowl West",
                            "lat": "37.8525",
                            "lon": "-122.2897",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5472.4168",
                            "lat": "37.8524",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 46,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5530.0748",
                            "lat": "37.8520",
                            "lon": "-122.2895",
                            "shape_pt_sequence": 47,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5544.7656",
                            "lat": "37.8518",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 48,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5687.4117",
                            "lat": "37.8515",
                            "lon": "-122.2911",
                            "shape_pt_sequence": 49,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5703.4833",
                            "lat": "37.8514",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 50,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5841.4941",
                            "lat": "37.8502",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 51,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5860.9613",
                            "lat": "37.8500",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 52,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5956.0646",
                            "lat": "37.8498",
                            "lon": "-122.2920",
                            "shape_pt_sequence": 53,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5992.6609",
                            "lat": "37.8496",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 54,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6013.8608",
                            "lat": "37.8494",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 55,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6186.7624",
                            "lat": "37.8479",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 56,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6215.0111",
                            "lat": "37.8478",
                            "lon": "-122.2916",
                            "shape_pt_sequence": 57,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6462.9743",
                            "lat": "37.8483",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 58,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6480.5702",
                            "lat": "37.8483",
                            "lon": "-122.2886",
                            "shape_pt_sequence": 59,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "6572.2399",
                            "stop_sequence": 12,
                            "stop_id": "vall66_i",
                            "stop_name": "Vallejo at 66th",
                            "lat": "37.8475",
                            "lon": "-122.2884",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6588.6601",
                            "lat": "37.8474",
                            "lon": "-122.2884",
                            "shape_pt_sequence": 62,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6842.0071",
                            "lat": "37.8468",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 63,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6867.5060",
                            "lat": "37.8467",
                            "lon": "-122.2915",
                            "shape_pt_sequence": 64,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "6883.2029",
                            "stop_sequence": 13,
                            "stop_id": "65ho_i",
                            "stop_name": "65th at Hollis",
                            "lat": "37.8465",
                            "lon": "-122.2914",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7075.5503",
                            "lat": "37.8449",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 66,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "7214.8427",
                            "stop_sequence": 14,
                            "stop_id": "ho64_i",
                            "stop_name": "Hollis at 63rd",
                            "lat": "37.8437",
                            "lon": "-122.2905",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7276.5098",
                            "lat": "37.8431",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 68,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "7522.5556",
                            "stop_sequence": 15,
                            "stop_id": "ho59_i",
                            "stop_name": "Hollis at 59th (Emery Station)",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7827.1114",
                            "lat": "37.8383",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 70,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7932.8563",
                            "lat": "37.8375",
                            "lon": "-122.2883",
                            "shape_pt_sequence": 71,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "8135.2429",
                            "stop_sequence": 16,
                            "stop_id": "ho53_i",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8357",
                            "lon": "-122.2875",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8232.6242",
                            "lat": "37.8349",
                            "lon": "-122.2872",
                            "shape_pt_sequence": 73,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "8438.8168",
                            "stop_sequence": 17,
                            "stop_id": "ho45_i",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8331",
                            "lon": "-122.2865",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8660.7448",
                            "lat": "37.8312",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 75,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8687.3766",
                            "lat": "37.8311",
                            "lon": "-122.2855",
                            "shape_pt_sequence": 76,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "8946.9793",
                            "stop_sequence": 18,
                            "stop_id": "pix_i",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8317",
                            "lon": "-122.2827",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9043.5461",
                            "lat": "37.8319",
                            "lon": "-122.2816",
                            "shape_pt_sequence": 78,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9064.3761",
                            "lat": "37.8319",
                            "lon": "-122.2814",
                            "shape_pt_sequence": 79,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "9172.1690",
                            "stop_sequence": 19,
                            "stop_id": "em40_i",
                            "stop_name": "Emery at 40th",
                            "lat": "37.8309",
                            "lon": "-122.2811",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9201.7830",
                            "lat": "37.8307",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 81,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9422.6025",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 82,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9450.1889",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 83,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9668.4174",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 84,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9963.0900",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 85,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "10292.4441",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 86,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "10404.0621",
                            "stop_sequence": 20,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "10456.6046",
                            "stop_sequence": 21,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "228",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "10470.4092",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 89,
                            "headsign": "Loop"
                        }]
                    }, "sun": {
                        "229": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "Loop",
                            "trip_id": "230"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "Loop",
                            "trip_id": "230"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "330.6392",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "346.9929",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "541.3525",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "992.4247",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1024.9488",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1297.7274",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1317.1054",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1543.4938",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1683.5166",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1713.4594",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1809.4369",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 14,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1835.9861",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 15,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1955.5289",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 16,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1981.8569",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 17,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "2000.2852",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "2179.7421",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "2446.7046",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 20,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "2464.8440",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 21,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "2681.6706",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3029.2695",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3137.6438",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 24,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3290.0117",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 25,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3309.4588",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 26,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3354.2690",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 27,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3435.8672",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3467.5581",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 30,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3818.4230",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3839.8340",
                            "lat": "37.8409",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 32,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3969.5052",
                            "lat": "37.8412",
                            "lon": "-122.2898",
                            "shape_pt_sequence": 33,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3986.8472",
                            "lat": "37.8413",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 34,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "4015.2824",
                            "stop_sequence": 8,
                            "stop_id": "ho59_o",
                            "stop_name": "Hollis at 59th",
                            "lat": "37.8416",
                            "lon": "-122.2897",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "4409.4007",
                            "stop_sequence": 9,
                            "stop_id": "ho64_o",
                            "stop_name": "Hollis at 64th",
                            "lat": "37.8450",
                            "lon": "-122.2908",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "4619.5971",
                            "stop_sequence": 10,
                            "stop_id": "ho65_o",
                            "stop_name": "Hollis at 65th",
                            "lat": "37.8468",
                            "lon": "-122.2914",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "4904.3846",
                            "lat": "37.8493",
                            "lon": "-122.2922",
                            "shape_pt_sequence": 38,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "4944.9422",
                            "lat": "37.8497",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 39,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5045.9902",
                            "lat": "37.8499",
                            "lon": "-122.2910",
                            "shape_pt_sequence": 40,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5082.2897",
                            "lat": "37.8502",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 41,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5192.5382",
                            "lat": "37.8511",
                            "lon": "-122.2910",
                            "shape_pt_sequence": 42,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5306.0009",
                            "lat": "37.8521",
                            "lon": "-122.2914",
                            "shape_pt_sequence": 43,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5317.9556",
                            "lat": "37.8522",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 44,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "5472.4168",
                            "stop_sequence": 11,
                            "stop_id": "bbowl_i",
                            "stop_name": "Berkeley Bowl West",
                            "lat": "37.8525",
                            "lon": "-122.2897",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5472.4168",
                            "lat": "37.8524",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 46,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5530.0748",
                            "lat": "37.8520",
                            "lon": "-122.2895",
                            "shape_pt_sequence": 47,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5544.7656",
                            "lat": "37.8518",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 48,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5687.4117",
                            "lat": "37.8515",
                            "lon": "-122.2911",
                            "shape_pt_sequence": 49,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5703.4833",
                            "lat": "37.8514",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 50,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5841.4941",
                            "lat": "37.8502",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 51,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5860.9613",
                            "lat": "37.8500",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 52,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5956.0646",
                            "lat": "37.8498",
                            "lon": "-122.2920",
                            "shape_pt_sequence": 53,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5992.6609",
                            "lat": "37.8496",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 54,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6013.8608",
                            "lat": "37.8494",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 55,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6186.7624",
                            "lat": "37.8479",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 56,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6215.0111",
                            "lat": "37.8478",
                            "lon": "-122.2916",
                            "shape_pt_sequence": 57,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6462.9743",
                            "lat": "37.8483",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 58,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6480.5702",
                            "lat": "37.8483",
                            "lon": "-122.2886",
                            "shape_pt_sequence": 59,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "6572.2399",
                            "stop_sequence": 12,
                            "stop_id": "vall66_i",
                            "stop_name": "Vallejo at 66th",
                            "lat": "37.8475",
                            "lon": "-122.2884",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6588.6601",
                            "lat": "37.8474",
                            "lon": "-122.2884",
                            "shape_pt_sequence": 62,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6842.0071",
                            "lat": "37.8468",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 63,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6867.5060",
                            "lat": "37.8467",
                            "lon": "-122.2915",
                            "shape_pt_sequence": 64,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "6883.2029",
                            "stop_sequence": 13,
                            "stop_id": "65ho_i",
                            "stop_name": "65th at Hollis",
                            "lat": "37.8465",
                            "lon": "-122.2914",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7075.5503",
                            "lat": "37.8449",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 66,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "7214.8427",
                            "stop_sequence": 14,
                            "stop_id": "ho64_i",
                            "stop_name": "Hollis at 63rd",
                            "lat": "37.8437",
                            "lon": "-122.2905",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7276.5098",
                            "lat": "37.8431",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 68,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "7522.5556",
                            "stop_sequence": 15,
                            "stop_id": "ho59_i",
                            "stop_name": "Hollis at 59th (Emery Station)",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7827.1114",
                            "lat": "37.8383",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 70,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7932.8563",
                            "lat": "37.8375",
                            "lon": "-122.2883",
                            "shape_pt_sequence": 71,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "8135.2429",
                            "stop_sequence": 16,
                            "stop_id": "ho53_i",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8357",
                            "lon": "-122.2875",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8232.6242",
                            "lat": "37.8349",
                            "lon": "-122.2872",
                            "shape_pt_sequence": 73,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "8438.8168",
                            "stop_sequence": 17,
                            "stop_id": "ho45_i",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8331",
                            "lon": "-122.2865",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8660.7448",
                            "lat": "37.8312",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 75,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8687.3766",
                            "lat": "37.8311",
                            "lon": "-122.2855",
                            "shape_pt_sequence": 76,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "8946.9793",
                            "stop_sequence": 18,
                            "stop_id": "pix_i",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8317",
                            "lon": "-122.2827",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9043.5461",
                            "lat": "37.8319",
                            "lon": "-122.2816",
                            "shape_pt_sequence": 78,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9064.3761",
                            "lat": "37.8319",
                            "lon": "-122.2814",
                            "shape_pt_sequence": 79,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "9172.1690",
                            "stop_sequence": 19,
                            "stop_id": "em40_i",
                            "stop_name": "Emery at 40th",
                            "lat": "37.8309",
                            "lon": "-122.2811",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9201.7830",
                            "lat": "37.8307",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 81,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9422.6025",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 82,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9450.1889",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 83,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9668.4174",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 84,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9963.0900",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 85,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "10292.4441",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 86,
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "10404.0621",
                            "stop_sequence": 20,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "10456.6046",
                            "stop_sequence": 21,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "229",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "10470.4092",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 89,
                            "headsign": "Loop"
                        }]
                    }, "wkd": {
                        "230": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "Loop",
                            "trip_id": "230"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "Loop",
                            "trip_id": "230"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "330.6392",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "346.9929",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "541.3525",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "992.4247",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1024.9488",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1297.7274",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1317.1054",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1543.4938",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1683.5166",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1713.4594",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1809.4369",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 14,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1835.9861",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 15,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1955.5289",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 16,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "1981.8569",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 17,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2000.2852",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2179.7421",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "2446.7046",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 20,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "2464.8440",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 21,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2681.6706",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3029.2695",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3137.6438",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 24,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3290.0117",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 25,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3309.4588",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 26,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3354.2690",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 27,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3435.8672",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3467.5581",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 30,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3818.4230",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3839.8340",
                            "lat": "37.8409",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 32,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3969.5052",
                            "lat": "37.8412",
                            "lon": "-122.2898",
                            "shape_pt_sequence": 33,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "3986.8472",
                            "lat": "37.8413",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 34,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4015.2824",
                            "stop_sequence": 8,
                            "stop_id": "ho59_o",
                            "stop_name": "Hollis at 59th",
                            "lat": "37.8416",
                            "lon": "-122.2897",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4409.4007",
                            "stop_sequence": 9,
                            "stop_id": "ho64_o",
                            "stop_name": "Hollis at 64th",
                            "lat": "37.8450",
                            "lon": "-122.2908",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4619.5971",
                            "stop_sequence": 10,
                            "stop_id": "ho65_o",
                            "stop_name": "Hollis at 65th",
                            "lat": "37.8468",
                            "lon": "-122.2914",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "4904.3846",
                            "lat": "37.8493",
                            "lon": "-122.2922",
                            "shape_pt_sequence": 38,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "4944.9422",
                            "lat": "37.8497",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 39,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5045.9902",
                            "lat": "37.8499",
                            "lon": "-122.2910",
                            "shape_pt_sequence": 40,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5082.2897",
                            "lat": "37.8502",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 41,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5192.5382",
                            "lat": "37.8511",
                            "lon": "-122.2910",
                            "shape_pt_sequence": 42,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5306.0009",
                            "lat": "37.8521",
                            "lon": "-122.2914",
                            "shape_pt_sequence": 43,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5317.9556",
                            "lat": "37.8522",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 44,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5472.4168",
                            "stop_sequence": 11,
                            "stop_id": "bbowl_i",
                            "stop_name": "Berkeley Bowl West",
                            "lat": "37.8525",
                            "lon": "-122.2897",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5472.4168",
                            "lat": "37.8524",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 46,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5530.0748",
                            "lat": "37.8520",
                            "lon": "-122.2895",
                            "shape_pt_sequence": 47,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5544.7656",
                            "lat": "37.8518",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 48,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5687.4117",
                            "lat": "37.8515",
                            "lon": "-122.2911",
                            "shape_pt_sequence": 49,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5703.4833",
                            "lat": "37.8514",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 50,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5841.4941",
                            "lat": "37.8502",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 51,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5860.9613",
                            "lat": "37.8500",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 52,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5956.0646",
                            "lat": "37.8498",
                            "lon": "-122.2920",
                            "shape_pt_sequence": 53,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "5992.6609",
                            "lat": "37.8496",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 54,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6013.8608",
                            "lat": "37.8494",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 55,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6186.7624",
                            "lat": "37.8479",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 56,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6215.0111",
                            "lat": "37.8478",
                            "lon": "-122.2916",
                            "shape_pt_sequence": 57,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6462.9743",
                            "lat": "37.8483",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 58,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6480.5702",
                            "lat": "37.8483",
                            "lon": "-122.2886",
                            "shape_pt_sequence": 59,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "6572.2399",
                            "stop_sequence": 12,
                            "stop_id": "vall66_i",
                            "stop_name": "Vallejo at 66th",
                            "lat": "37.8475",
                            "lon": "-122.2884",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6588.6601",
                            "lat": "37.8474",
                            "lon": "-122.2884",
                            "shape_pt_sequence": 62,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6842.0071",
                            "lat": "37.8468",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 63,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "6867.5060",
                            "lat": "37.8467",
                            "lon": "-122.2915",
                            "shape_pt_sequence": 64,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "6883.2029",
                            "stop_sequence": 13,
                            "stop_id": "65ho_i",
                            "stop_name": "65th at Hollis",
                            "lat": "37.8465",
                            "lon": "-122.2914",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7075.5503",
                            "lat": "37.8449",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 66,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7214.8427",
                            "stop_sequence": 14,
                            "stop_id": "ho64_i",
                            "stop_name": "Hollis at 63rd",
                            "lat": "37.8437",
                            "lon": "-122.2905",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7276.5098",
                            "lat": "37.8431",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 68,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7522.5556",
                            "stop_sequence": 15,
                            "stop_id": "ho59_i",
                            "stop_name": "Hollis at 59th (Emery Station)",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7827.1114",
                            "lat": "37.8383",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 70,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "7932.8563",
                            "lat": "37.8375",
                            "lon": "-122.2883",
                            "shape_pt_sequence": 71,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "8135.2429",
                            "stop_sequence": 16,
                            "stop_id": "ho53_i",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8357",
                            "lon": "-122.2875",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8232.6242",
                            "lat": "37.8349",
                            "lon": "-122.2872",
                            "shape_pt_sequence": 73,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "8438.8168",
                            "stop_sequence": 17,
                            "stop_id": "ho45_i",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8331",
                            "lon": "-122.2865",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8660.7448",
                            "lat": "37.8312",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 75,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "8687.3766",
                            "lat": "37.8311",
                            "lon": "-122.2855",
                            "shape_pt_sequence": 76,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "8946.9793",
                            "stop_sequence": 18,
                            "stop_id": "pix_i",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8317",
                            "lon": "-122.2827",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9043.5461",
                            "lat": "37.8319",
                            "lon": "-122.2816",
                            "shape_pt_sequence": 78,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9064.3761",
                            "lat": "37.8319",
                            "lon": "-122.2814",
                            "shape_pt_sequence": 79,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "9172.1690",
                            "stop_sequence": 19,
                            "stop_id": "em40_i",
                            "stop_name": "Emery at 40th",
                            "lat": "37.8309",
                            "lon": "-122.2811",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9201.7830",
                            "lat": "37.8307",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 81,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9422.6025",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 82,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9450.1889",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 83,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9668.4174",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 84,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "9963.0900",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 85,
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "10292.4441",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 86,
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "10404.0621",
                            "stop_sequence": 20,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "10456.6046",
                            "stop_sequence": 21,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "230",
                            "headsign": "Loop"
                        }, {
                            "shape_dist_traveled": "10470.4092",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 89,
                            "headsign": "Loop"
                        }]
                    }
                }
            }, {
                "route": "Hollis", "data": {
                    "authorityId": "emery-avas", "route": "Hollis", "wkd": {
                        "100": [{
                            "service_id": "wkd",
                            "shape_dist_traveled": "4.3726",
                            "stop_sequence": 1,
                            "stop_id": "bbowl_i",
                            "stop_name": "Berkeley Bowl West",
                            "lat": "37.8525",
                            "lon": "-122.2897",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4.3726",
                            "lat": "37.8525",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 2,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "62.0903",
                            "lat": "37.8520",
                            "lon": "-122.2895",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "76.7811",
                            "lat": "37.8518",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "219.4272",
                            "lat": "37.8515",
                            "lon": "-122.2911",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "235.4987",
                            "lat": "37.8514",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "373.5096",
                            "lat": "37.8502",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "392.9768",
                            "lat": "37.8500",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "488.0800",
                            "lat": "37.8498",
                            "lon": "-122.2920",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "524.6764",
                            "lat": "37.8496",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "545.8763",
                            "lat": "37.8494",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "718.7779",
                            "lat": "37.8479",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "747.0265",
                            "lat": "37.8478",
                            "lon": "-122.2916",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "994.9898",
                            "lat": "37.8483",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1012.5857",
                            "lat": "37.8483",
                            "lon": "-122.2886",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1104.2554",
                            "stop_sequence": 2,
                            "stop_id": "vall66_i",
                            "stop_name": "Vallejo at 66th",
                            "lat": "37.8475",
                            "lon": "-122.2884",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1120.6755",
                            "lat": "37.8474",
                            "lon": "-122.2884",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1374.0226",
                            "lat": "37.8468",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1399.5215",
                            "lat": "37.8467",
                            "lon": "-122.2915",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1415.2184",
                            "stop_sequence": 3,
                            "stop_id": "65ho_i",
                            "stop_name": "65th at Hollis",
                            "lat": "37.8465",
                            "lon": "-122.2914",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1607.5658",
                            "lat": "37.8449",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1746.8581",
                            "stop_sequence": 4,
                            "stop_id": "ho64_i",
                            "stop_name": "Hollis at 63rd",
                            "lat": "37.8437",
                            "lon": "-122.2905",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1808.5253",
                            "lat": "37.8431",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2054.5711",
                            "stop_sequence": 5,
                            "stop_id": "ho59_i",
                            "stop_name": "Hollis at 59th (Emery Station)",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2359.1269",
                            "lat": "37.8383",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2464.8717",
                            "lat": "37.8375",
                            "lon": "-122.2883",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2667.2584",
                            "stop_sequence": 6,
                            "stop_id": "ho53_i",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8357",
                            "lon": "-122.2875",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2764.6397",
                            "lat": "37.8349",
                            "lon": "-122.2872",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2970.8322",
                            "stop_sequence": 7,
                            "stop_id": "ho45_i",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8331",
                            "lon": "-122.2865",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3192.7602",
                            "lat": "37.8312",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3219.3921",
                            "lat": "37.8311",
                            "lon": "-122.2855",
                            "shape_pt_sequence": 32,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3478.9948",
                            "stop_sequence": 8,
                            "stop_id": "pix_i",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8317",
                            "lon": "-122.2827",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3575.5616",
                            "lat": "37.8319",
                            "lon": "-122.2816",
                            "shape_pt_sequence": 34,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3596.3916",
                            "lat": "37.8319",
                            "lon": "-122.2814",
                            "shape_pt_sequence": 35,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3704.1845",
                            "stop_sequence": 9,
                            "stop_id": "em40_i",
                            "stop_name": "Emery at 40th",
                            "lat": "37.8309",
                            "lon": "-122.2811",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3733.7984",
                            "lat": "37.8307",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3954.6180",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3982.2044",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4200.4328",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4495.1054",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 41,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4824.4596",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 42,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4936.0776",
                            "stop_sequence": 10,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4988.6201",
                            "stop_sequence": 11,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "100",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5002.4247",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 45,
                            "headsign": "to BART Station"
                        }],
                        "101": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "to Emeryville",
                            "trip_id": "101"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to Emeryville",
                            "trip_id": "101"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "330.6392",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "346.9929",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "541.3525",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "992.4247",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1024.9488",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1297.7274",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1317.1054",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1543.4938",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1683.5166",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1713.4594",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1809.4369",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 14,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1835.9861",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 15,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1955.5289",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 16,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1981.8569",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 17,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2000.2852",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2179.7421",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2446.7046",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2464.8440",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 21,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2681.6706",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3029.2695",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3137.6438",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3290.0117",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 25,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3309.4588",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 26,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3354.2690",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3435.8672",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3467.5581",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3818.4230",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3839.8340",
                            "lat": "37.8409",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 32,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3969.5052",
                            "lat": "37.8412",
                            "lon": "-122.2898",
                            "shape_pt_sequence": 33,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3986.8472",
                            "lat": "37.8413",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 34,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4015.2824",
                            "stop_sequence": 8,
                            "stop_id": "ho59_o",
                            "stop_name": "Hollis at 59th",
                            "lat": "37.8416",
                            "lon": "-122.2897",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4409.4007",
                            "stop_sequence": 9,
                            "stop_id": "ho64_o",
                            "stop_name": "Hollis at 64th",
                            "lat": "37.8450",
                            "lon": "-122.2908",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4619.5971",
                            "stop_sequence": 10,
                            "stop_id": "ho65_o",
                            "stop_name": "Hollis at 65th",
                            "lat": "37.8468",
                            "lon": "-122.2914",
                            "trip_id": "101",
                            "headsign": "to Emeryville"
                        }],
                        "134": [{
                            "service_id": "wkd",
                            "shape_dist_traveled": "4.3931",
                            "stop_sequence": 0,
                            "stop_id": "bbowl_i",
                            "stop_name": "Berkeley Bowl West",
                            "lat": "37.8525",
                            "lon": "-122.2897",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5.6287",
                            "lat": "37.8524",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 3,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3292.9092",
                            "lat": "37.8293",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3315.0182",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3401.3326",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3583.0895",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3599.4433",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3793.8029",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4244.8751",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4277.3992",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4550.1778",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4569.5558",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4795.9442",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 14,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4935.9670",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 15,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4965.9098",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 16,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5061.8873",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 17,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5088.4365",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 18,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5207.9793",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 19,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5234.3073",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5252.7356",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5432.1925",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5699.1550",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 23,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5717.2943",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5934.1210",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "6281.7199",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6390.0942",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6542.4621",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 28,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6561.9092",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 29,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6606.7193",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "6688.3176",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6720.0085",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 33,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7070.8734",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "7092.2844",
                            "lat": "37.8409",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 35,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "7221.9556",
                            "lat": "37.8412",
                            "lon": "-122.2898",
                            "shape_pt_sequence": 36,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "7239.2976",
                            "lat": "37.8413",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 37,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7267.7328",
                            "stop_sequence": 8,
                            "stop_id": "ho59_o",
                            "stop_name": "Hollis at 59th",
                            "lat": "37.8416",
                            "lon": "-122.2897",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7661.8511",
                            "stop_sequence": 9,
                            "stop_id": "ho64_o",
                            "stop_name": "Hollis at 64th",
                            "lat": "37.8450",
                            "lon": "-122.2908",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7872.0475",
                            "stop_sequence": 10,
                            "stop_id": "ho65_o",
                            "stop_name": "Hollis at 65th",
                            "lat": "37.8468",
                            "lon": "-122.2914",
                            "trip_id": "134",
                            "headsign": "to Emeryville"
                        }]
                    }
                }
            }, {
                "route": "powell", "data": {
                    "authorityId": "emery-avas", "route": "powell", "sat": {
                        "231": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 1,
                            "headsign": "to Emeryville",
                            "trip_id": "429"
                        }, {
                            "shape_dist_traveled": "75.8891",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to Emeryville",
                            "trip_id": "429"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "162.2036",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "343.9605",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "360.3142",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "554.6738",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1005.7460",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1038.2701",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1311.0488",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1330.4267",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1556.8151",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1696.8379",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1726.7807",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "1828.2252",
                            "stop_sequence": 2,
                            "stop_id": "40sp_o",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8311",
                            "lon": "-122.2796",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "1972.9545",
                            "stop_sequence": 3,
                            "stop_id": "40em_o",
                            "stop_name": "40th at Emery",
                            "lat": "37.8308",
                            "lon": "-122.2812",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2324.1470",
                            "stop_sequence": 4,
                            "stop_id": "40ho_o",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8300",
                            "lon": "-122.2850",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2582.5394",
                            "stop_sequence": 5,
                            "stop_id": "40hr_o",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2879",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2653.6828",
                            "lat": "37.8293",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 19,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2843.6210",
                            "lat": "37.8287",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2895.1551",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 21,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2963.6901",
                            "lat": "37.8287",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 22,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3020.3163",
                            "lat": "37.8291",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 23,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3087.8989",
                            "lat": "37.8296",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3294.9081",
                            "lat": "37.8315",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 25,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3367.7165",
                            "lat": "37.8322",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 26,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3465.2566",
                            "lat": "37.8330",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3499.1456",
                            "stop_sequence": 6,
                            "stop_id": "embay_o",
                            "stop_name": "Bay Street",
                            "lat": "37.8333",
                            "lon": "-122.2933",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3538.7766",
                            "lat": "37.8337",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 29,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3588.4844",
                            "lat": "37.8341",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3671.4924",
                            "lat": "37.8348",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 31,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3739.5994",
                            "lat": "37.8354",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 32,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3962.5507",
                            "stop_sequence": 7,
                            "stop_id": "shch_o",
                            "stop_name": "Shellmound at Christie",
                            "lat": "37.8374",
                            "lon": "-122.2930",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4105.4104",
                            "lat": "37.8387",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 34,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4124.6256",
                            "stop_sequence": 8,
                            "stop_id": "wfs_o",
                            "stop_name": "Hyatt Summerfield Suites",
                            "lat": "37.8388",
                            "lon": "-122.2932",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4224.0160",
                            "lat": "37.8397",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 36,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4254.0516",
                            "lat": "37.8400",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 37,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4351.7889",
                            "lat": "37.8408",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 38,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4407.3563",
                            "lat": "37.8413",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 39,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4447.3961",
                            "lat": "37.8416",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 40,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4474.4365",
                            "lat": "37.8419",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 41,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4736.8047",
                            "lat": "37.8442",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 42,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4848.4755",
                            "lat": "37.8451",
                            "lon": "-122.2942",
                            "shape_pt_sequence": 43,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4977.2293",
                            "lat": "37.8462",
                            "lon": "-122.2945",
                            "shape_pt_sequence": 44,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5013.2471",
                            "stop_sequence": 9,
                            "stop_id": "65sh_o",
                            "stop_name": "65th at Shellmound",
                            "lat": "37.8462",
                            "lon": "-122.2949",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5130.1618",
                            "lat": "37.8462",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 46,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5154.2889",
                            "lat": "37.8460",
                            "lon": "-122.2965",
                            "shape_pt_sequence": 47,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5205.0913",
                            "stop_sequence": 10,
                            "stop_id": "ch65_o",
                            "stop_name": "Christie at 65th",
                            "lat": "37.8456",
                            "lon": "-122.2964",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5346.7492",
                            "lat": "37.8443",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 49,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5425.3077",
                            "stop_sequence": 11,
                            "stop_id": "ch64_o",
                            "stop_name": "Christie at 64th",
                            "lat": "37.8436",
                            "lon": "-122.2958",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5657.4062",
                            "stop_sequence": 12,
                            "stop_id": "ebpm_o",
                            "stop_name": "Christie at Public Market",
                            "lat": "37.8416",
                            "lon": "-122.2951",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5806.3759",
                            "lat": "37.8403",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 52,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5834.2301",
                            "lat": "37.8401",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 53,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5867.6314",
                            "stop_sequence": 13,
                            "stop_id": "chsw_o",
                            "stop_name": "Christie at Shellmound",
                            "lat": "37.8398",
                            "lon": "-122.2948",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5907.7454",
                            "lat": "37.8394",
                            "lon": "-122.2950",
                            "shape_pt_sequence": 55,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5929.9844",
                            "lat": "37.8392",
                            "lon": "-122.2950",
                            "shape_pt_sequence": 56,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6004.1620",
                            "lat": "37.8386",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 57,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6017.1577",
                            "lat": "37.8385",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 58,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6212.7733",
                            "lat": "37.8380",
                            "lon": "-122.2970",
                            "shape_pt_sequence": 59,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6265.1498",
                            "lat": "37.8378",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 60,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "6341.8847",
                            "stop_sequence": 14,
                            "stop_id": "pohi_o",
                            "stop_name": "Powell at Hilton Garden Inn",
                            "lat": "37.8377",
                            "lon": "-122.2984",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6452.5687",
                            "lat": "37.8374",
                            "lon": "-122.2996",
                            "shape_pt_sequence": 62,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6484.1700",
                            "lat": "37.8376",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 63,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "6548.0272",
                            "stop_sequence": 15,
                            "stop_id": "wgt_o",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6653.5570",
                            "lat": "37.8390",
                            "lon": "-122.3006",
                            "shape_pt_sequence": 65,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6676.3193",
                            "lat": "37.8389",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 66,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6845.7037",
                            "lat": "37.8374",
                            "lon": "-122.3001",
                            "shape_pt_sequence": 67,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6860.7836",
                            "lat": "37.8373",
                            "lon": "-122.3002",
                            "shape_pt_sequence": 68,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6920.2516",
                            "lat": "37.8372",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 69,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "7067.2368",
                            "stop_sequence": 16,
                            "stop_id": "wgc_o",
                            "stop_name": "Watergate Condos",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "trip_id": "231",
                            "headsign": "to Emeryville"
                        }],
                        "232": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station",
                            "trip_id": "430"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "178.7216",
                            "stop_sequence": 1,
                            "stop_id": "fps_i",
                            "stop_name": "Fire and Police Stations",
                            "lat": "37.8372",
                            "lon": "-122.3046",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "277.5221",
                            "lat": "37.8372",
                            "lon": "-122.3057",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "310.9666",
                            "lat": "37.8371",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "322.1207",
                            "lat": "37.8370",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "394.4393",
                            "lat": "37.8370",
                            "lon": "-122.3052",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "699.1652",
                            "lat": "37.8370",
                            "lon": "-122.3018",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "784.5292",
                            "lat": "37.8370",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "817.6896",
                            "lat": "37.8371",
                            "lon": "-122.3004",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "989.5392",
                            "lat": "37.8375",
                            "lon": "-122.2985",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1281.6843",
                            "lat": "37.8382",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1330.4417",
                            "lat": "37.8382",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1351.6951",
                            "lat": "37.8381",
                            "lon": "-122.2946",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "1438.6840",
                            "stop_sequence": 2,
                            "stop_id": "chpp_i",
                            "stop_name": "Christie at Powell St. Plaza",
                            "lat": "37.8373",
                            "lon": "-122.2944",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1456.2836",
                            "lat": "37.8372",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1488.2102",
                            "lat": "37.8370",
                            "lon": "-122.2940",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1564.6192",
                            "lat": "37.8370",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1590.9203",
                            "lat": "37.8368",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1761.3749",
                            "lat": "37.8353",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1809.5823",
                            "lat": "37.8348",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "1913.4313",
                            "stop_sequence": 3,
                            "stop_id": "ctbmt_i",
                            "stop_name": "Courtyard by Marriott",
                            "lat": "37.8340",
                            "lon": "-122.2934",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1960.9518",
                            "lat": "37.8336",
                            "lon": "-122.2935",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2004.3978",
                            "lat": "37.8332",
                            "lon": "-122.2935",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2132.0300",
                            "lat": "37.8321",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2198.1096",
                            "lat": "37.8315",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2412.9747",
                            "lat": "37.8295",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2447.7040",
                            "lat": "37.8292",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2512.5334",
                            "lat": "37.8287",
                            "lon": "-122.2924",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2574.2122",
                            "lat": "37.8285",
                            "lon": "-122.2918",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2615.5509",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2894.6988",
                            "lat": "37.8292",
                            "lon": "-122.2882",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2981.7620",
                            "stop_sequence": 4,
                            "stop_id": "40hr_i",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2872",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3195.3755",
                            "stop_sequence": 5,
                            "stop_id": "40ho_i",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8299",
                            "lon": "-122.2849",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3522.0768",
                            "stop_sequence": 6,
                            "stop_id": "40em_i",
                            "stop_name": "40th at Emery",
                            "lat": "37.8306",
                            "lon": "-122.2813",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3625.6930",
                            "stop_sequence": 7,
                            "stop_id": "40sp_i",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8308",
                            "lon": "-122.2802",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3779.4196",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3807.0061",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4025.2345",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4319.9071",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4649.2613",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4760.8793",
                            "stop_sequence": 8,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4813.4237",
                            "stop_sequence": 9,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "232",
                            "headsign": "to BART Station"
                        }]
                    }, "sun": {
                        "343": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 1,
                            "headsign": "to Emeryville",
                            "trip_id": "429"
                        }, {
                            "shape_dist_traveled": "75.8891",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to Emeryville",
                            "trip_id": "429"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "162.2036",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "343.9605",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "360.3142",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "554.6738",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1005.7460",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1038.2701",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1311.0488",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1330.4267",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1556.8151",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1696.8379",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1726.7807",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "1828.2252",
                            "stop_sequence": 2,
                            "stop_id": "40sp_o",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8311",
                            "lon": "-122.2796",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "1972.9545",
                            "stop_sequence": 3,
                            "stop_id": "40em_o",
                            "stop_name": "40th at Emery",
                            "lat": "37.8308",
                            "lon": "-122.2812",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "2324.1470",
                            "stop_sequence": 4,
                            "stop_id": "40ho_o",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8300",
                            "lon": "-122.2850",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "2582.5394",
                            "stop_sequence": 5,
                            "stop_id": "40hr_o",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2879",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2653.6828",
                            "lat": "37.8293",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 19,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2843.6210",
                            "lat": "37.8287",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2895.1551",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 21,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2963.6901",
                            "lat": "37.8287",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 22,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3020.3163",
                            "lat": "37.8291",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 23,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3087.8989",
                            "lat": "37.8296",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3294.9081",
                            "lat": "37.8315",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 25,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3367.7165",
                            "lat": "37.8322",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 26,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3465.2566",
                            "lat": "37.8330",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3499.1456",
                            "stop_sequence": 6,
                            "stop_id": "embay_o",
                            "stop_name": "Bay Street",
                            "lat": "37.8333",
                            "lon": "-122.2933",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3538.7766",
                            "lat": "37.8337",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 29,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3588.4844",
                            "lat": "37.8341",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3671.4924",
                            "lat": "37.8348",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 31,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3739.5994",
                            "lat": "37.8354",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 32,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3962.5507",
                            "stop_sequence": 7,
                            "stop_id": "shch_o",
                            "stop_name": "Shellmound at Christie",
                            "lat": "37.8374",
                            "lon": "-122.2930",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4105.4104",
                            "lat": "37.8387",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 34,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "4124.6256",
                            "stop_sequence": 8,
                            "stop_id": "wfs_o",
                            "stop_name": "Hyatt Summerfield Suites",
                            "lat": "37.8388",
                            "lon": "-122.2932",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4224.0160",
                            "lat": "37.8397",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 36,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4254.0516",
                            "lat": "37.8400",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 37,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4351.7889",
                            "lat": "37.8408",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 38,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4407.3563",
                            "lat": "37.8413",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 39,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4447.3961",
                            "lat": "37.8416",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 40,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4474.4365",
                            "lat": "37.8419",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 41,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4736.8047",
                            "lat": "37.8442",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 42,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4848.4755",
                            "lat": "37.8451",
                            "lon": "-122.2942",
                            "shape_pt_sequence": 43,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4977.2293",
                            "lat": "37.8462",
                            "lon": "-122.2945",
                            "shape_pt_sequence": 44,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "5013.2471",
                            "stop_sequence": 9,
                            "stop_id": "65sh_o",
                            "stop_name": "65th at Shellmound",
                            "lat": "37.8462",
                            "lon": "-122.2949",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5130.1618",
                            "lat": "37.8462",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 46,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5154.2889",
                            "lat": "37.8460",
                            "lon": "-122.2965",
                            "shape_pt_sequence": 47,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "5205.0913",
                            "stop_sequence": 10,
                            "stop_id": "ch65_o",
                            "stop_name": "Christie at 65th",
                            "lat": "37.8456",
                            "lon": "-122.2964",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5346.7492",
                            "lat": "37.8443",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 49,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "5425.3077",
                            "stop_sequence": 11,
                            "stop_id": "ch64_o",
                            "stop_name": "Christie at 64th",
                            "lat": "37.8436",
                            "lon": "-122.2958",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "5657.4062",
                            "stop_sequence": 12,
                            "stop_id": "ebpm_o",
                            "stop_name": "Christie at Public Market",
                            "lat": "37.8416",
                            "lon": "-122.2951",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5806.3759",
                            "lat": "37.8403",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 52,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5834.2301",
                            "lat": "37.8401",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 53,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "5867.6314",
                            "stop_sequence": 13,
                            "stop_id": "chsw_o",
                            "stop_name": "Christie at Shellmound",
                            "lat": "37.8398",
                            "lon": "-122.2948",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5907.7454",
                            "lat": "37.8394",
                            "lon": "-122.2950",
                            "shape_pt_sequence": 55,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5929.9844",
                            "lat": "37.8392",
                            "lon": "-122.2950",
                            "shape_pt_sequence": 56,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6004.1620",
                            "lat": "37.8386",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 57,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6017.1577",
                            "lat": "37.8385",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 58,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6212.7733",
                            "lat": "37.8380",
                            "lon": "-122.2970",
                            "shape_pt_sequence": 59,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6265.1498",
                            "lat": "37.8378",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 60,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "6341.8847",
                            "stop_sequence": 14,
                            "stop_id": "pohi_o",
                            "stop_name": "Powell at Hilton Garden Inn",
                            "lat": "37.8377",
                            "lon": "-122.2984",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6452.5687",
                            "lat": "37.8374",
                            "lon": "-122.2996",
                            "shape_pt_sequence": 62,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6484.1700",
                            "lat": "37.8376",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 63,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "6548.0272",
                            "stop_sequence": 15,
                            "stop_id": "wgt_o",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6653.5570",
                            "lat": "37.8390",
                            "lon": "-122.3006",
                            "shape_pt_sequence": 65,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6676.3193",
                            "lat": "37.8389",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 66,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6845.7037",
                            "lat": "37.8374",
                            "lon": "-122.3001",
                            "shape_pt_sequence": 67,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6860.7836",
                            "lat": "37.8373",
                            "lon": "-122.3002",
                            "shape_pt_sequence": 68,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6920.2516",
                            "lat": "37.8372",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 69,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "7067.2368",
                            "stop_sequence": 16,
                            "stop_id": "wgc_o",
                            "stop_name": "Watergate Condos",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "trip_id": "343",
                            "headsign": "to Emeryville"
                        }],
                        "344": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station",
                            "trip_id": "430"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "178.7216",
                            "stop_sequence": 1,
                            "stop_id": "fps_i",
                            "stop_name": "Fire and Police Stations",
                            "lat": "37.8372",
                            "lon": "-122.3046",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "277.5221",
                            "lat": "37.8372",
                            "lon": "-122.3057",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "310.9666",
                            "lat": "37.8371",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "322.1207",
                            "lat": "37.8370",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "394.4393",
                            "lat": "37.8370",
                            "lon": "-122.3052",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "699.1652",
                            "lat": "37.8370",
                            "lon": "-122.3018",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "784.5292",
                            "lat": "37.8370",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "817.6896",
                            "lat": "37.8371",
                            "lon": "-122.3004",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "989.5392",
                            "lat": "37.8375",
                            "lon": "-122.2985",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1281.6843",
                            "lat": "37.8382",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1330.4417",
                            "lat": "37.8382",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1351.6951",
                            "lat": "37.8381",
                            "lon": "-122.2946",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "1438.6840",
                            "stop_sequence": 2,
                            "stop_id": "chpp_i",
                            "stop_name": "Christie at Powell St. Plaza",
                            "lat": "37.8373",
                            "lon": "-122.2944",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1456.2836",
                            "lat": "37.8372",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1488.2102",
                            "lat": "37.8370",
                            "lon": "-122.2940",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1564.6192",
                            "lat": "37.8370",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1590.9203",
                            "lat": "37.8368",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1761.3749",
                            "lat": "37.8353",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1809.5823",
                            "lat": "37.8348",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "1913.4313",
                            "stop_sequence": 3,
                            "stop_id": "ctbmt_i",
                            "stop_name": "Courtyard by Marriott",
                            "lat": "37.8340",
                            "lon": "-122.2934",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1960.9518",
                            "lat": "37.8336",
                            "lon": "-122.2935",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2004.3978",
                            "lat": "37.8332",
                            "lon": "-122.2935",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2132.0300",
                            "lat": "37.8321",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2198.1096",
                            "lat": "37.8315",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2412.9747",
                            "lat": "37.8295",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2447.7040",
                            "lat": "37.8292",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2512.5334",
                            "lat": "37.8287",
                            "lon": "-122.2924",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2574.2122",
                            "lat": "37.8285",
                            "lon": "-122.2918",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2615.5509",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2894.6988",
                            "lat": "37.8292",
                            "lon": "-122.2882",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "2981.7620",
                            "stop_sequence": 4,
                            "stop_id": "40hr_i",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2872",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3195.3755",
                            "stop_sequence": 5,
                            "stop_id": "40ho_i",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8299",
                            "lon": "-122.2849",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3522.0768",
                            "stop_sequence": 6,
                            "stop_id": "40em_i",
                            "stop_name": "40th at Emery",
                            "lat": "37.8306",
                            "lon": "-122.2813",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "3625.6930",
                            "stop_sequence": 7,
                            "stop_id": "40sp_i",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8308",
                            "lon": "-122.2802",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3779.4196",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3807.0061",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4025.2345",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4319.9071",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4649.2613",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "4760.8793",
                            "stop_sequence": 8,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "sun",
                            "shape_dist_traveled": "4813.4237",
                            "stop_sequence": 9,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "344",
                            "headsign": "to BART Station"
                        }]
                    }, "wkd": {
                        "429": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 1,
                            "headsign": "to Emeryville",
                            "trip_id": "429"
                        }, {
                            "shape_dist_traveled": "75.8891",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to Emeryville",
                            "trip_id": "429"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "162.2036",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "343.9605",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "360.3142",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "554.6738",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1005.7460",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1038.2701",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1311.0488",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1330.4267",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1556.8151",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1696.8379",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1726.7807",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1828.2252",
                            "stop_sequence": 2,
                            "stop_id": "40sp_o",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8311",
                            "lon": "-122.2796",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1972.9545",
                            "stop_sequence": 3,
                            "stop_id": "40em_o",
                            "stop_name": "40th at Emery",
                            "lat": "37.8308",
                            "lon": "-122.2812",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2324.1470",
                            "stop_sequence": 4,
                            "stop_id": "40ho_o",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8300",
                            "lon": "-122.2850",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2582.5394",
                            "stop_sequence": 5,
                            "stop_id": "40hr_o",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2879",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2653.6828",
                            "lat": "37.8293",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 19,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2843.6210",
                            "lat": "37.8287",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2895.1551",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 21,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2963.6901",
                            "lat": "37.8287",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 22,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3020.3163",
                            "lat": "37.8291",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 23,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3087.8989",
                            "lat": "37.8296",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3294.9081",
                            "lat": "37.8315",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 25,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3367.7165",
                            "lat": "37.8322",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 26,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3465.2566",
                            "lat": "37.8330",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3499.1456",
                            "stop_sequence": 6,
                            "stop_id": "embay_o",
                            "stop_name": "Bay Street",
                            "lat": "37.8333",
                            "lon": "-122.2933",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3538.7766",
                            "lat": "37.8337",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 29,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3588.4844",
                            "lat": "37.8341",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3671.4924",
                            "lat": "37.8348",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 31,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3739.5994",
                            "lat": "37.8354",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 32,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3962.5507",
                            "stop_sequence": 7,
                            "stop_id": "shch_o",
                            "stop_name": "Shellmound at Christie",
                            "lat": "37.8374",
                            "lon": "-122.2930",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4105.4104",
                            "lat": "37.8387",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 34,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4124.6256",
                            "stop_sequence": 8,
                            "stop_id": "wfs_o",
                            "stop_name": "Hyatt Summerfield Suites",
                            "lat": "37.8388",
                            "lon": "-122.2932",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4224.0160",
                            "lat": "37.8397",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 36,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4254.0516",
                            "lat": "37.8400",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 37,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4351.7889",
                            "lat": "37.8408",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 38,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4407.3563",
                            "lat": "37.8413",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 39,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4447.3961",
                            "lat": "37.8416",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 40,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4474.4365",
                            "lat": "37.8419",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 41,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4736.8047",
                            "lat": "37.8442",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 42,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4848.4755",
                            "lat": "37.8451",
                            "lon": "-122.2942",
                            "shape_pt_sequence": 43,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "4977.2293",
                            "lat": "37.8462",
                            "lon": "-122.2945",
                            "shape_pt_sequence": 44,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5013.2471",
                            "stop_sequence": 9,
                            "stop_id": "65sh_o",
                            "stop_name": "65th at Shellmound",
                            "lat": "37.8462",
                            "lon": "-122.2949",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5130.1618",
                            "lat": "37.8462",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 46,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5154.2889",
                            "lat": "37.8460",
                            "lon": "-122.2965",
                            "shape_pt_sequence": 47,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5205.0913",
                            "stop_sequence": 10,
                            "stop_id": "ch65_o",
                            "stop_name": "Christie at 65th",
                            "lat": "37.8456",
                            "lon": "-122.2964",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5346.7492",
                            "lat": "37.8443",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 49,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5425.3077",
                            "stop_sequence": 11,
                            "stop_id": "ch64_o",
                            "stop_name": "Christie at 64th",
                            "lat": "37.8436",
                            "lon": "-122.2958",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5657.4062",
                            "stop_sequence": 12,
                            "stop_id": "ebpm_o",
                            "stop_name": "Christie at Public Market",
                            "lat": "37.8416",
                            "lon": "-122.2951",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5806.3759",
                            "lat": "37.8403",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 52,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5834.2301",
                            "lat": "37.8401",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 53,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5867.6314",
                            "stop_sequence": 13,
                            "stop_id": "chsw_o",
                            "stop_name": "Christie at Shellmound",
                            "lat": "37.8398",
                            "lon": "-122.2948",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5907.7454",
                            "lat": "37.8394",
                            "lon": "-122.2950",
                            "shape_pt_sequence": 55,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "5929.9844",
                            "lat": "37.8392",
                            "lon": "-122.2950",
                            "shape_pt_sequence": 56,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6004.1620",
                            "lat": "37.8386",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 57,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6017.1577",
                            "lat": "37.8385",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 58,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6212.7733",
                            "lat": "37.8380",
                            "lon": "-122.2970",
                            "shape_pt_sequence": 59,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6265.1498",
                            "lat": "37.8378",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 60,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "6341.8847",
                            "stop_sequence": 14,
                            "stop_id": "pohi_o",
                            "stop_name": "Powell at Hilton Garden Inn",
                            "lat": "37.8377",
                            "lon": "-122.2984",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6452.5687",
                            "lat": "37.8374",
                            "lon": "-122.2996",
                            "shape_pt_sequence": 62,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6484.1700",
                            "lat": "37.8376",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 63,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "6548.0272",
                            "stop_sequence": 15,
                            "stop_id": "wgt_o",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6653.5570",
                            "lat": "37.8390",
                            "lon": "-122.3006",
                            "shape_pt_sequence": 65,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6676.3193",
                            "lat": "37.8389",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 66,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6845.7037",
                            "lat": "37.8374",
                            "lon": "-122.3001",
                            "shape_pt_sequence": 67,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6860.7836",
                            "lat": "37.8373",
                            "lon": "-122.3002",
                            "shape_pt_sequence": 68,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "6920.2516",
                            "lat": "37.8372",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 69,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "7067.2368",
                            "stop_sequence": 16,
                            "stop_id": "wgc_o",
                            "stop_name": "Watergate Condos",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "trip_id": "429",
                            "headsign": "to Emeryville"
                        }],
                        "430": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station",
                            "trip_id": "430"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "178.7216",
                            "stop_sequence": 1,
                            "stop_id": "fps_i",
                            "stop_name": "Fire and Police Stations",
                            "lat": "37.8372",
                            "lon": "-122.3046",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "277.5221",
                            "lat": "37.8372",
                            "lon": "-122.3057",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "310.9666",
                            "lat": "37.8371",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "322.1207",
                            "lat": "37.8370",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "394.4393",
                            "lat": "37.8370",
                            "lon": "-122.3052",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "699.1652",
                            "lat": "37.8370",
                            "lon": "-122.3018",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "784.5292",
                            "lat": "37.8370",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "817.6896",
                            "lat": "37.8371",
                            "lon": "-122.3004",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "989.5392",
                            "lat": "37.8375",
                            "lon": "-122.2985",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1281.6843",
                            "lat": "37.8382",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1330.4417",
                            "lat": "37.8382",
                            "lon": "-122.2948",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1351.6951",
                            "lat": "37.8381",
                            "lon": "-122.2946",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1438.6840",
                            "stop_sequence": 2,
                            "stop_id": "chpp_i",
                            "stop_name": "Christie at Powell St. Plaza",
                            "lat": "37.8373",
                            "lon": "-122.2944",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1456.2836",
                            "lat": "37.8372",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1488.2102",
                            "lat": "37.8370",
                            "lon": "-122.2940",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1564.6192",
                            "lat": "37.8370",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1590.9203",
                            "lat": "37.8368",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1761.3749",
                            "lat": "37.8353",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1809.5823",
                            "lat": "37.8348",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1913.4313",
                            "stop_sequence": 3,
                            "stop_id": "ctbmt_i",
                            "stop_name": "Courtyard by Marriott",
                            "lat": "37.8340",
                            "lon": "-122.2934",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1960.9518",
                            "lat": "37.8336",
                            "lon": "-122.2935",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2004.3978",
                            "lat": "37.8332",
                            "lon": "-122.2935",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2132.0300",
                            "lat": "37.8321",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2198.1096",
                            "lat": "37.8315",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2412.9747",
                            "lat": "37.8295",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2447.7040",
                            "lat": "37.8292",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2512.5334",
                            "lat": "37.8287",
                            "lon": "-122.2924",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2574.2122",
                            "lat": "37.8285",
                            "lon": "-122.2918",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2615.5509",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2894.6988",
                            "lat": "37.8292",
                            "lon": "-122.2882",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2981.7620",
                            "stop_sequence": 4,
                            "stop_id": "40hr_i",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2872",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3195.3755",
                            "stop_sequence": 5,
                            "stop_id": "40ho_i",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8299",
                            "lon": "-122.2849",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3522.0768",
                            "stop_sequence": 6,
                            "stop_id": "40em_i",
                            "stop_name": "40th at Emery",
                            "lat": "37.8306",
                            "lon": "-122.2813",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3625.6930",
                            "stop_sequence": 7,
                            "stop_id": "40sp_i",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8308",
                            "lon": "-122.2802",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3779.4196",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3807.0061",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4025.2345",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4319.9071",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4649.2613",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4760.8793",
                            "stop_sequence": 8,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4813.4237",
                            "stop_sequence": 9,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "430",
                            "headsign": "to BART Station"
                        }]
                    }
                }
            }, {
                "route": "test", "data": {
                    "authorityId": "emery-avas", "route": "test", "wkd": {
                        "182": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "to Emeryville",
                            "trip_id": "182"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to Emeryville",
                            "trip_id": "182"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "330.6392",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "346.9929",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "541.3525",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "992.4247",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1024.9488",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1297.7274",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1317.1054",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1543.4938",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1683.5166",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1713.4594",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1809.4369",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 14,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1835.9861",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 15,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1955.5289",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 16,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1981.8569",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 17,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2000.2852",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2179.7421",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2446.7046",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2464.8440",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 21,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2681.6706",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3029.2695",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3137.6438",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3290.0117",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 25,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3309.4588",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 26,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3354.2690",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3435.8672",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3467.5581",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3818.4230",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3839.8340",
                            "lat": "37.8409",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 32,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3969.5052",
                            "lat": "37.8412",
                            "lon": "-122.2898",
                            "shape_pt_sequence": 33,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3986.8472",
                            "lat": "37.8413",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 34,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4015.2824",
                            "stop_sequence": 8,
                            "stop_id": "ho59_o",
                            "stop_name": "Hollis at 59th",
                            "lat": "37.8416",
                            "lon": "-122.2897",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4409.4007",
                            "stop_sequence": 9,
                            "stop_id": "ho64_o",
                            "stop_name": "Hollis at 64th",
                            "lat": "37.8450",
                            "lon": "-122.2908",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4619.5971",
                            "stop_sequence": 10,
                            "stop_id": "ho65_o",
                            "stop_name": "Hollis at 65th",
                            "lat": "37.8468",
                            "lon": "-122.2914",
                            "trip_id": "182",
                            "headsign": "to Emeryville"
                        }],
                        "183": [{
                            "service_id": "wkd",
                            "shape_dist_traveled": "4.3726",
                            "stop_sequence": 1,
                            "stop_id": "bbowl_i",
                            "stop_name": "Berkeley Bowl West",
                            "lat": "37.8525",
                            "lon": "-122.2897",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4.3726",
                            "lat": "37.8525",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 2,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "62.0903",
                            "lat": "37.8520",
                            "lon": "-122.2895",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "76.7811",
                            "lat": "37.8518",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "219.4272",
                            "lat": "37.8515",
                            "lon": "-122.2911",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "235.4987",
                            "lat": "37.8514",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "373.5096",
                            "lat": "37.8502",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "392.9768",
                            "lat": "37.8500",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "488.0800",
                            "lat": "37.8498",
                            "lon": "-122.2920",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "524.6764",
                            "lat": "37.8496",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "545.8763",
                            "lat": "37.8494",
                            "lon": "-122.2923",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "718.7779",
                            "lat": "37.8479",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "747.0265",
                            "lat": "37.8478",
                            "lon": "-122.2916",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "994.9898",
                            "lat": "37.8483",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1012.5857",
                            "lat": "37.8483",
                            "lon": "-122.2886",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1104.2554",
                            "stop_sequence": 2,
                            "stop_id": "vall66_i",
                            "stop_name": "Vallejo at 66th",
                            "lat": "37.8475",
                            "lon": "-122.2884",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1120.6755",
                            "lat": "37.8474",
                            "lon": "-122.2884",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1374.0226",
                            "lat": "37.8468",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1399.5215",
                            "lat": "37.8467",
                            "lon": "-122.2915",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1415.2184",
                            "stop_sequence": 3,
                            "stop_id": "65ho_i",
                            "stop_name": "65th at Hollis",
                            "lat": "37.8465",
                            "lon": "-122.2914",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1607.5658",
                            "lat": "37.8449",
                            "lon": "-122.2909",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1746.8581",
                            "stop_sequence": 4,
                            "stop_id": "ho64_i",
                            "stop_name": "Hollis at 63rd",
                            "lat": "37.8437",
                            "lon": "-122.2905",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1808.5253",
                            "lat": "37.8431",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2054.5711",
                            "stop_sequence": 5,
                            "stop_id": "ho59_i",
                            "stop_name": "Hollis at 59th (Emery Station)",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2359.1269",
                            "lat": "37.8383",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2464.8717",
                            "lat": "37.8375",
                            "lon": "-122.2883",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2667.2584",
                            "stop_sequence": 6,
                            "stop_id": "ho53_i",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8357",
                            "lon": "-122.2875",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2764.6397",
                            "lat": "37.8349",
                            "lon": "-122.2872",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2970.8322",
                            "stop_sequence": 7,
                            "stop_id": "ho45_i",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8331",
                            "lon": "-122.2865",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3192.7602",
                            "lat": "37.8312",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3219.3921",
                            "lat": "37.8311",
                            "lon": "-122.2855",
                            "shape_pt_sequence": 32,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3478.9948",
                            "stop_sequence": 8,
                            "stop_id": "pix_i",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8317",
                            "lon": "-122.2827",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3575.5616",
                            "lat": "37.8319",
                            "lon": "-122.2816",
                            "shape_pt_sequence": 34,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3596.3916",
                            "lat": "37.8319",
                            "lon": "-122.2814",
                            "shape_pt_sequence": 35,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3704.1845",
                            "stop_sequence": 9,
                            "stop_id": "em40_i",
                            "stop_name": "Emery at 40th",
                            "lat": "37.8309",
                            "lon": "-122.2811",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3733.7984",
                            "lat": "37.8307",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3954.6180",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3982.2044",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4200.4328",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4495.1054",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 41,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4824.4596",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 42,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4936.0776",
                            "stop_sequence": 10,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4988.6201",
                            "stop_sequence": 11,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "183",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5002.4247",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 45,
                            "headsign": "to BART Station"
                        }],
                        "184": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "to Emeryville",
                            "trip_id": "184"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to Emeryville",
                            "trip_id": "184"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "330.6392",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "346.9929",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "541.3525",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "992.4247",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1024.9488",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1297.7274",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1317.1054",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1543.4938",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1683.5166",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1713.4594",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1809.4369",
                            "lat": "37.8311",
                            "lon": "-122.2795",
                            "shape_pt_sequence": 14,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1835.9861",
                            "lat": "37.8312",
                            "lon": "-122.2798",
                            "shape_pt_sequence": 15,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1955.5289",
                            "lat": "37.8322",
                            "lon": "-122.2802",
                            "shape_pt_sequence": 16,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "1981.8569",
                            "lat": "37.8323",
                            "lon": "-122.2805",
                            "shape_pt_sequence": 17,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2000.2852",
                            "stop_sequence": 2,
                            "stop_id": "ihop_o",
                            "stop_name": "IHOP",
                            "lat": "37.8323",
                            "lon": "-122.2807",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2179.7421",
                            "stop_sequence": 3,
                            "stop_id": "pawa_o",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8319",
                            "lon": "-122.2827",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2446.7046",
                            "lat": "37.8312",
                            "lon": "-122.2856",
                            "shape_pt_sequence": 20,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "2464.8440",
                            "lat": "37.8313",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 21,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2681.6706",
                            "stop_sequence": 4,
                            "stop_id": "ho45_o",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8332",
                            "lon": "-122.2864",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3029.2695",
                            "stop_sequence": 5,
                            "stop_id": "ho53_o",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8362",
                            "lon": "-122.2876",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3137.6438",
                            "lat": "37.8371",
                            "lon": "-122.2880",
                            "shape_pt_sequence": 24,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3290.0117",
                            "lat": "37.8383",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 25,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3309.4588",
                            "lat": "37.8384",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 26,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3354.2690",
                            "lat": "37.8382",
                            "lon": "-122.2894",
                            "shape_pt_sequence": 27,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3435.8672",
                            "stop_sequence": 6,
                            "stop_id": "stho_o",
                            "stop_name": "Stanford at Horton (Emery Station)",
                            "lat": "37.8376",
                            "lon": "-122.2900",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3467.5581",
                            "lat": "37.8377",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 30,
                            "headsign": "to Emeryville"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "3818.4230",
                            "stop_sequence": 7,
                            "stop_id": "es_o",
                            "stop_name": "Amtrak Station",
                            "lat": "37.8407",
                            "lon": "-122.2913",
                            "trip_id": "184",
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3835.0175",
                            "lat": "37.8409",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 32,
                            "headsign": "to Emeryville"
                        }, {
                            "shape_dist_traveled": "3906.3758",
                            "lat": "37.8410",
                            "lon": "-122.2905",
                            "shape_pt_sequence": 33,
                            "headsign": "to Emeryville"
                        }],
                        "185": [{
                            "service_id": "wkd",
                            "shape_dist_traveled": "17.7426",
                            "stop_sequence": 1,
                            "stop_id": "ho59_i",
                            "stop_name": "Hollis at 59th (Emery Station)",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8411",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "17.7426",
                            "lat": "37.8410",
                            "lon": "-122.2897",
                            "shape_pt_sequence": 2,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "322.2984",
                            "lat": "37.8383",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "428.0433",
                            "lat": "37.8375",
                            "lon": "-122.2883",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "630.4299",
                            "stop_sequence": 2,
                            "stop_id": "ho53_i",
                            "stop_name": "Hollis at 53rd",
                            "lat": "37.8357",
                            "lon": "-122.2875",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "727.8112",
                            "lat": "37.8349",
                            "lon": "-122.2872",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "934.0038",
                            "stop_sequence": 3,
                            "stop_id": "ho45_i",
                            "stop_name": "Hollis at 45th",
                            "lat": "37.8331",
                            "lon": "-122.2865",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1155.9317",
                            "lat": "37.8312",
                            "lon": "-122.2858",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1182.5636",
                            "lat": "37.8311",
                            "lon": "-122.2855",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1442.1663",
                            "stop_sequence": 4,
                            "stop_id": "pix_i",
                            "stop_name": "Park at Watts (Pixar)",
                            "lat": "37.8317",
                            "lon": "-122.2827",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1538.7331",
                            "lat": "37.8319",
                            "lon": "-122.2816",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1559.5631",
                            "lat": "37.8319",
                            "lon": "-122.2814",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "1667.3560",
                            "stop_sequence": 5,
                            "stop_id": "em40_i",
                            "stop_name": "Emery at 40th",
                            "lat": "37.8309",
                            "lon": "-122.2811",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1696.9700",
                            "lat": "37.8307",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1917.7895",
                            "lat": "37.8312",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1945.3759",
                            "lat": "37.8312",
                            "lon": "-122.2782",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2163.6043",
                            "lat": "37.8308",
                            "lon": "-122.2757",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2458.2769",
                            "lat": "37.8303",
                            "lon": "-122.2724",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2787.6311",
                            "lat": "37.8297",
                            "lon": "-122.2688",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2899.2491",
                            "stop_sequence": 6,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "2951.7916",
                            "stop_sequence": 7,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "185",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2965.5962",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }]
                    }
                }
            }, {
                "route": "wgexp_am", "data": {
                    "authorityId": "emery-avas", "route": "wgexp_am", "wkd": {
                        "1": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station",
                            "trip_id": "1"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to BART Station",
                            "trip_id": "1"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 0,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "240.1299",
                            "lat": "37.8293",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "262.2389",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "348.5534",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "530.3103",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "546.6640",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "741.0236",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1190.3722",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1354.3686",
                            "lat": "37.8282",
                            "lon": "-122.2760",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1515.7488",
                            "lat": "37.8285",
                            "lon": "-122.2778",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1597.6173",
                            "lat": "37.8285",
                            "lon": "-122.2787",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1652.9932",
                            "lat": "37.8285",
                            "lon": "-122.2793",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1747.9111",
                            "lat": "37.8284",
                            "lon": "-122.2804",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1807.0836",
                            "lat": "37.8282",
                            "lon": "-122.2811",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1912.8954",
                            "lat": "37.8279",
                            "lon": "-122.2822",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1983.5511",
                            "lat": "37.8278",
                            "lon": "-122.2830",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2085.4746",
                            "lat": "37.8275",
                            "lon": "-122.2841",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2199.0366",
                            "lat": "37.8272",
                            "lon": "-122.2853",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2354.8432",
                            "lat": "37.8267",
                            "lon": "-122.2870",
                            "shape_pt_sequence": 21,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2449.9334",
                            "lat": "37.8267",
                            "lon": "-122.2881",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2530.2908",
                            "lat": "37.8268",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2637.8461",
                            "lat": "37.8271",
                            "lon": "-122.2901",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2749.4627",
                            "lat": "37.8275",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2809.1644",
                            "lat": "37.8278",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2896.0353",
                            "lat": "37.8283",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2972.6253",
                            "lat": "37.8289",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3029.3580",
                            "lat": "37.8294",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3073.0431",
                            "lat": "37.8298",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3240.1153",
                            "lat": "37.8313",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3296.8519",
                            "lat": "37.8318",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 32,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3367.2103",
                            "lat": "37.8324",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 33,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3446.4539",
                            "lat": "37.8331",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 34,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3585.4379",
                            "lat": "37.8342",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 35,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3674.9643",
                            "lat": "37.8350",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3813.7393",
                            "lat": "37.8361",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3969.4814",
                            "lat": "37.8374",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4028.9396",
                            "lat": "37.8379",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4097.2274",
                            "lat": "37.8380",
                            "lon": "-122.2970",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4149.6039",
                            "lat": "37.8378",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 41,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4226.3387",
                            "stop_sequence": 1,
                            "stop_id": "pohi_i",
                            "stop_name": "Powell at Hilton Garden Inn",
                            "lat": "37.8377",
                            "lon": "-122.2984",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4337.0227",
                            "lat": "37.8374",
                            "lon": "-122.2996",
                            "shape_pt_sequence": 43,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4368.6240",
                            "lat": "37.8376",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 44,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4433.5089",
                            "stop_sequence": 2,
                            "stop_id": "wgt_i",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4538.0084",
                            "lat": "37.8390",
                            "lon": "-122.3006",
                            "shape_pt_sequence": 46,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4560.7707",
                            "lat": "37.8389",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 47,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4730.1552",
                            "lat": "37.8374",
                            "lon": "-122.3001",
                            "shape_pt_sequence": 48,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4745.2350",
                            "lat": "37.8373",
                            "lon": "-122.3002",
                            "shape_pt_sequence": 49,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4804.7030",
                            "lat": "37.8372",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 50,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4953.1805",
                            "stop_sequence": 3,
                            "stop_id": "wgc_i",
                            "stop_name": "Watergate Condos",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5131.9017",
                            "stop_sequence": 4,
                            "stop_id": "fps_i",
                            "stop_name": "Fire and Police Stations",
                            "lat": "37.8372",
                            "lon": "-122.3046",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5254.4260",
                            "lat": "37.8372",
                            "lon": "-122.3060",
                            "shape_pt_sequence": 53,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5271.3398",
                            "lat": "37.8370",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 54,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5343.6583",
                            "lat": "37.8370",
                            "lon": "-122.3052",
                            "shape_pt_sequence": 55,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5648.3843",
                            "lat": "37.8370",
                            "lon": "-122.3018",
                            "shape_pt_sequence": 56,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5733.7483",
                            "lat": "37.8370",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 57,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5766.9086",
                            "lat": "37.8371",
                            "lon": "-122.3004",
                            "shape_pt_sequence": 58,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6037.8243",
                            "lat": "37.8377",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 59,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6088.5230",
                            "lat": "37.8381",
                            "lon": "-122.2971",
                            "shape_pt_sequence": 60,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6115.2675",
                            "lat": "37.8383",
                            "lon": "-122.2971",
                            "shape_pt_sequence": 61,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6179.9662",
                            "lat": "37.8389",
                            "lon": "-122.2973",
                            "shape_pt_sequence": 62,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6244.2544",
                            "lat": "37.8394",
                            "lon": "-122.2976",
                            "shape_pt_sequence": 63,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6284.2846",
                            "lat": "37.8398",
                            "lon": "-122.2976",
                            "shape_pt_sequence": 64,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6311.4605",
                            "lat": "37.8397",
                            "lon": "-122.2973",
                            "shape_pt_sequence": 65,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6349.7165",
                            "lat": "37.8394",
                            "lon": "-122.2972",
                            "shape_pt_sequence": 66,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6463.7768",
                            "lat": "37.8384",
                            "lon": "-122.2968",
                            "shape_pt_sequence": 67,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6560.2469",
                            "lat": "37.8375",
                            "lon": "-122.2966",
                            "shape_pt_sequence": 68,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6751.9196",
                            "lat": "37.8359",
                            "lon": "-122.2959",
                            "shape_pt_sequence": 69,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6901.2992",
                            "lat": "37.8346",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 70,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7151.3228",
                            "lat": "37.8326",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 71,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7233.7554",
                            "lat": "37.8318",
                            "lon": "-122.2940",
                            "shape_pt_sequence": 72,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7335.2126",
                            "lat": "37.8309",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 73,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7411.9423",
                            "lat": "37.8303",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 74,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7532.2383",
                            "lat": "37.8292",
                            "lon": "-122.2939",
                            "shape_pt_sequence": 75,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7571.7857",
                            "lat": "37.8288",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 76,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7653.3344",
                            "lat": "37.8282",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 77,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7712.1094",
                            "lat": "37.8278",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 78,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7887.5015",
                            "lat": "37.8269",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 79,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7977.9083",
                            "lat": "37.8265",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 80,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8046.2500",
                            "lat": "37.8263",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 81,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8118.8179",
                            "lat": "37.8263",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 82,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8171.5159",
                            "lat": "37.8263",
                            "lon": "-122.2882",
                            "shape_pt_sequence": 83,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8222.3632",
                            "lat": "37.8263",
                            "lon": "-122.2876",
                            "shape_pt_sequence": 84,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8316.0771",
                            "lat": "37.8266",
                            "lon": "-122.2866",
                            "shape_pt_sequence": 85,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8463.6845",
                            "lat": "37.8270",
                            "lon": "-122.2850",
                            "shape_pt_sequence": 86,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8565.6088",
                            "lat": "37.8272",
                            "lon": "-122.2838",
                            "shape_pt_sequence": 87,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8628.5970",
                            "lat": "37.8274",
                            "lon": "-122.2832",
                            "shape_pt_sequence": 88,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8688.7574",
                            "lat": "37.8276",
                            "lon": "-122.2825",
                            "shape_pt_sequence": 89,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8842.8998",
                            "lat": "37.8281",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 90,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9001.4420",
                            "lat": "37.8284",
                            "lon": "-122.2791",
                            "shape_pt_sequence": 91,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9100.7120",
                            "lat": "37.8284",
                            "lon": "-122.2780",
                            "shape_pt_sequence": 92,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9262.2550",
                            "lat": "37.8281",
                            "lon": "-122.2762",
                            "shape_pt_sequence": 93,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9465.8372",
                            "lat": "37.8278",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 94,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9702.7943",
                            "lat": "37.8274",
                            "lon": "-122.2712",
                            "shape_pt_sequence": 95,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9884.6502",
                            "lat": "37.8271",
                            "lon": "-122.2692",
                            "shape_pt_sequence": 96,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9914.2960",
                            "lat": "37.8273",
                            "lon": "-122.2689",
                            "shape_pt_sequence": 97,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "10170.3646",
                            "lat": "37.8296",
                            "lon": "-122.2684",
                            "shape_pt_sequence": 98,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "10185.6851",
                            "lat": "37.8297",
                            "lon": "-122.2682",
                            "shape_pt_sequence": 99,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "10251.4075",
                            "stop_sequence": 5,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "10303.9500",
                            "stop_sequence": 6,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "1",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "10317.7546",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 102,
                            "headsign": "to BART Station"
                        }],
                        "12": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "62.5678",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "148.8823",
                            "stop_sequence": 0,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "12",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "240.1299",
                            "lat": "37.8293",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "262.2389",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "348.5534",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "530.3103",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "546.6640",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "741.0236",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1190.3722",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1354.3686",
                            "lat": "37.8282",
                            "lon": "-122.2760",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1515.7488",
                            "lat": "37.8285",
                            "lon": "-122.2778",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1597.6173",
                            "lat": "37.8285",
                            "lon": "-122.2787",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1652.9932",
                            "lat": "37.8285",
                            "lon": "-122.2793",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1747.9111",
                            "lat": "37.8284",
                            "lon": "-122.2804",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1807.0836",
                            "lat": "37.8282",
                            "lon": "-122.2811",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1912.8954",
                            "lat": "37.8279",
                            "lon": "-122.2822",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "1983.5511",
                            "lat": "37.8278",
                            "lon": "-122.2830",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2085.4746",
                            "lat": "37.8275",
                            "lon": "-122.2841",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2199.0366",
                            "lat": "37.8272",
                            "lon": "-122.2853",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2354.8432",
                            "lat": "37.8267",
                            "lon": "-122.2870",
                            "shape_pt_sequence": 21,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2449.9334",
                            "lat": "37.8267",
                            "lon": "-122.2881",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2530.2908",
                            "lat": "37.8268",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2637.8461",
                            "lat": "37.8271",
                            "lon": "-122.2901",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2749.4627",
                            "lat": "37.8275",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2809.1644",
                            "lat": "37.8278",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2896.0353",
                            "lat": "37.8283",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "2972.6253",
                            "lat": "37.8289",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3029.3580",
                            "lat": "37.8294",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3073.0431",
                            "lat": "37.8298",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3240.1153",
                            "lat": "37.8313",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3296.8519",
                            "lat": "37.8318",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 32,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3367.2103",
                            "lat": "37.8324",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 33,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3446.4539",
                            "lat": "37.8331",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 34,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3585.4379",
                            "lat": "37.8342",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 35,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3674.9643",
                            "lat": "37.8350",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3813.7393",
                            "lat": "37.8361",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "3969.4814",
                            "lat": "37.8374",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "4028.9396",
                            "lat": "37.8379",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "4097.2274",
                            "lat": "37.8380",
                            "lon": "-122.2970",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "shape_dist_traveled": "4149.6039",
                            "lat": "37.8378",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 41,
                            "headsign": "to BART Station",
                            "trip_id": "12"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4226.3387",
                            "stop_sequence": 2,
                            "stop_id": "wgt_i",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "12",
                            "headsign": "to BART Station"
                        }]
                    }
                }
            }, {
                "route": "wgexp_pm", "data": {
                    "authorityId": "emery-avas", "route": "wgexp_pm", "wkd": {
                        "13": [{
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8370",
                            "lon": "-122.3033",
                            "shape_pt_sequence": 1,
                            "headsign": "to BART Station",
                            "trip_id": "13"
                        }, {
                            "shape_dist_traveled": "132.6088",
                            "lat": "37.8370",
                            "lon": "-122.3018",
                            "shape_pt_sequence": 2,
                            "headsign": "to BART Station",
                            "trip_id": "13"
                        }, {
                            "shape_dist_traveled": "219.8956",
                            "lat": "37.8371",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station",
                            "trip_id": "13"
                        }, {
                            "shape_dist_traveled": "299.9432",
                            "lat": "37.8373",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station",
                            "trip_id": "13"
                        }, {
                            "shape_dist_traveled": "322.7979",
                            "lat": "37.8375",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station",
                            "trip_id": "13"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "393.8270",
                            "stop_sequence": 1,
                            "stop_id": "wgt_i",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "13",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "497.2980",
                            "lat": "37.8390",
                            "lon": "-122.3006",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "524.5502",
                            "lat": "37.8392",
                            "lon": "-122.3005",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "616.5789",
                            "lat": "37.8394",
                            "lon": "-122.2995",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "667.6276",
                            "lat": "37.8395",
                            "lon": "-122.2989",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "720.7393",
                            "lat": "37.8398",
                            "lon": "-122.2984",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "769.1556",
                            "lat": "37.8399",
                            "lon": "-122.2979",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "815.3004",
                            "lat": "37.8398",
                            "lon": "-122.2974",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "862.3532",
                            "lat": "37.8395",
                            "lon": "-122.2971",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "984.5951",
                            "lat": "37.8384",
                            "lon": "-122.2969",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1093.0543",
                            "lat": "37.8374",
                            "lon": "-122.2966",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1223.9806",
                            "lat": "37.8363",
                            "lon": "-122.2961",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1280.6664",
                            "lat": "37.8358",
                            "lon": "-122.2959",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1421.2297",
                            "lat": "37.8347",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1673.2669",
                            "lat": "37.8326",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1755.6995",
                            "lat": "37.8318",
                            "lon": "-122.2940",
                            "shape_pt_sequence": 21,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1857.1567",
                            "lat": "37.8309",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1933.8863",
                            "lat": "37.8303",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2054.1824",
                            "lat": "37.8292",
                            "lon": "-122.2939",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2093.7298",
                            "lat": "37.8288",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2175.2785",
                            "lat": "37.8282",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2234.0534",
                            "lat": "37.8278",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2409.4455",
                            "lat": "37.8269",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2499.8524",
                            "lat": "37.8265",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2568.1940",
                            "lat": "37.8263",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2640.7619",
                            "lat": "37.8263",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2693.4599",
                            "lat": "37.8263",
                            "lon": "-122.2882",
                            "shape_pt_sequence": 32,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2744.3072",
                            "lat": "37.8263",
                            "lon": "-122.2876",
                            "shape_pt_sequence": 33,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2838.0211",
                            "lat": "37.8266",
                            "lon": "-122.2866",
                            "shape_pt_sequence": 34,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2985.6286",
                            "lat": "37.8270",
                            "lon": "-122.2850",
                            "shape_pt_sequence": 35,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3087.5528",
                            "lat": "37.8272",
                            "lon": "-122.2838",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3150.5410",
                            "lat": "37.8274",
                            "lon": "-122.2832",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3210.7015",
                            "lat": "37.8276",
                            "lon": "-122.2825",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3364.8438",
                            "lat": "37.8281",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3523.3861",
                            "lat": "37.8284",
                            "lon": "-122.2791",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3622.6561",
                            "lat": "37.8284",
                            "lon": "-122.2780",
                            "shape_pt_sequence": 41,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3784.1991",
                            "lat": "37.8281",
                            "lon": "-122.2762",
                            "shape_pt_sequence": 42,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3987.7812",
                            "lat": "37.8278",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 43,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4224.7384",
                            "lat": "37.8274",
                            "lon": "-122.2712",
                            "shape_pt_sequence": 44,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4406.5942",
                            "lat": "37.8271",
                            "lon": "-122.2692",
                            "shape_pt_sequence": 45,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4436.2400",
                            "lat": "37.8273",
                            "lon": "-122.2689",
                            "shape_pt_sequence": 46,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4692.3087",
                            "lat": "37.8296",
                            "lon": "-122.2684",
                            "shape_pt_sequence": 47,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4707.6291",
                            "lat": "37.8297",
                            "lon": "-122.2682",
                            "shape_pt_sequence": 48,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4773.3516",
                            "stop_sequence": 2,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "13",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4825.8960",
                            "stop_sequence": 3,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "13",
                            "headsign": "to BART Station"
                        }],
                        "14": [{
                            "service_id": "wkd",
                            "shape_dist_traveled": "163.1095",
                            "stop_sequence": 0,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4792.8129",
                            "stop_sequence": 3,
                            "stop_id": "fps_i",
                            "stop_name": "Fire and Police Stations",
                            "lat": "37.8372",
                            "lon": "-122.3046",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "10006.5438",
                            "stop_sequence": 6,
                            "stop_id": "barta_i",
                            "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "76.7950",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 3,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "163.1095",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 4,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "254.3571",
                            "lat": "37.8293",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 5,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "276.4661",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 6,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "362.7806",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "shape_pt_sequence": 7,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "544.5375",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 8,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "560.8913",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 9,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "755.2508",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 10,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1204.5994",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 11,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1368.5958",
                            "lat": "37.8282",
                            "lon": "-122.2760",
                            "shape_pt_sequence": 12,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1529.9760",
                            "lat": "37.8285",
                            "lon": "-122.2778",
                            "shape_pt_sequence": 13,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1611.8445",
                            "lat": "37.8285",
                            "lon": "-122.2787",
                            "shape_pt_sequence": 14,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1667.2204",
                            "lat": "37.8285",
                            "lon": "-122.2793",
                            "shape_pt_sequence": 15,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1762.1384",
                            "lat": "37.8284",
                            "lon": "-122.2804",
                            "shape_pt_sequence": 16,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1821.3108",
                            "lat": "37.8282",
                            "lon": "-122.2811",
                            "shape_pt_sequence": 17,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1927.1227",
                            "lat": "37.8279",
                            "lon": "-122.2822",
                            "shape_pt_sequence": 18,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "1997.7783",
                            "lat": "37.8278",
                            "lon": "-122.2830",
                            "shape_pt_sequence": 19,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2099.7019",
                            "lat": "37.8275",
                            "lon": "-122.2841",
                            "shape_pt_sequence": 20,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2213.2638",
                            "lat": "37.8272",
                            "lon": "-122.2853",
                            "shape_pt_sequence": 21,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2369.0704",
                            "lat": "37.8267",
                            "lon": "-122.2870",
                            "shape_pt_sequence": 22,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2464.1607",
                            "lat": "37.8267",
                            "lon": "-122.2881",
                            "shape_pt_sequence": 23,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2544.5181",
                            "lat": "37.8268",
                            "lon": "-122.2890",
                            "shape_pt_sequence": 24,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2652.0733",
                            "lat": "37.8271",
                            "lon": "-122.2901",
                            "shape_pt_sequence": 25,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2763.6899",
                            "lat": "37.8275",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 26,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2823.3916",
                            "lat": "37.8278",
                            "lon": "-122.2919",
                            "shape_pt_sequence": 27,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2910.2625",
                            "lat": "37.8283",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 28,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "2986.8526",
                            "lat": "37.8289",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 29,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3043.5853",
                            "lat": "37.8294",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3087.2703",
                            "lat": "37.8298",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 31,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3254.3425",
                            "lat": "37.8313",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 32,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3311.0792",
                            "lat": "37.8318",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 33,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3381.4376",
                            "lat": "37.8324",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 34,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3460.6811",
                            "lat": "37.8331",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 35,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3599.6651",
                            "lat": "37.8342",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 36,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3689.1915",
                            "lat": "37.8350",
                            "lon": "-122.2947",
                            "shape_pt_sequence": 37,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3827.9665",
                            "lat": "37.8361",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 38,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "3983.7086",
                            "lat": "37.8374",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 39,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4043.1668",
                            "lat": "37.8379",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 40,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4111.4546",
                            "lat": "37.8380",
                            "lon": "-122.2970",
                            "shape_pt_sequence": 41,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4163.8311",
                            "lat": "37.8378",
                            "lon": "-122.2975",
                            "shape_pt_sequence": 42,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4240.5660",
                            "stop_sequence": 1,
                            "stop_id": "pohi_i",
                            "stop_name": "Powell at Hilton Garden Inn",
                            "lat": "37.8377",
                            "lon": "-122.2984",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4465.6138",
                            "lat": "37.8372",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 44,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "4614.0913",
                            "stop_sequence": 2,
                            "stop_id": "wgc_i",
                            "stop_name": "Watergate Condos",
                            "lat": "37.8371",
                            "lon": "-122.3025",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4792.8129",
                            "lat": "37.8371",
                            "lon": "-122.3046",
                            "shape_pt_sequence": 46,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4891.6133",
                            "lat": "37.8372",
                            "lon": "-122.3057",
                            "shape_pt_sequence": 47,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4925.0579",
                            "lat": "37.8371",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 48,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "4936.2120",
                            "lat": "37.8370",
                            "lon": "-122.3061",
                            "shape_pt_sequence": 49,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5008.5305",
                            "lat": "37.8370",
                            "lon": "-122.3052",
                            "shape_pt_sequence": 50,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5313.2565",
                            "lat": "37.8370",
                            "lon": "-122.3018",
                            "shape_pt_sequence": 51,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5400.5433",
                            "lat": "37.8371",
                            "lon": "-122.3008",
                            "shape_pt_sequence": 52,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5480.5910",
                            "lat": "37.8373",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 53,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5503.4457",
                            "lat": "37.8375",
                            "lon": "-122.2999",
                            "shape_pt_sequence": 54,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "5574.4747",
                            "stop_sequence": 4,
                            "stop_id": "wgt_i",
                            "stop_name": "The Towers",
                            "lat": "37.8381",
                            "lon": "-122.3002",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5677.9458",
                            "lat": "37.8390",
                            "lon": "-122.3006",
                            "shape_pt_sequence": 56,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5705.1980",
                            "lat": "37.8392",
                            "lon": "-122.3005",
                            "shape_pt_sequence": 57,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5797.2267",
                            "lat": "37.8394",
                            "lon": "-122.2995",
                            "shape_pt_sequence": 58,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5848.2753",
                            "lat": "37.8395",
                            "lon": "-122.2989",
                            "shape_pt_sequence": 59,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5901.3870",
                            "lat": "37.8398",
                            "lon": "-122.2984",
                            "shape_pt_sequence": 60,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5949.8034",
                            "lat": "37.8399",
                            "lon": "-122.2979",
                            "shape_pt_sequence": 61,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "5995.9482",
                            "lat": "37.8398",
                            "lon": "-122.2974",
                            "shape_pt_sequence": 62,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6043.0010",
                            "lat": "37.8395",
                            "lon": "-122.2971",
                            "shape_pt_sequence": 63,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6165.2428",
                            "lat": "37.8384",
                            "lon": "-122.2969",
                            "shape_pt_sequence": 64,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6273.7021",
                            "lat": "37.8374",
                            "lon": "-122.2966",
                            "shape_pt_sequence": 65,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6404.6283",
                            "lat": "37.8363",
                            "lon": "-122.2961",
                            "shape_pt_sequence": 66,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6461.3142",
                            "lat": "37.8358",
                            "lon": "-122.2959",
                            "shape_pt_sequence": 67,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6601.8775",
                            "lat": "37.8347",
                            "lon": "-122.2953",
                            "shape_pt_sequence": 68,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6853.9147",
                            "lat": "37.8326",
                            "lon": "-122.2943",
                            "shape_pt_sequence": 69,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "6936.3473",
                            "lat": "37.8318",
                            "lon": "-122.2940",
                            "shape_pt_sequence": 70,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7037.8045",
                            "lat": "37.8309",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 71,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7114.5341",
                            "lat": "37.8303",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 72,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7234.8301",
                            "lat": "37.8292",
                            "lon": "-122.2939",
                            "shape_pt_sequence": 73,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7274.3776",
                            "lat": "37.8288",
                            "lon": "-122.2938",
                            "shape_pt_sequence": 74,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7355.9263",
                            "lat": "37.8282",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 75,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7414.7012",
                            "lat": "37.8278",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 76,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7590.0933",
                            "lat": "37.8269",
                            "lon": "-122.2912",
                            "shape_pt_sequence": 77,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7680.5001",
                            "lat": "37.8265",
                            "lon": "-122.2903",
                            "shape_pt_sequence": 78,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7748.8418",
                            "lat": "37.8263",
                            "lon": "-122.2896",
                            "shape_pt_sequence": 79,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7821.4097",
                            "lat": "37.8263",
                            "lon": "-122.2888",
                            "shape_pt_sequence": 80,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7874.1077",
                            "lat": "37.8263",
                            "lon": "-122.2882",
                            "shape_pt_sequence": 81,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "7924.9550",
                            "lat": "37.8263",
                            "lon": "-122.2876",
                            "shape_pt_sequence": 82,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8018.6689",
                            "lat": "37.8266",
                            "lon": "-122.2866",
                            "shape_pt_sequence": 83,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8166.2764",
                            "lat": "37.8270",
                            "lon": "-122.2850",
                            "shape_pt_sequence": 84,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8268.2006",
                            "lat": "37.8272",
                            "lon": "-122.2838",
                            "shape_pt_sequence": 85,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8331.1888",
                            "lat": "37.8274",
                            "lon": "-122.2832",
                            "shape_pt_sequence": 86,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8391.3492",
                            "lat": "37.8276",
                            "lon": "-122.2825",
                            "shape_pt_sequence": 87,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8545.4916",
                            "lat": "37.8281",
                            "lon": "-122.2809",
                            "shape_pt_sequence": 88,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8704.0338",
                            "lat": "37.8284",
                            "lon": "-122.2791",
                            "shape_pt_sequence": 89,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8803.3039",
                            "lat": "37.8284",
                            "lon": "-122.2780",
                            "shape_pt_sequence": 90,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "8964.8469",
                            "lat": "37.8281",
                            "lon": "-122.2762",
                            "shape_pt_sequence": 91,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9168.4290",
                            "lat": "37.8278",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 92,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9405.3862",
                            "lat": "37.8274",
                            "lon": "-122.2712",
                            "shape_pt_sequence": 93,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9587.2420",
                            "lat": "37.8271",
                            "lon": "-122.2692",
                            "shape_pt_sequence": 94,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9616.8878",
                            "lat": "37.8273",
                            "lon": "-122.2689",
                            "shape_pt_sequence": 95,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9872.9564",
                            "lat": "37.8296",
                            "lon": "-122.2684",
                            "shape_pt_sequence": 96,
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "9888.2769",
                            "lat": "37.8297",
                            "lon": "-122.2682",
                            "shape_pt_sequence": 97,
                            "headsign": "to BART Station"
                        }, {
                            "service_id": "wkd",
                            "shape_dist_traveled": "9953.9993",
                            "stop_sequence": 5,
                            "stop_id": "bartw_i",
                            "stop_name": "MacArthur Bart Station",
                            "lat": "37.8295",
                            "lon": "-122.2675",
                            "trip_id": "14",
                            "headsign": "to BART Station"
                        }, {
                            "shape_dist_traveled": "10006.9965",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 99,
                            "headsign": "to BART Station"
                        }]
                    }
                }
            }]
    };

    $scope.clear = function(){
        $scope.markers = {};
    };

    $scope.addMarkers = function () {
        var triggerpointStore = {};
        var array = onkarrSays.shapesAndStops;
        var triggerpoints = [];
        $scope.markers = {};
        array.forEach(function (item) {
            if (item.route === $scope.route) {
                var service_id = item.data;

                for (var serviceId in service_id) {

                    if (typeof service_id[serviceId] !== 'string') {

                        console.log(serviceId);
                        if (service_id[serviceId]) {
                            var routeIdObj = service_id[$scope.service_id];
                            var newArray = [];
                            for (var prop in routeIdObj) {
                                newArray.push({id: prop, array: routeIdObj[prop]});
                            }
                         turnTripIdPointArraysIntoTriggerPoints(newArray, triggerpoints, $scope.triggerpoint.orientation, triggerpointStore, item.route);
                        }
                    }
                }
            }

        });
        var i = 0;

        triggerpoints.forEach(function (triggerpoint) {
            _makeTriggerPointMarker(i, triggerpoint);
            i++;
        });


        console.log(triggerpointStore);
    };

}]);