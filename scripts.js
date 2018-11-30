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

    var midpoint = function (lat1, long1, lat2, long2, per) {

        console.log(lat1, long1, lat2, long2);
        lat1 = lat1 * 1;
        long1 = long1 * 1;
        lat2 = lat2 * 1;
        long2 = long2 * 1;
        return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
    };

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

    var calcLatLngDistance = function (lat1, lon1, lat2, lon2) {
        return latLngDistance(lat1, lon1, lat2, lon2) * 1609.34; //get distance in miles and convert to meters
    };

    $scope.route = "powell";
    $scope.service_id = "sat";
    $scope.headsign = "to BART Station";

    var onkarrSays = {"shapesAndStops":[{"route":"powell","data":{"authorityId":"emery-avas","route":"powell","sat":{"231":[{"shape_dist_traveled":"0.0000","lat":"37.8294","lon":"-122.2669","shape_pt_sequence":1,"trip_id":"231"},{"shape_dist_traveled":"75.8891","lat":"37.8293","lon":"-122.2661","shape_pt_sequence":2,"trip_id":"231"},{"service_id":"sat","shape_dist_traveled":"162.2036","stop_sequence":1,"stop_id":"bart_o","stop_name":"MacArthur BART Station","lat":"37.8285","lon":"-122.2663","trip_id":"231"},{"shape_dist_traveled":"343.9605","lat":"37.8269","lon":"-122.2668","shape_pt_sequence":4},{"shape_dist_traveled":"360.3142","lat":"37.8269","lon":"-122.2669","shape_pt_sequence":5},{"shape_dist_traveled":"554.6738","lat":"37.8272","lon":"-122.2691","shape_pt_sequence":6},{"shape_dist_traveled":"1005.7460","lat":"37.8280","lon":"-122.2741","shape_pt_sequence":7},{"shape_dist_traveled":"1038.2701","lat":"37.8282","lon":"-122.2744","shape_pt_sequence":8},{"shape_dist_traveled":"1311.0488","lat":"37.8306","lon":"-122.2739","shape_pt_sequence":9},{"shape_dist_traveled":"1330.4267","lat":"37.8307","lon":"-122.2740","shape_pt_sequence":10},{"shape_dist_traveled":"1556.8151","lat":"37.8311","lon":"-122.2766","shape_pt_sequence":11},{"shape_dist_traveled":"1696.8379","lat":"37.8314","lon":"-122.2781","shape_pt_sequence":12},{"shape_dist_traveled":"1726.7807","lat":"37.8313","lon":"-122.2785","shape_pt_sequence":13},{"service_id":"sat","shape_dist_traveled":"1828.2252","stop_sequence":2,"stop_id":"40sp_o","stop_name":"40th at San Pablo","lat":"37.8311","lon":"-122.2796","trip_id":"231"},{"service_id":"sat","shape_dist_traveled":"1972.9545","stop_sequence":3,"stop_id":"40em_o","stop_name":"40th at Emery","lat":"37.8308","lon":"-122.2812","trip_id":"231"},{"service_id":"sat","shape_dist_traveled":"2324.1470","stop_sequence":4,"stop_id":"40ho_o","stop_name":"40th at Hollis","lat":"37.8300","lon":"-122.2850","trip_id":"231"},{"service_id":"sat","shape_dist_traveled":"2582.5394","stop_sequence":5,"stop_id":"40hr_o","stop_name":"40th at Horton","lat":"37.8294","lon":"-122.2879","trip_id":"231"},{"shape_dist_traveled":"2653.6828","lat":"37.8293","lon":"-122.2887","shape_pt_sequence":19},{"shape_dist_traveled":"2843.6210","lat":"37.8287","lon":"-122.2907","shape_pt_sequence":20},{"shape_dist_traveled":"2895.1551","lat":"37.8286","lon":"-122.2913","shape_pt_sequence":21},{"shape_dist_traveled":"2963.6901","lat":"37.8287","lon":"-122.2921","shape_pt_sequence":22},{"shape_dist_traveled":"3020.3163","lat":"37.8291","lon":"-122.2926","shape_pt_sequence":23},{"shape_dist_traveled":"3087.8989","lat":"37.8296","lon":"-122.2928","shape_pt_sequence":24},{"shape_dist_traveled":"3294.9081","lat":"37.8315","lon":"-122.2929","shape_pt_sequence":25},{"shape_dist_traveled":"3367.7165","lat":"37.8322","lon":"-122.2930","shape_pt_sequence":26},{"shape_dist_traveled":"3465.2566","lat":"37.8330","lon":"-122.2933","shape_pt_sequence":27},{"service_id":"sat","shape_dist_traveled":"3499.1456","stop_sequence":6,"stop_id":"embay_o","stop_name":"Bay Street","lat":"37.8333","lon":"-122.2933","trip_id":"231"},{"shape_dist_traveled":"3538.7766","lat":"37.8337","lon":"-122.2934","shape_pt_sequence":29},{"shape_dist_traveled":"3588.4844","lat":"37.8341","lon":"-122.2933","shape_pt_sequence":30},{"shape_dist_traveled":"3671.4924","lat":"37.8348","lon":"-122.2929","shape_pt_sequence":31},{"shape_dist_traveled":"3739.5994","lat":"37.8354","lon":"-122.2928","shape_pt_sequence":32},{"service_id":"sat","shape_dist_traveled":"3962.5507","stop_sequence":7,"stop_id":"shch_o","stop_name":"Shellmound at Christie","lat":"37.8374","lon":"-122.2930","trip_id":"231"},{"shape_dist_traveled":"4105.4104","lat":"37.8387","lon":"-122.2931","shape_pt_sequence":34},{"service_id":"sat","shape_dist_traveled":"4124.6256","stop_sequence":8,"stop_id":"wfs_o","stop_name":"Hyatt Summerfield Suites","lat":"37.8388","lon":"-122.2932","trip_id":"231"},{"shape_dist_traveled":"4224.0160","lat":"37.8397","lon":"-122.2934","shape_pt_sequence":36},{"shape_dist_traveled":"4254.0516","lat":"37.8400","lon":"-122.2934","shape_pt_sequence":37},{"shape_dist_traveled":"4351.7889","lat":"37.8408","lon":"-122.2932","shape_pt_sequence":38},{"shape_dist_traveled":"4407.3563","lat":"37.8413","lon":"-122.2929","shape_pt_sequence":39},{"shape_dist_traveled":"4447.3961","lat":"37.8416","lon":"-122.2929","shape_pt_sequence":40},{"shape_dist_traveled":"4474.4365","lat":"37.8419","lon":"-122.2930","shape_pt_sequence":41},{"shape_dist_traveled":"4736.8047","lat":"37.8442","lon":"-122.2937","shape_pt_sequence":42},{"shape_dist_traveled":"4848.4755","lat":"37.8451","lon":"-122.2942","shape_pt_sequence":43},{"shape_dist_traveled":"4977.2293","lat":"37.8462","lon":"-122.2945","shape_pt_sequence":44},{"service_id":"sat","shape_dist_traveled":"5013.2471","stop_sequence":9,"stop_id":"65sh_o","stop_name":"65th at Shellmound","lat":"37.8462","lon":"-122.2949","trip_id":"231"},{"shape_dist_traveled":"5130.1618","lat":"37.8462","lon":"-122.2962","shape_pt_sequence":46},{"shape_dist_traveled":"5154.2889","lat":"37.8460","lon":"-122.2965","shape_pt_sequence":47},{"service_id":"sat","shape_dist_traveled":"5205.0913","stop_sequence":10,"stop_id":"ch65_o","stop_name":"Christie at 65th","lat":"37.8456","lon":"-122.2964","trip_id":"231"},{"shape_dist_traveled":"5346.7492","lat":"37.8443","lon":"-122.2960","shape_pt_sequence":49},{"service_id":"sat","shape_dist_traveled":"5425.3077","stop_sequence":11,"stop_id":"ch64_o","stop_name":"Christie at 64th","lat":"37.8436","lon":"-122.2958","trip_id":"231"},{"service_id":"sat","shape_dist_traveled":"5657.4062","stop_sequence":12,"stop_id":"ebpm_o","stop_name":"Christie at Public Market","lat":"37.8416","lon":"-122.2951","trip_id":"231"},{"shape_dist_traveled":"5806.3759","lat":"37.8403","lon":"-122.2947","shape_pt_sequence":52},{"shape_dist_traveled":"5834.2301","lat":"37.8401","lon":"-122.2947","shape_pt_sequence":53},{"service_id":"sat","shape_dist_traveled":"5867.6314","stop_sequence":13,"stop_id":"chsw_o","stop_name":"Christie at Shellmound","lat":"37.8398","lon":"-122.2948","trip_id":"231"},{"shape_dist_traveled":"5907.7454","lat":"37.8394","lon":"-122.2950","shape_pt_sequence":55},{"shape_dist_traveled":"5929.9844","lat":"37.8392","lon":"-122.2950","shape_pt_sequence":56},{"shape_dist_traveled":"6004.1620","lat":"37.8386","lon":"-122.2948","shape_pt_sequence":57},{"shape_dist_traveled":"6017.1577","lat":"37.8385","lon":"-122.2948","shape_pt_sequence":58},{"shape_dist_traveled":"6212.7733","lat":"37.8380","lon":"-122.2970","shape_pt_sequence":59},{"shape_dist_traveled":"6265.1498","lat":"37.8378","lon":"-122.2975","shape_pt_sequence":60},{"service_id":"sat","shape_dist_traveled":"6341.8847","stop_sequence":14,"stop_id":"pohi_o","stop_name":"Powell at Hilton Garden Inn","lat":"37.8377","lon":"-122.2984","trip_id":"231"},{"shape_dist_traveled":"6452.5687","lat":"37.8374","lon":"-122.2996","shape_pt_sequence":62},{"shape_dist_traveled":"6484.1700","lat":"37.8376","lon":"-122.2999","shape_pt_sequence":63},{"service_id":"sat","shape_dist_traveled":"6548.0272","stop_sequence":15,"stop_id":"wgt_o","stop_name":"The Towers","lat":"37.8381","lon":"-122.3002","trip_id":"231"},{"shape_dist_traveled":"6653.5570","lat":"37.8390","lon":"-122.3006","shape_pt_sequence":65},{"shape_dist_traveled":"6676.3193","lat":"37.8389","lon":"-122.3008","shape_pt_sequence":66},{"shape_dist_traveled":"6845.7037","lat":"37.8374","lon":"-122.3001","shape_pt_sequence":67},{"shape_dist_traveled":"6860.7836","lat":"37.8373","lon":"-122.3002","shape_pt_sequence":68},{"shape_dist_traveled":"6920.2516","lat":"37.8372","lon":"-122.3008","shape_pt_sequence":69},{"service_id":"sat","shape_dist_traveled":"7067.2368","stop_sequence":16,"stop_id":"wgc_o","stop_name":"Watergate Condos","lat":"37.8371","lon":"-122.3025","trip_id":"231"}],"232":[{"shape_dist_traveled":"0.0000","lat":"37.8371","lon":"-122.3025","shape_pt_sequence":1,"trip_id":"232"},{"service_id":"sat","shape_dist_traveled":"178.7216","stop_sequence":1,"stop_id":"fps_i","stop_name":"Fire and Police Stations","lat":"37.8372","lon":"-122.3046","trip_id":"232"},{"shape_dist_traveled":"277.5221","lat":"37.8372","lon":"-122.3057","shape_pt_sequence":3},{"shape_dist_traveled":"310.9666","lat":"37.8371","lon":"-122.3061","shape_pt_sequence":4},{"shape_dist_traveled":"322.1207","lat":"37.8370","lon":"-122.3061","shape_pt_sequence":5},{"shape_dist_traveled":"394.4393","lat":"37.8370","lon":"-122.3052","shape_pt_sequence":6},{"shape_dist_traveled":"699.1652","lat":"37.8370","lon":"-122.3018","shape_pt_sequence":7},{"shape_dist_traveled":"784.5292","lat":"37.8370","lon":"-122.3008","shape_pt_sequence":8},{"shape_dist_traveled":"817.6896","lat":"37.8371","lon":"-122.3004","shape_pt_sequence":9},{"shape_dist_traveled":"989.5392","lat":"37.8375","lon":"-122.2985","shape_pt_sequence":10},{"shape_dist_traveled":"1281.6843","lat":"37.8382","lon":"-122.2953","shape_pt_sequence":11},{"shape_dist_traveled":"1330.4417","lat":"37.8382","lon":"-122.2948","shape_pt_sequence":12},{"shape_dist_traveled":"1351.6951","lat":"37.8381","lon":"-122.2946","shape_pt_sequence":13},{"service_id":"sat","shape_dist_traveled":"1438.6840","stop_sequence":2,"stop_id":"chpp_i","stop_name":"Christie at Powell St. Plaza","lat":"37.8373","lon":"-122.2944","trip_id":"232"},{"shape_dist_traveled":"1456.2836","lat":"37.8372","lon":"-122.2943","shape_pt_sequence":15},{"shape_dist_traveled":"1488.2102","lat":"37.8370","lon":"-122.2940","shape_pt_sequence":16},{"shape_dist_traveled":"1564.6192","lat":"37.8370","lon":"-122.2932","shape_pt_sequence":17},{"shape_dist_traveled":"1590.9203","lat":"37.8368","lon":"-122.2930","shape_pt_sequence":18},{"shape_dist_traveled":"1761.3749","lat":"37.8353","lon":"-122.2929","shape_pt_sequence":19},{"shape_dist_traveled":"1809.5823","lat":"37.8348","lon":"-122.2930","shape_pt_sequence":20},{"service_id":"sat","shape_dist_traveled":"1913.4313","stop_sequence":3,"stop_id":"ctbmt_i","stop_name":"Courtyard by Marriott","lat":"37.8340","lon":"-122.2934","trip_id":"232"},{"shape_dist_traveled":"1960.9518","lat":"37.8336","lon":"-122.2935","shape_pt_sequence":22},{"shape_dist_traveled":"2004.3978","lat":"37.8332","lon":"-122.2935","shape_pt_sequence":23},{"shape_dist_traveled":"2132.0300","lat":"37.8321","lon":"-122.2931","shape_pt_sequence":24},{"shape_dist_traveled":"2198.1096","lat":"37.8315","lon":"-122.2930","shape_pt_sequence":25},{"shape_dist_traveled":"2412.9747","lat":"37.8295","lon":"-122.2929","shape_pt_sequence":26},{"shape_dist_traveled":"2447.7040","lat":"37.8292","lon":"-122.2928","shape_pt_sequence":27},{"shape_dist_traveled":"2512.5334","lat":"37.8287","lon":"-122.2924","shape_pt_sequence":28},{"shape_dist_traveled":"2574.2122","lat":"37.8285","lon":"-122.2918","shape_pt_sequence":29},{"shape_dist_traveled":"2615.5509","lat":"37.8286","lon":"-122.2913","shape_pt_sequence":30},{"shape_dist_traveled":"2894.6988","lat":"37.8292","lon":"-122.2882","shape_pt_sequence":31},{"service_id":"sat","shape_dist_traveled":"2981.7620","stop_sequence":4,"stop_id":"40hr_i","stop_name":"40th at Horton","lat":"37.8294","lon":"-122.2872","trip_id":"232"},{"service_id":"sat","shape_dist_traveled":"3195.3755","stop_sequence":5,"stop_id":"40ho_i","stop_name":"40th at Hollis","lat":"37.8299","lon":"-122.2849","trip_id":"232"},{"service_id":"sat","shape_dist_traveled":"3522.0768","stop_sequence":6,"stop_id":"40em_i","stop_name":"40th at Emery","lat":"37.8306","lon":"-122.2813","trip_id":"232"},{"service_id":"sat","shape_dist_traveled":"3625.6930","stop_sequence":7,"stop_id":"40sp_i","stop_name":"40th at San Pablo","lat":"37.8308","lon":"-122.2802","trip_id":"232"},{"shape_dist_traveled":"3779.4196","lat":"37.8312","lon":"-122.2785","shape_pt_sequence":36},{"shape_dist_traveled":"3807.0061","lat":"37.8312","lon":"-122.2782","shape_pt_sequence":37},{"shape_dist_traveled":"4025.2345","lat":"37.8308","lon":"-122.2757","shape_pt_sequence":38},{"shape_dist_traveled":"4319.9071","lat":"37.8303","lon":"-122.2724","shape_pt_sequence":39},{"shape_dist_traveled":"4649.2613","lat":"37.8297","lon":"-122.2688","shape_pt_sequence":40},{"service_id":"sat","shape_dist_traveled":"4760.8793","stop_sequence":8,"stop_id":"bartw_i","stop_name":"MacArthur Bart Station","lat":"37.8295","lon":"-122.2675","trip_id":"232"},{"service_id":"sat","shape_dist_traveled":"4813.4237","stop_sequence":9,"stop_id":"barta_i","stop_name":"MacArthur Bart Station (Hidden Arrival)","lat":"37.8294","lon":"-122.2669","trip_id":"232"}]},"sun":{"343":[],"344":[]},"wkd":{"429":[],"430":[]}}}]};

    $scope.addMarkers = function () {

        var array = onkarrSays.shapesAndStops;
        var triggerpoints = [];
        $scope.markers = {};
        array.forEach(function (item) {
            if (item.route === $scope.route) {
                var service_id = item.data;
                if (service_id[$scope.service_id]) {
                    var i = 0;
                    var routeIdObj = service_id[$scope.service_id];
                    for (var prop in routeIdObj) {

                        routeIdObj[prop].forEach(function (point) {

                            $scope.markers['x' + i] =
                                {
                                    lat: point.lat * 1,
                                    lng: point.lon * 1,
                                    draggable: false,
                                    message: point.stop_id ? point.stop_id : 'point ' + point.shape_pt_sequence,
                                    icon: {
                                        type: "awesomeMarker",
                                        icon: "star",
                                        markerColor: point.stop_id ? 'red' : 'blue'
                                    }
                                };
                            i++;
                        });

                        var temp = routeIdObj[prop];
                        var clonedArray = [].concat(temp.reverse());
                        for (var j = 0; j < clonedArray.length - 1; j++) {
                            if (clonedArray[j].stop_sequence) {
                                var currentStop = clonedArray[j];
                                //we have a stop and now we need to find a lat/lng that is 40 meters away
                                //lets get items in the array until we are over 40 meters away then we want to grab that item and the one before
                                //and we'll have a line in which the 40 meter point is in.
                                var distance = [55, 85];
                                var triggerpoint = [];

                                distance.forEach(function (center) {
                                    var index = 1;
                                    while (((j + index) < clonedArray.length) && (distance > (calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon)))) {  //get going until we are over 40 meters or we hit the last item in the array
                                        console.log(calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon), 'should be less than 40 in the while');
                                        center = center - calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon);

                                        //store this point so that we can factor in it's distance from origin
                                        index = index + 1;
                                    }

                                    var nextMaxPoint = clonedArray[j + index];
                                    var nextMinPoint = clonedArray[j + index - 1];

                                    //                               console.log(calcLatLngDistance(nextMaxPoint.lat, nextMaxPoint.lon, nextMinPoint.lat, nextMinPoint.lon));

                                    var testresult = midpoint(nextMinPoint.lat, nextMinPoint.lon, nextMaxPoint.lat, nextMaxPoint.lon, (center / calcLatLngDistance(nextMaxPoint.lat, nextMaxPoint.lon, nextMinPoint.lat, nextMinPoint.lon)));

                                    if (isNaN(testresult[0])) {
                                        console.log(nextMinPoint.lat, nextMinPoint.lon, nextMaxPoint.lat, nextMaxPoint.lon);
                                        console.log(center / calcLatLngDistance(nextMaxPoint.lat, nextMaxPoint.lon, nextMinPoint.lat, nextMinPoint.lon));

                                    }

                                    //we have a triggerpoint lat lon.. add it to trigger points array so we can create it later...
                                    triggerpoint.push({lat: testresult[0], lon: testresult[1]});


                                });

                                triggerpoints.push(triggerpoint);
                            }
                        }
                    }
                }
            }
        });
        var i = 0;
        triggerpoints.forEach(function (triggerpoint) {


            $scope.markers['triggerpointclosest' + i] =
                {
                    lat: triggerpoint[0].lat * 1,
                    lng: triggerpoint[0].lon * 1,
                    draggable: false,
                    message: 'exit' + i,
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
                    message: 'entry' + i,
                    icon: {
                        type: "awesomeMarker",
                        icon: "star",
                        markerColor: 'green'
                    }
                };
            i++;
        });
    };


}]);