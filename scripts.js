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

    var _midpoint = function (lat1, long1, lat2, long2, per) {
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
                combined.push(x);
            });
        } else {
            point.array.forEach(function (item) {
                if (!lastValue) lastValue = combined[combined.length - 1].shape_dist_traveled;
                x = item;
                x.lat = x.lat * 1;
                x.lon = x.lon * 1;
                x.shape_dist_traveled = x.shape_dist_traveled * 1 + lastValue;
                combined.push(x);
            });

        }
        return combined;

    };

    $scope.route = "powell";
    $scope.service_id = "sat";
    $scope.headsign = "to BART Station";

    var onkarrSays = {
        "shapesAndStops": [{
            "route": "powell", "data": {
                "authorityId": "emery-avas", "route": "powell", "sat": {
                    "231": [
                            {
                            "shape_dist_traveled": "0.0000",
                            "lat": "37.8294",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 1,
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "75.8891",
                            "lat": "37.8293",
                            "lon": "-122.2661",
                            "shape_pt_sequence": 2,
                            "trip_id": "231"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "162.2036",
                            "stop_sequence": 1,
                            "stop_id": "bart_o",
                            "stop_name": "MacArthur BART Station",
                            "lat": "37.8285",
                            "lon": "-122.2663",
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "343.9605",
                            "lat": "37.8269",
                            "lon": "-122.2668",
                            "shape_pt_sequence": 4
                        }, {
                            "shape_dist_traveled": "360.3142",
                            "lat": "37.8269",
                            "lon": "-122.2669",
                            "shape_pt_sequence": 5
                        }, {
                            "shape_dist_traveled": "554.6738",
                            "lat": "37.8272",
                            "lon": "-122.2691",
                            "shape_pt_sequence": 6
                        }, {
                            "shape_dist_traveled": "1005.7460",
                            "lat": "37.8280",
                            "lon": "-122.2741",
                            "shape_pt_sequence": 7
                        }, {
                            "shape_dist_traveled": "1038.2701",
                            "lat": "37.8282",
                            "lon": "-122.2744",
                            "shape_pt_sequence": 8
                        }, {
                            "shape_dist_traveled": "1311.0488",
                            "lat": "37.8306",
                            "lon": "-122.2739",
                            "shape_pt_sequence": 9
                        }, {
                            "shape_dist_traveled": "1330.4267",
                            "lat": "37.8307",
                            "lon": "-122.2740",
                            "shape_pt_sequence": 10
                        }, {
                            "shape_dist_traveled": "1556.8151",
                            "lat": "37.8311",
                            "lon": "-122.2766",
                            "shape_pt_sequence": 11
                        }, {
                            "shape_dist_traveled": "1696.8379",
                            "lat": "37.8314",
                            "lon": "-122.2781",
                            "shape_pt_sequence": 12
                        }, {
                            "shape_dist_traveled": "1726.7807",
                            "lat": "37.8313",
                            "lon": "-122.2785",
                            "shape_pt_sequence": 13
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "1828.2252",
                            "stop_sequence": 2,
                            "stop_id": "40sp_o",
                            "stop_name": "40th at San Pablo",
                            "lat": "37.8311",
                            "lon": "-122.2796",
                            "trip_id": "231"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "1972.9545",
                            "stop_sequence": 3,
                            "stop_id": "40em_o",
                            "stop_name": "40th at Emery",
                            "lat": "37.8308",
                            "lon": "-122.2812",
                            "trip_id": "231"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2324.1470",
                            "stop_sequence": 4,
                            "stop_id": "40ho_o",
                            "stop_name": "40th at Hollis",
                            "lat": "37.8300",
                            "lon": "-122.2850",
                            "trip_id": "231"
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "2582.5394",
                            "stop_sequence": 5,
                            "stop_id": "40hr_o",
                            "stop_name": "40th at Horton",
                            "lat": "37.8294",
                            "lon": "-122.2879",
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "2653.6828",
                            "lat": "37.8293",
                            "lon": "-122.2887",
                            "shape_pt_sequence": 19
                        }, {
                            "shape_dist_traveled": "2843.6210",
                            "lat": "37.8287",
                            "lon": "-122.2907",
                            "shape_pt_sequence": 20
                        }, {
                            "shape_dist_traveled": "2895.1551",
                            "lat": "37.8286",
                            "lon": "-122.2913",
                            "shape_pt_sequence": 21
                        }, {
                            "shape_dist_traveled": "2963.6901",
                            "lat": "37.8287",
                            "lon": "-122.2921",
                            "shape_pt_sequence": 22
                        }, {
                            "shape_dist_traveled": "3020.3163",
                            "lat": "37.8291",
                            "lon": "-122.2926",
                            "shape_pt_sequence": 23
                        }, {
                            "shape_dist_traveled": "3087.8989",
                            "lat": "37.8296",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 24
                        }, {
                            "shape_dist_traveled": "3294.9081",
                            "lat": "37.8315",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 25
                        }, {
                            "shape_dist_traveled": "3367.7165",
                            "lat": "37.8322",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 26
                        }, {
                            "shape_dist_traveled": "3465.2566",
                            "lat": "37.8330",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 27
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "3499.1456",
                            "stop_sequence": 6,
                            "stop_id": "embay_o",
                            "stop_name": "Bay Street",
                            "lat": "37.8333",
                            "lon": "-122.2933",
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "3538.7766",
                            "lat": "37.8337",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 29
                        },
                            {
                            "shape_dist_traveled": "3588.4844",
                            "lat": "37.8341",
                            "lon": "-122.2933",
                            "shape_pt_sequence": 30
                        }, {
                            "shape_dist_traveled": "3671.4924",
                            "lat": "37.8348",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 31
                        }, {
                            "shape_dist_traveled": "3739.5994",
                            "lat": "37.8354",
                            "lon": "-122.2928",
                            "shape_pt_sequence": 32
                        },
                            {
                            "service_id": "sat",
                            "shape_dist_traveled": "3962.5507",
                            "stop_sequence": 7,
                            "stop_id": "shch_o",
                            "stop_name": "Shellmound at Christie",
                            "lat": "37.8374",
                            "lon": "-122.2930",
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "4105.4104",
                            "lat": "37.8387",
                            "lon": "-122.2931",
                            "shape_pt_sequence": 34
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "4124.6256",
                            "stop_sequence": 8,
                            "stop_id": "wfs_o",
                            "stop_name": "Hyatt Summerfield Suites",
                            "lat": "37.8388",
                            "lon": "-122.2932",
                            "trip_id": "231"
                        },
                            {
                            "shape_dist_traveled": "4224.0160",
                            "lat": "37.8397",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 36
                        }, {
                            "shape_dist_traveled": "4254.0516",
                            "lat": "37.8400",
                            "lon": "-122.2934",
                            "shape_pt_sequence": 37
                        }, {
                            "shape_dist_traveled": "4351.7889",
                            "lat": "37.8408",
                            "lon": "-122.2932",
                            "shape_pt_sequence": 38
                        },
                        {
                            "shape_dist_traveled": "4407.3563",
                            "lat": "37.8413",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 39
                        }, {
                            "shape_dist_traveled": "4447.3961",
                            "lat": "37.8416",
                            "lon": "-122.2929",
                            "shape_pt_sequence": 40
                        }, {
                            "shape_dist_traveled": "4474.4365",
                            "lat": "37.8419",
                            "lon": "-122.2930",
                            "shape_pt_sequence": 41
                        }, {
                            "shape_dist_traveled": "4736.8047",
                            "lat": "37.8442",
                            "lon": "-122.2937",
                            "shape_pt_sequence": 42
                        }, {
                            "shape_dist_traveled": "4848.4755",
                            "lat": "37.8451",
                            "lon": "-122.2942",
                            "shape_pt_sequence": 43
                        }, {
                            "shape_dist_traveled": "4977.2293",
                            "lat": "37.8462",
                            "lon": "-122.2945",
                            "shape_pt_sequence": 44
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5013.2471",
                            "stop_sequence": 9,
                            "stop_id": "65sh_o",
                            "stop_name": "65th at Shellmound",
                            "lat": "37.8462",
                            "lon": "-122.2949",
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "5130.1618",
                            "lat": "37.8462",
                            "lon": "-122.2962",
                            "shape_pt_sequence": 46
                        }, {
                            "shape_dist_traveled": "5154.2889",
                            "lat": "37.8460",
                            "lon": "-122.2965",
                            "shape_pt_sequence": 47
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5205.0913",
                            "stop_sequence": 10,
                            "stop_id": "ch65_o",
                            "stop_name": "Christie at 65th",
                            "lat": "37.8456",
                            "lon": "-122.2964",
                            "trip_id": "231"
                        }, {
                            "shape_dist_traveled": "5346.7492",
                            "lat": "37.8443",
                            "lon": "-122.2960",
                            "shape_pt_sequence": 49
                        }, {
                            "service_id": "sat",
                            "shape_dist_traveled": "5425.3077",
                            "stop_sequence": 11,
                            "stop_id": "ch64_o",
                            "stop_name": "Christie at 64th",
                            "lat": "37.8436",
                            "lon": "-122.2958",
                            "trip_id": "231"
                        },
                             {
                             "service_id": "sat",
                             "shape_dist_traveled": "5657.4062",
                             "stop_sequence": 12,
                             "stop_id": "ebpm_o",
                             "stop_name": "Christie at Public Market",
                             "lat": "37.8416",
                             "lon": "-122.2951",
                             "trip_id": "231"
                         }, {
                             "shape_dist_traveled": "5806.3759",
                             "lat": "37.8403",
                             "lon": "-122.2947",
                             "shape_pt_sequence": 52
                         }, {
                             "shape_dist_traveled": "5834.2301",
                             "lat": "37.8401",
                             "lon": "-122.2947",
                             "shape_pt_sequence": 53
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "5867.6314",
                             "stop_sequence": 13,
                             "stop_id": "chsw_o",
                             "stop_name": "Christie at Shellmound",
                             "lat": "37.8398",
                             "lon": "-122.2948",
                             "trip_id": "231"
                         }, {
                             "shape_dist_traveled": "5907.7454",
                             "lat": "37.8394",
                             "lon": "-122.2950",
                             "shape_pt_sequence": 55
                         }, {
                             "shape_dist_traveled": "5929.9844",
                             "lat": "37.8392",
                             "lon": "-122.2950",
                             "shape_pt_sequence": 56
                         }, {
                             "shape_dist_traveled": "6004.1620",
                             "lat": "37.8386",
                             "lon": "-122.2948",
                             "shape_pt_sequence": 57
                         }, {
                             "shape_dist_traveled": "6017.1577",
                             "lat": "37.8385",
                             "lon": "-122.2948",
                             "shape_pt_sequence": 58
                         }, {
                             "shape_dist_traveled": "6212.7733",
                             "lat": "37.8380",
                             "lon": "-122.2970",
                             "shape_pt_sequence": 59
                         }, {
                             "shape_dist_traveled": "6265.1498",
                             "lat": "37.8378",
                             "lon": "-122.2975",
                             "shape_pt_sequence": 60
                         },
                             {
                             "service_id": "sat",
                             "shape_dist_traveled": "6341.8847",
                             "stop_sequence": 14,
                             "stop_id": "pohi_o",
                             "stop_name": "Powell at Hilton Garden Inn",
                             "lat": "37.8377",
                             "lon": "-122.2984",
                             "trip_id": "231"
                         }, {
                             "shape_dist_traveled": "6452.5687",
                             "lat": "37.8374",
                             "lon": "-122.2996",
                             "shape_pt_sequence": 62
                         }, {
                             "shape_dist_traveled": "6484.1700",
                             "lat": "37.8376",
                             "lon": "-122.2999",
                             "shape_pt_sequence": 63
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "6548.0272",
                             "stop_sequence": 15,
                             "stop_id": "wgt_o",
                             "stop_name": "The Towers",
                             "lat": "37.8381",
                             "lon": "-122.3002",
                             "trip_id": "231"
                         }, {
                             "shape_dist_traveled": "6653.5570",
                             "lat": "37.8390",
                             "lon": "-122.3006",
                             "shape_pt_sequence": 65
                         }, {
                             "shape_dist_traveled": "6676.3193",
                             "lat": "37.8389",
                             "lon": "-122.3008",
                             "shape_pt_sequence": 66
                         }, {
                             "shape_dist_traveled": "6845.7037",
                             "lat": "37.8374",
                             "lon": "-122.3001",
                             "shape_pt_sequence": 67
                         }, {
                             "shape_dist_traveled": "6860.7836",
                             "lat": "37.8373",
                             "lon": "-122.3002",
                             "shape_pt_sequence": 68
                         },
                             {
                             "shape_dist_traveled": "6920.2516",
                             "lat": "37.8372",
                             "lon": "-122.3008",
                             "shape_pt_sequence": 69
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "7067.2368",
                             "stop_sequence": 16,
                             "stop_id": "wgc_o",
                             "stop_name": "Watergate Condos",
                             "lat": "37.8371",
                             "lon": "-122.3025",
                             "trip_id": "231"
                        }
                         ],
                         "232": [{
                             "shape_dist_traveled": "0.0000",
                             "lat": "37.8371",
                             "lon": "-122.3025",
                             "shape_pt_sequence": 1,
                             "trip_id": "232"
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "178.7216",
                             "stop_sequence": 1,
                             "stop_id": "fps_i",
                             "stop_name": "Fire and Police Stations",
                             "lat": "37.8372",
                             "lon": "-122.3046",
                             "trip_id": "232"
                         }, {
                             "shape_dist_traveled": "277.5221",
                             "lat": "37.8372",
                             "lon": "-122.3057",
                             "shape_pt_sequence": 3
                         }, {
                             "shape_dist_traveled": "310.9666",
                             "lat": "37.8371",
                             "lon": "-122.3061",
                             "shape_pt_sequence": 4
                         }, {
                             "shape_dist_traveled": "322.1207",
                             "lat": "37.8370",
                             "lon": "-122.3061",
                             "shape_pt_sequence": 5
                         }, {
                             "shape_dist_traveled": "394.4393",
                             "lat": "37.8370",
                             "lon": "-122.3052",
                             "shape_pt_sequence": 6
                         }, {
                             "shape_dist_traveled": "699.1652",
                             "lat": "37.8370",
                             "lon": "-122.3018",
                             "shape_pt_sequence": 7
                         }, {
                             "shape_dist_traveled": "784.5292",
                             "lat": "37.8370",
                             "lon": "-122.3008",
                             "shape_pt_sequence": 8
                         }, {
                             "shape_dist_traveled": "817.6896",
                             "lat": "37.8371",
                             "lon": "-122.3004",
                             "shape_pt_sequence": 9
                         }, {
                             "shape_dist_traveled": "989.5392",
                             "lat": "37.8375",
                             "lon": "-122.2985",
                             "shape_pt_sequence": 10
                         }, {
                             "shape_dist_traveled": "1281.6843",
                             "lat": "37.8382",
                             "lon": "-122.2953",
                             "shape_pt_sequence": 11
                         }, {
                             "shape_dist_traveled": "1330.4417",
                             "lat": "37.8382",
                             "lon": "-122.2948",
                             "shape_pt_sequence": 12
                         }, {
                             "shape_dist_traveled": "1351.6951",
                             "lat": "37.8381",
                             "lon": "-122.2946",
                             "shape_pt_sequence": 13
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "1438.6840",
                             "stop_sequence": 2,
                             "stop_id": "chpp_i",
                             "stop_name": "Christie at Powell St. Plaza",
                             "lat": "37.8373",
                             "lon": "-122.2944",
                             "trip_id": "232"
                         }, {
                             "shape_dist_traveled": "1456.2836",
                             "lat": "37.8372",
                             "lon": "-122.2943",
                             "shape_pt_sequence": 15
                         }, {
                             "shape_dist_traveled": "1488.2102",
                             "lat": "37.8370",
                             "lon": "-122.2940",
                             "shape_pt_sequence": 16
                         }, {
                             "shape_dist_traveled": "1564.6192",
                             "lat": "37.8370",
                             "lon": "-122.2932",
                             "shape_pt_sequence": 17
                         }, {
                             "shape_dist_traveled": "1590.9203",
                             "lat": "37.8368",
                             "lon": "-122.2930",
                             "shape_pt_sequence": 18
                         }, {
                             "shape_dist_traveled": "1761.3749",
                             "lat": "37.8353",
                             "lon": "-122.2929",
                             "shape_pt_sequence": 19
                         }, {
                             "shape_dist_traveled": "1809.5823",
                             "lat": "37.8348",
                             "lon": "-122.2930",
                             "shape_pt_sequence": 20
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "1913.4313",
                             "stop_sequence": 3,
                             "stop_id": "ctbmt_i",
                             "stop_name": "Courtyard by Marriott",
                             "lat": "37.8340",
                             "lon": "-122.2934",
                             "trip_id": "232"
                         }, {
                             "shape_dist_traveled": "1960.9518",
                             "lat": "37.8336",
                             "lon": "-122.2935",
                             "shape_pt_sequence": 22
                         }, {
                             "shape_dist_traveled": "2004.3978",
                             "lat": "37.8332",
                             "lon": "-122.2935",
                             "shape_pt_sequence": 23
                         }, {
                             "shape_dist_traveled": "2132.0300",
                             "lat": "37.8321",
                             "lon": "-122.2931",
                             "shape_pt_sequence": 24
                         }, {
                             "shape_dist_traveled": "2198.1096",
                             "lat": "37.8315",
                             "lon": "-122.2930",
                             "shape_pt_sequence": 25
                         }, {
                             "shape_dist_traveled": "2412.9747",
                             "lat": "37.8295",
                             "lon": "-122.2929",
                             "shape_pt_sequence": 26
                         }, {
                             "shape_dist_traveled": "2447.7040",
                             "lat": "37.8292",
                             "lon": "-122.2928",
                             "shape_pt_sequence": 27
                         }, {
                             "shape_dist_traveled": "2512.5334",
                             "lat": "37.8287",
                             "lon": "-122.2924",
                             "shape_pt_sequence": 28
                         }, {
                             "shape_dist_traveled": "2574.2122",
                             "lat": "37.8285",
                             "lon": "-122.2918",
                             "shape_pt_sequence": 29
                         }, {
                             "shape_dist_traveled": "2615.5509",
                             "lat": "37.8286",
                             "lon": "-122.2913",
                             "shape_pt_sequence": 30
                         }, {
                             "shape_dist_traveled": "2894.6988",
                             "lat": "37.8292",
                             "lon": "-122.2882",
                             "shape_pt_sequence": 31
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "2981.7620",
                             "stop_sequence": 4,
                             "stop_id": "40hr_i",
                             "stop_name": "40th at Horton",
                             "lat": "37.8294",
                             "lon": "-122.2872",
                             "trip_id": "232"
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "3195.3755",
                             "stop_sequence": 5,
                             "stop_id": "40ho_i",
                             "stop_name": "40th at Hollis",
                             "lat": "37.8299",
                             "lon": "-122.2849",
                             "trip_id": "232"
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "3522.0768",
                             "stop_sequence": 6,
                             "stop_id": "40em_i",
                             "stop_name": "40th at Emery",
                             "lat": "37.8306",
                             "lon": "-122.2813",
                             "trip_id": "232"
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "3625.6930",
                             "stop_sequence": 7,
                             "stop_id": "40sp_i",
                             "stop_name": "40th at San Pablo",
                             "lat": "37.8308",
                             "lon": "-122.2802",
                             "trip_id": "232"
                         }, {
                             "shape_dist_traveled": "3779.4196",
                             "lat": "37.8312",
                             "lon": "-122.2785",
                             "shape_pt_sequence": 36
                         }, {
                             "shape_dist_traveled": "3807.0061",
                             "lat": "37.8312",
                             "lon": "-122.2782",
                             "shape_pt_sequence": 37
                         }, {
                             "shape_dist_traveled": "4025.2345",
                             "lat": "37.8308",
                             "lon": "-122.2757",
                             "shape_pt_sequence": 38
                         }, {
                             "shape_dist_traveled": "4319.9071",
                             "lat": "37.8303",
                             "lon": "-122.2724",
                             "shape_pt_sequence": 39
                         }, {
                             "shape_dist_traveled": "4649.2613",
                             "lat": "37.8297",
                             "lon": "-122.2688",
                             "shape_pt_sequence": 40
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "4760.8793",
                             "stop_sequence": 8,
                             "stop_id": "bartw_i",
                             "stop_name": "MacArthur Bart Station",
                             "lat": "37.8295",
                             "lon": "-122.2675",
                             "trip_id": "232"
                         }, {
                             "service_id": "sat",
                             "shape_dist_traveled": "4813.4237",
                             "stop_sequence": 9,
                             "stop_id": "barta_i",
                             "stop_name": "MacArthur Bart Station (Hidden Arrival)",
                             "lat": "37.8294",
                             "lon": "-122.2669",
                             "trip_id": "232"
                         }
                    ]
                }, "sun": {"343": [], "344": []}, "wkd": {"429": [], "430": []}
            }
        }]
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

    var _addStopOrPointMarker = function (point) {

        $scope.markers[point.stop_id ? 'stop' + point.stop_id : 'point' + point.shape_pt_sequence] =
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

    };

    var _getBorderingPoints = function (center, currentStop, clonedArray, j) {


        var index = 1;


        while (((j + index) < clonedArray.length - 1) && (center > _calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon))) {  //get going until we are over 40 meters or we hit the last item in the array

            center = center - _calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon);
            index = index + 1;
        }

        console.log( {
            nextMaxPoint: clonedArray[j + index],
            nextMinPoint: clonedArray[j + index - 1]
        }, center );

        return {
            nextMaxPoint: clonedArray[j + index],
            nextMinPoint: clonedArray[j + index - 1],
            distance: center
        };
    };

    var _buildTriggerPoint = function (clonedArray, j, triggerpoints) {
        var currentStop = clonedArray[j];

        //we have a stop and now we need to find a lat/lng that is 40 meters away
        //lets get items in the array until we are over 40 meters away then we want to grab that item and the one before
        //and we'll have a line in which the 40 meter point is in.  default distances for center points are 55 and 85..
        //[55,85]
        var distance = [55, 85];
        var triggerpoint = [];

        distance.forEach(function (center) {
            var borderPoints = _getBorderingPoints(center, currentStop, clonedArray, j);
            console.log(borderPoints);

      console.log( computeDistanceAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon,borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon,true));

      var check = computeDistanceAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon,borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon,true);
       //     console.log(center, _calcLatLngDistance(borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon, borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon), (center / _calcLatLngDistance(borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon, borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon)));
   var computed =  computeDestinationAndBearing(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon, check[2], borderPoints.distance);

      console.log(computed);

            // var middle = _midpoint(borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon, borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon,
            //     (center / _calcLatLngDistance(borderPoints.nextMaxPoint.lat, borderPoints.nextMaxPoint.lon, borderPoints.nextMinPoint.lat, borderPoints.nextMinPoint.lon)));
          //  triggerpoint.push({lat: middle[0], lon: middle[1], stop: currentStop.stop_id});

            triggerpoint.push({lat: computed[0], lon: computed[1], stop: currentStop.stop_id});
        });
        triggerpoints.push(triggerpoint);
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

    $scope.addMarkers = function () {

        var array = onkarrSays.shapesAndStops;
        var triggerpoints = [];
        $scope.markers = {};
        array.forEach(function (item) {
            if (item.route === $scope.route) {
                var service_id = item.data;
                if (service_id[$scope.service_id]) {

                    var routeIdObj = service_id[$scope.service_id];
                    var newArray = [];
                    for (var prop in routeIdObj) {
                        newArray.push({id: prop, array: routeIdObj[prop]});
                    }

                    var pointArray = newArray.sort(_sortById).reduce(_combineConsecutiveArrays, []);
                    pointArray.forEach(_addStopOrPointMarker);

                    var clonedArray = [].concat(pointArray.reverse());
                    for (var j = 0; j < clonedArray.length - 1; j++) {
                        if (clonedArray[j].stop_sequence) {
                            debugger;
                            _buildTriggerPoint(clonedArray, j, triggerpoints);
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
    };


    /**
     * @param lat1
     *          Initial latitude
     * @param lon1
     *          Initial longitude
     * @param lat2
     *          destination latitude
     * @param lon2
     *          destination longitude
     * @param results
     *          To be populated with the distance, initial bearing and final
     *          bearing
     */

    var computeDistanceAndBearing = function (lat1, lon1, lat2, lon2, bearings) {
        // Based on http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf
        // using the "Inverse Formula" (section 4)

        var bearing,bearing1;

        if (bearings){
           bearing =true;
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
        if (bearing ) {
            var initialBearing = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2
                - sinU1 * cosU2 * cosLambda);
            initialBearing *= 180.0 / Math.PI;
            results.push(initialBearing);
            if (bearing1 ) {
                var finalBearing = Math.atan2(cosU1 * sinLambda, -sinU1 * cosU2
                    + cosU1 * sinU2 * cosLambda);
                finalBearing *= 180.0 / Math.PI;
                results.push(finalBearing);
            }
        }
        return results;

    };

    /**
     * Calculates destination point and final bearing given given start point,
     * bearing & distance, using Vincenty inverse formula for ellipsoids
     *
     * @param lat1
     *          start point latitude
     * @param lon1
     *          start point longitude
     * @param brng
     *          initial bearing in decimal degrees
     * @param dist
     *          distance along bearing in metres
     * @returns an array of the desination point coordinates and the final bearing
     */

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


}]);