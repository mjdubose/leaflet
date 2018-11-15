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

    var  midpoint= function(lat1, long1, lat2, long2, per) {
          lat1 = lat1*1; long1=long1*1; lat2=lat2*1;long2=long2*1;
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

   $scope.route = "Hollis";
   $scope.service_id = "wkd";
   $scope.headsign = "to BART Station";

    $scope.addMarkers = function () {
        var array =     [
            {
                route: "holldcut",
                data: [
                    [
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 330.639150091779
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 346.992923170735
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 541.35247873652
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 992.424723284937
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1024.94882490274
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1297.72743796975
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1317.10537784042
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1543.49377910955
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1683.51657093779
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1713.45943201622
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1809.4369482424
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1835.98610285487
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1955.52889360502
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1981.85688716198
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 2,
                            id: 1300700,
                            stop_id: "ihop_o",
                            stop_name: "IHOP",
                            lat: "37.8323",
                            lon: "-122.2807"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 3,
                            id: 1300695,
                            stop_id: "pawa_o",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8319",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2446.70462477123
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2464.84395265793
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 4,
                            id: 1300662,
                            stop_id: "ho45_o",
                            stop_name: "Hollis at 45th",
                            lat: "37.8332",
                            lon: "-122.2864"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 5,
                            id: 1300685,
                            stop_id: "ho53_o",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8362",
                            lon: "-122.2876"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3137.6438361722
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3290.01173805234
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3309.45876033304
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3354.26895345848
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 6,
                            id: 1300680,
                            stop_id: "stho_o",
                            stop_name: "Stanford at Horton (Emery Station)",
                            lat: "37.8376",
                            lon: "-122.2900"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3440.08735708244
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3467.55810869762
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 7,
                            id: 1300676,
                            stop_id: "es_o",
                            stop_name: "Amtrak Station",
                            lat: "37.8407",
                            lon: "-122.2913"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8409",
                            lon: "-122.2912",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3839.83403580134
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8412",
                            lon: "-122.2898",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3969.50523543673
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8413",
                            lon: "-122.2897",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3986.84720200116
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 8,
                            id: 1300689,
                            stop_id: "ho59_o",
                            stop_name: "Hollis at 59th",
                            lat: "37.8416",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 9,
                            id: 1300702,
                            stop_id: "ho64_o",
                            stop_name: "Hollis at 64th",
                            lat: "37.8450",
                            lon: "-122.2908"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 10,
                            id: 1300669,
                            stop_id: "ho65_o",
                            stop_name: "Hollis at 65th",
                            lat: "37.8468",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8493",
                            lon: "-122.2922",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4904.38464088082
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8497",
                            lon: "-122.2921",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4944.94224120347
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8499",
                            lon: "-122.2910",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 5045.99019313928
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8502",
                            lon: "-122.2907",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 5082.28966157428
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8511",
                            lon: "-122.2910",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 5192.53821385625
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8521",
                            lon: "-122.2914",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 5306.00089779036
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8522",
                            lon: "-122.2913",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 5317.95561300719
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 11,
                            id: 1300693,
                            stop_id: "bbowl_i",
                            stop_name: "Berkeley Bowl West",
                            lat: "37.8525",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8524",
                            lon: "-122.2897",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 5472.41675594397
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8520",
                            lon: "-122.2895",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 5530.07482288556
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8518",
                            lon: "-122.2896",
                            shape_pt_sequence: 48,
                            shape_dist_traveled: 5544.7656195813
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8515",
                            lon: "-122.2911",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 5687.41172635356
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8514",
                            lon: "-122.2912",
                            shape_pt_sequence: 50,
                            shape_dist_traveled: 5703.48325772716
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8502",
                            lon: "-122.2909",
                            shape_pt_sequence: 51,
                            shape_dist_traveled: 5841.49409657093
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8500",
                            lon: "-122.2909",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5860.96128133208
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8498",
                            lon: "-122.2920",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5956.06456050414
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8496",
                            lon: "-122.2923",
                            shape_pt_sequence: 54,
                            shape_dist_traveled: 5992.66087816967
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8494",
                            lon: "-122.2923",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 6013.86079843392
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8479",
                            lon: "-122.2919",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 6186.76239565869
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8478",
                            lon: "-122.2916",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 6215.01105643626
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8483",
                            lon: "-122.2888",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 6462.97431497151
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8483",
                            lon: "-122.2886",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6480.57024504992
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 12,
                            id: 1300697,
                            stop_id: "vall66_i",
                            stop_name: "Vallejo at 66th",
                            lat: "37.8475",
                            lon: "-122.2884"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8475",
                            lon: "-122.2884",
                            shape_pt_sequence: 61,
                            shape_dist_traveled: 6573.27459938229
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8474",
                            lon: "-122.2884",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6588.66005816833
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8468",
                            lon: "-122.2912",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6842.00713508949
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8467",
                            lon: "-122.2915",
                            shape_pt_sequence: 64,
                            shape_dist_traveled: 6867.50598544329
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 13,
                            id: 1300660,
                            stop_id: "65ho_i",
                            stop_name: "65th at Hollis",
                            lat: "37.8465",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8449",
                            lon: "-122.2909",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 7075.55033019117
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 14,
                            id: 1300684,
                            stop_id: "ho64_i",
                            stop_name: "Hollis at 63rd",
                            lat: "37.8437",
                            lon: "-122.2905"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8431",
                            lon: "-122.2903",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 7276.50978455918
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 15,
                            id: 1300682,
                            stop_id: "ho59_i",
                            stop_name: "Hollis at 59th (Emery Station)",
                            lat: "37.8410",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8383",
                            lon: "-122.2888",
                            shape_pt_sequence: 70,
                            shape_dist_traveled: 7827.11143936746
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8375",
                            lon: "-122.2883",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7932.85626586534
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 16,
                            id: 1300701,
                            stop_id: "ho53_i",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8357",
                            lon: "-122.2875"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8349",
                            lon: "-122.2872",
                            shape_pt_sequence: 73,
                            shape_dist_traveled: 8232.62418339458
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 17,
                            id: 1300672,
                            stop_id: "ho45_i",
                            stop_name: "Hollis at 45th",
                            lat: "37.8331",
                            lon: "-122.2865"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2858",
                            shape_pt_sequence: 75,
                            shape_dist_traveled: 8660.74475940419
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8311",
                            lon: "-122.2855",
                            shape_pt_sequence: 76,
                            shape_dist_traveled: 8687.3766228254
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 18,
                            id: 1300696,
                            stop_id: "pix_i",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8317",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8319",
                            lon: "-122.2816",
                            shape_pt_sequence: 78,
                            shape_dist_traveled: 9043.54607663172
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8319",
                            lon: "-122.2814",
                            shape_pt_sequence: 79,
                            shape_dist_traveled: 9064.37614043648
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 19,
                            id: 1300675,
                            stop_id: "em40_i",
                            stop_name: "Emery at 40th",
                            lat: "37.8309",
                            lon: "-122.2811"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8307",
                            lon: "-122.2809",
                            shape_pt_sequence: 81,
                            shape_dist_traveled: 9201.7829706601
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 82,
                            shape_dist_traveled: 9422.60252225989
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 83,
                            shape_dist_traveled: 9450.18893157204
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 84,
                            shape_dist_traveled: 9668.41735173278
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 85,
                            shape_dist_traveled: 9963.08995580818
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 86,
                            shape_dist_traveled: 10292.4441411196
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 20,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sat",
                            stop_sequence: 21,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sat",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 89,
                            shape_dist_traveled: 10470.4091900068
                        }
                    ],
                    [
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 330.639150091779
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 346.992923170735
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 541.35247873652
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 992.424723284937
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1024.94882490274
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1297.72743796975
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1317.10537784042
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1543.49377910955
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1683.51657093779
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1713.45943201622
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1809.4369482424
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1835.98610285487
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1955.52889360502
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1981.85688716198
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 2,
                            id: 1300700,
                            stop_id: "ihop_o",
                            stop_name: "IHOP",
                            lat: "37.8323",
                            lon: "-122.2807"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 3,
                            id: 1300695,
                            stop_id: "pawa_o",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8319",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2446.70462477123
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2464.84395265793
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 4,
                            id: 1300662,
                            stop_id: "ho45_o",
                            stop_name: "Hollis at 45th",
                            lat: "37.8332",
                            lon: "-122.2864"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 5,
                            id: 1300685,
                            stop_id: "ho53_o",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8362",
                            lon: "-122.2876"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3137.6438361722
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3290.01173805234
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3309.45876033304
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3354.26895345848
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 6,
                            id: 1300680,
                            stop_id: "stho_o",
                            stop_name: "Stanford at Horton (Emery Station)",
                            lat: "37.8376",
                            lon: "-122.2900"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3440.08735708244
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3467.55810869762
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 7,
                            id: 1300676,
                            stop_id: "es_o",
                            stop_name: "Amtrak Station",
                            lat: "37.8407",
                            lon: "-122.2913"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8409",
                            lon: "-122.2912",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3839.83403580134
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8412",
                            lon: "-122.2898",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3969.50523543673
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8413",
                            lon: "-122.2897",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3986.84720200116
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 8,
                            id: 1300689,
                            stop_id: "ho59_o",
                            stop_name: "Hollis at 59th",
                            lat: "37.8416",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 9,
                            id: 1300702,
                            stop_id: "ho64_o",
                            stop_name: "Hollis at 64th",
                            lat: "37.8450",
                            lon: "-122.2908"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 10,
                            id: 1300669,
                            stop_id: "ho65_o",
                            stop_name: "Hollis at 65th",
                            lat: "37.8468",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8493",
                            lon: "-122.2922",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4904.38464088082
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8497",
                            lon: "-122.2921",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4944.94224120347
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8499",
                            lon: "-122.2910",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 5045.99019313928
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8502",
                            lon: "-122.2907",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 5082.28966157428
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8511",
                            lon: "-122.2910",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 5192.53821385625
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8521",
                            lon: "-122.2914",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 5306.00089779036
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8522",
                            lon: "-122.2913",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 5317.95561300719
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 11,
                            id: 1300693,
                            stop_id: "bbowl_i",
                            stop_name: "Berkeley Bowl West",
                            lat: "37.8525",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8524",
                            lon: "-122.2897",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 5472.41675594397
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8520",
                            lon: "-122.2895",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 5530.07482288556
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8518",
                            lon: "-122.2896",
                            shape_pt_sequence: 48,
                            shape_dist_traveled: 5544.7656195813
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8515",
                            lon: "-122.2911",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 5687.41172635356
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8514",
                            lon: "-122.2912",
                            shape_pt_sequence: 50,
                            shape_dist_traveled: 5703.48325772716
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8502",
                            lon: "-122.2909",
                            shape_pt_sequence: 51,
                            shape_dist_traveled: 5841.49409657093
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8500",
                            lon: "-122.2909",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5860.96128133208
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8498",
                            lon: "-122.2920",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5956.06456050414
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8496",
                            lon: "-122.2923",
                            shape_pt_sequence: 54,
                            shape_dist_traveled: 5992.66087816967
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8494",
                            lon: "-122.2923",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 6013.86079843392
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8479",
                            lon: "-122.2919",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 6186.76239565869
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8478",
                            lon: "-122.2916",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 6215.01105643626
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8483",
                            lon: "-122.2888",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 6462.97431497151
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8483",
                            lon: "-122.2886",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6480.57024504992
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 12,
                            id: 1300697,
                            stop_id: "vall66_i",
                            stop_name: "Vallejo at 66th",
                            lat: "37.8475",
                            lon: "-122.2884"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8475",
                            lon: "-122.2884",
                            shape_pt_sequence: 61,
                            shape_dist_traveled: 6573.27459938229
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8474",
                            lon: "-122.2884",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6588.66005816833
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8468",
                            lon: "-122.2912",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6842.00713508949
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8467",
                            lon: "-122.2915",
                            shape_pt_sequence: 64,
                            shape_dist_traveled: 6867.50598544329
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 13,
                            id: 1300660,
                            stop_id: "65ho_i",
                            stop_name: "65th at Hollis",
                            lat: "37.8465",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8449",
                            lon: "-122.2909",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 7075.55033019117
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 14,
                            id: 1300684,
                            stop_id: "ho64_i",
                            stop_name: "Hollis at 63rd",
                            lat: "37.8437",
                            lon: "-122.2905"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8431",
                            lon: "-122.2903",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 7276.50978455918
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 15,
                            id: 1300682,
                            stop_id: "ho59_i",
                            stop_name: "Hollis at 59th (Emery Station)",
                            lat: "37.8410",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8383",
                            lon: "-122.2888",
                            shape_pt_sequence: 70,
                            shape_dist_traveled: 7827.11143936746
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8375",
                            lon: "-122.2883",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7932.85626586534
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 16,
                            id: 1300701,
                            stop_id: "ho53_i",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8357",
                            lon: "-122.2875"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8349",
                            lon: "-122.2872",
                            shape_pt_sequence: 73,
                            shape_dist_traveled: 8232.62418339458
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 17,
                            id: 1300672,
                            stop_id: "ho45_i",
                            stop_name: "Hollis at 45th",
                            lat: "37.8331",
                            lon: "-122.2865"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2858",
                            shape_pt_sequence: 75,
                            shape_dist_traveled: 8660.74475940419
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8311",
                            lon: "-122.2855",
                            shape_pt_sequence: 76,
                            shape_dist_traveled: 8687.3766228254
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 18,
                            id: 1300696,
                            stop_id: "pix_i",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8317",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8319",
                            lon: "-122.2816",
                            shape_pt_sequence: 78,
                            shape_dist_traveled: 9043.54607663172
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8319",
                            lon: "-122.2814",
                            shape_pt_sequence: 79,
                            shape_dist_traveled: 9064.37614043648
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 19,
                            id: 1300675,
                            stop_id: "em40_i",
                            stop_name: "Emery at 40th",
                            lat: "37.8309",
                            lon: "-122.2811"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8307",
                            lon: "-122.2809",
                            shape_pt_sequence: 81,
                            shape_dist_traveled: 9201.7829706601
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 82,
                            shape_dist_traveled: 9422.60252225989
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 83,
                            shape_dist_traveled: 9450.18893157204
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 84,
                            shape_dist_traveled: 9668.41735173278
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 85,
                            shape_dist_traveled: 9963.08995580818
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 86,
                            shape_dist_traveled: 10292.4441411196
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 20,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "sun",
                            stop_sequence: 21,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "sun",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 89,
                            shape_dist_traveled: 10470.4091900068
                        }
                    ],
                    [
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 330.639150091779
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 346.992923170735
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 541.35247873652
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 992.424723284937
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1024.94882490274
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1297.72743796975
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1317.10537784042
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1543.49377910955
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1683.51657093779
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1713.45943201622
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1809.4369482424
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1835.98610285487
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1955.52889360502
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1981.85688716198
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300700,
                            stop_id: "ihop_o",
                            stop_name: "IHOP",
                            lat: "37.8323",
                            lon: "-122.2807"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300695,
                            stop_id: "pawa_o",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8319",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2446.70462477123
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2464.84395265793
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300662,
                            stop_id: "ho45_o",
                            stop_name: "Hollis at 45th",
                            lat: "37.8332",
                            lon: "-122.2864"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300685,
                            stop_id: "ho53_o",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8362",
                            lon: "-122.2876"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3137.6438361722
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3290.01173805234
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3309.45876033304
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3354.26895345848
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300680,
                            stop_id: "stho_o",
                            stop_name: "Stanford at Horton (Emery Station)",
                            lat: "37.8376",
                            lon: "-122.2900"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3440.08735708244
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3467.55810869762
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300676,
                            stop_id: "es_o",
                            stop_name: "Amtrak Station",
                            lat: "37.8407",
                            lon: "-122.2913"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8409",
                            lon: "-122.2912",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3839.83403580134
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8412",
                            lon: "-122.2898",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3969.50523543673
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8413",
                            lon: "-122.2897",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3986.84720200116
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300689,
                            stop_id: "ho59_o",
                            stop_name: "Hollis at 59th",
                            lat: "37.8416",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300702,
                            stop_id: "ho64_o",
                            stop_name: "Hollis at 64th",
                            lat: "37.8450",
                            lon: "-122.2908"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 10,
                            id: 1300669,
                            stop_id: "ho65_o",
                            stop_name: "Hollis at 65th",
                            lat: "37.8468",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8493",
                            lon: "-122.2922",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4904.38464088082
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8497",
                            lon: "-122.2921",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4944.94224120347
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8499",
                            lon: "-122.2910",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 5045.99019313928
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8502",
                            lon: "-122.2907",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 5082.28966157428
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8511",
                            lon: "-122.2910",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 5192.53821385625
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8521",
                            lon: "-122.2914",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 5306.00089779036
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8522",
                            lon: "-122.2913",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 5317.95561300719
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 11,
                            id: 1300693,
                            stop_id: "bbowl_i",
                            stop_name: "Berkeley Bowl West",
                            lat: "37.8525",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8524",
                            lon: "-122.2897",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 5472.41675594397
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8520",
                            lon: "-122.2895",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 5530.07482288556
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8518",
                            lon: "-122.2896",
                            shape_pt_sequence: 48,
                            shape_dist_traveled: 5544.7656195813
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8515",
                            lon: "-122.2911",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 5687.41172635356
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8514",
                            lon: "-122.2912",
                            shape_pt_sequence: 50,
                            shape_dist_traveled: 5703.48325772716
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8502",
                            lon: "-122.2909",
                            shape_pt_sequence: 51,
                            shape_dist_traveled: 5841.49409657093
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8500",
                            lon: "-122.2909",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5860.96128133208
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8498",
                            lon: "-122.2920",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5956.06456050414
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8496",
                            lon: "-122.2923",
                            shape_pt_sequence: 54,
                            shape_dist_traveled: 5992.66087816967
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8494",
                            lon: "-122.2923",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 6013.86079843392
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8479",
                            lon: "-122.2919",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 6186.76239565869
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8478",
                            lon: "-122.2916",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 6215.01105643626
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8483",
                            lon: "-122.2888",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 6462.97431497151
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8483",
                            lon: "-122.2886",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6480.57024504992
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 12,
                            id: 1300697,
                            stop_id: "vall66_i",
                            stop_name: "Vallejo at 66th",
                            lat: "37.8475",
                            lon: "-122.2884"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8475",
                            lon: "-122.2884",
                            shape_pt_sequence: 61,
                            shape_dist_traveled: 6573.27459938229
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8474",
                            lon: "-122.2884",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6588.66005816833
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8468",
                            lon: "-122.2912",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6842.00713508949
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8467",
                            lon: "-122.2915",
                            shape_pt_sequence: 64,
                            shape_dist_traveled: 6867.50598544329
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 13,
                            id: 1300660,
                            stop_id: "65ho_i",
                            stop_name: "65th at Hollis",
                            lat: "37.8465",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8449",
                            lon: "-122.2909",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 7075.55033019117
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 14,
                            id: 1300684,
                            stop_id: "ho64_i",
                            stop_name: "Hollis at 63rd",
                            lat: "37.8437",
                            lon: "-122.2905"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8431",
                            lon: "-122.2903",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 7276.50978455918
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 15,
                            id: 1300682,
                            stop_id: "ho59_i",
                            stop_name: "Hollis at 59th (Emery Station)",
                            lat: "37.8410",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2888",
                            shape_pt_sequence: 70,
                            shape_dist_traveled: 7827.11143936746
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2883",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7932.85626586534
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 16,
                            id: 1300701,
                            stop_id: "ho53_i",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8357",
                            lon: "-122.2875"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8349",
                            lon: "-122.2872",
                            shape_pt_sequence: 73,
                            shape_dist_traveled: 8232.62418339458
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 17,
                            id: 1300672,
                            stop_id: "ho45_i",
                            stop_name: "Hollis at 45th",
                            lat: "37.8331",
                            lon: "-122.2865"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2858",
                            shape_pt_sequence: 75,
                            shape_dist_traveled: 8660.74475940419
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2855",
                            shape_pt_sequence: 76,
                            shape_dist_traveled: 8687.3766228254
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 18,
                            id: 1300696,
                            stop_id: "pix_i",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8317",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2816",
                            shape_pt_sequence: 78,
                            shape_dist_traveled: 9043.54607663172
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2814",
                            shape_pt_sequence: 79,
                            shape_dist_traveled: 9064.37614043648
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 19,
                            id: 1300675,
                            stop_id: "em40_i",
                            stop_name: "Emery at 40th",
                            lat: "37.8309",
                            lon: "-122.2811"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2809",
                            shape_pt_sequence: 81,
                            shape_dist_traveled: 9201.7829706601
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 82,
                            shape_dist_traveled: 9422.60252225989
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 83,
                            shape_dist_traveled: 9450.18893157204
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 84,
                            shape_dist_traveled: 9668.41735173278
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 85,
                            shape_dist_traveled: 9963.08995580818
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 86,
                            shape_dist_traveled: 10292.4441411196
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 20,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "Loop",
                            service_id: "wkd",
                            stop_sequence: 21,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "Loop",
                            shape_id: 179210,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 89,
                            shape_dist_traveled: 10470.4091900068
                        }
                    ]
                ]
            },
            {
                route: "holldcut",
                data: []
            },
            {
                route: "holldcut",
                data: []
            },
            {
                route: "Hollis",
                data: []
            },
            {
                route: "Hollis",
                data: [
                    [
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300693,
                            stop_id: "bbowl_i",
                            stop_name: "Berkeley Bowl West",
                            lat: "37.8525",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8525",
                            lon: "-122.2896",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 4.37256065707487
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8520",
                            lon: "-122.2895",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 62.0902972788909
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8518",
                            lon: "-122.2896",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 76.7810939746311
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8515",
                            lon: "-122.2911",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 219.427200746886
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8514",
                            lon: "-122.2912",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 235.498732120492
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8502",
                            lon: "-122.2909",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 373.509570964256
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8500",
                            lon: "-122.2909",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 392.976755725412
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8498",
                            lon: "-122.2920",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 488.080034897472
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8496",
                            lon: "-122.2923",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 524.676352562997
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8494",
                            lon: "-122.2923",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 545.876272827251
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8479",
                            lon: "-122.2919",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 718.77787005202
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8478",
                            lon: "-122.2916",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 747.02653082959
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8483",
                            lon: "-122.2888",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 994.98978936484
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8483",
                            lon: "-122.2886",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1012.58571944325
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300697,
                            stop_id: "vall66_i",
                            stop_name: "Vallejo at 66th",
                            lat: "37.8475",
                            lon: "-122.2884"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8475",
                            lon: "-122.2884",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1105.29007377562
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8474",
                            lon: "-122.2884",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1120.67553256166
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8468",
                            lon: "-122.2912",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1374.02260948282
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8467",
                            lon: "-122.2915",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 1399.52145983662
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300660,
                            stop_id: "65ho_i",
                            stop_name: "65th at Hollis",
                            lat: "37.8465",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8449",
                            lon: "-122.2909",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 1607.5658045845
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300684,
                            stop_id: "ho64_i",
                            stop_name: "Hollis at 63rd",
                            lat: "37.8437",
                            lon: "-122.2905"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8431",
                            lon: "-122.2903",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 1808.52525895251
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300682,
                            stop_id: "ho59_i",
                            stop_name: "Hollis at 59th (Emery Station)",
                            lat: "37.8410",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2888",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2359.12691376079
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2883",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2464.87174025867
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300701,
                            stop_id: "ho53_i",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8357",
                            lon: "-122.2875"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8349",
                            lon: "-122.2872",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2764.63965778791
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300672,
                            stop_id: "ho45_i",
                            stop_name: "Hollis at 45th",
                            lat: "37.8331",
                            lon: "-122.2865"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2858",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3192.76023379752
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2855",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3219.39209721873
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300696,
                            stop_id: "pix_i",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8317",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2816",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3575.56155102505
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2814",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 3596.39161482981
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300675,
                            stop_id: "em40_i",
                            stop_name: "Emery at 40th",
                            lat: "37.8309",
                            lon: "-122.2811"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2809",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3733.79844505343
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 3954.61799665322
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 3982.20440596537
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4200.43282612611
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4495.10543020151
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4824.45961551294
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 10,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 11,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 45,
                            shape_dist_traveled: 5002.42466440014
                        }
                    ]
                ]
            },
            {
                route: "Hollis",
                data: [
                    [
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 11,
                            id: 1300693,
                            stop_id: "bbowl_i",
                            stop_name: "Berkeley Bowl West",
                            lat: "37.8525",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8525",
                            lon: "-122.2897",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 4.39308811479845
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8524",
                            lon: "-122.2897",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 5.62865263187989
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2663",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 3292.90915862907
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 330.639150091779
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 3315.01816855705
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 346.992923170735
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2663",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 3401.33264825925
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 541.35247873652
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 3583.08954025913
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 992.424723284937
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 3599.44331333808
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1024.94882490274
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 3793.80286890387
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1297.72743796975
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 4244.87511345228
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1317.10537784042
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 4277.39921507009
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1543.49377910955
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 4550.17782813709
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1683.51657093779
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 4569.55576800776
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1713.45943201622
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 4795.9441692769
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1809.4369482424
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 4935.96696110513
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1835.98610285487
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 4965.90982218357
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1955.52889360502
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 5061.88733840975
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1981.85688716198
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 5088.43649302221
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300700,
                            stop_id: "ihop_o",
                            stop_name: "IHOP",
                            lat: "37.8323",
                            lon: "-122.2807"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 5207.97928377237
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300695,
                            stop_id: "pawa_o",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8319",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 5234.30727732932
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2446.70462477123
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2807",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 5252.7356259
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2464.84395265793
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2827",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 5432.19253149338
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300662,
                            stop_id: "ho45_o",
                            stop_name: "Hollis at 45th",
                            lat: "37.8332",
                            lon: "-122.2864"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 5699.15501493858
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300685,
                            stop_id: "ho53_o",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8362",
                            lon: "-122.2876"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 5717.29434282528
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3137.6438361722
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8332",
                            lon: "-122.2864",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 5934.22813427502
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3290.01173805234
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8362",
                            lon: "-122.2876",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 6281.71989646067
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3309.45876033304
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 6390.09422633954
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3354.26895345848
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 6542.46212821968
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300680,
                            stop_id: "stho_o",
                            stop_name: "Stanford at Horton (Emery Station)",
                            lat: "37.8376",
                            lon: "-122.2900"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 6561.90915050038
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3440.08735708244
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 6606.71934362582
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3467.55810869762
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 6688.31762880831
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300676,
                            stop_id: "es_o",
                            stop_name: "Amtrak Station",
                            lat: "37.8407",
                            lon: "-122.2913"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 6692.53774724978
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8409",
                            lon: "-122.2912",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3839.83403580134
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 6720.00849886496
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8412",
                            lon: "-122.2898",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3969.50523543673
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8407",
                            lon: "-122.2913",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 7070.76549110582
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8413",
                            lon: "-122.2897",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3986.84720200116
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8409",
                            lon: "-122.2912",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 7092.28442596869
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300689,
                            stop_id: "ho59_o",
                            stop_name: "Hollis at 59th",
                            lat: "37.8416",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8412",
                            lon: "-122.2898",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 7221.95562560408
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300702,
                            stop_id: "ho64_o",
                            stop_name: "Hollis at 64th",
                            lat: "37.8450",
                            lon: "-122.2908"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8413",
                            lon: "-122.2897",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 7239.2975921685
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 10,
                            id: 1300669,
                            stop_id: "ho65_o",
                            stop_name: "Hollis at 65th",
                            lat: "37.8468",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8416",
                            lon: "-122.2897",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 7267.73277137077
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8450",
                            lon: "-122.2908",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 7661.85105163211
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179205,
                            service_id: "wkd",
                            lat: "37.8468",
                            lon: "-122.2914",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 7872.047537154
                        }
                    ]
                ]
            },
            {
                route: "powell",
                data: []
            },
            {
                route: "powell",
                data: [
                    [
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8371",
                            lon: "-122.3025",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8371",
                            lon: "-122.3046",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 178.721614707195
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 1,
                            id: 1300691,
                            stop_id: "fps_i",
                            stop_name: "Fire and Police Stations",
                            lat: "37.8372",
                            lon: "-122.3046"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8372",
                            lon: "-122.3057",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 277.522058528334
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8371",
                            lon: "-122.3061",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 310.966572409235
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8370",
                            lon: "-122.3061",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 322.120704008739
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8370",
                            lon: "-122.3052",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 394.439255510518
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8370",
                            lon: "-122.3018",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 699.165244579259
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8370",
                            lon: "-122.3008",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 784.529230731597
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8371",
                            lon: "-122.3004",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 817.689565025443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8375",
                            lon: "-122.2985",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 989.539226968423
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8382",
                            lon: "-122.2953",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1281.68433721772
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8382",
                            lon: "-122.2948",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1330.44165829309
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8381",
                            lon: "-122.2946",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1351.69511532923
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 2,
                            id: 1300687,
                            stop_id: "chpp_i",
                            stop_name: "Christie at Powell St. Plaza",
                            lat: "37.8373",
                            lon: "-122.2944"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8372",
                            lon: "-122.2943",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1456.28357624421
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8370",
                            lon: "-122.2940",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1488.210157286
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8370",
                            lon: "-122.2932",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1564.61924248714
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8368",
                            lon: "-122.2930",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1590.92034997301
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8353",
                            lon: "-122.2929",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1761.37489793292
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8348",
                            lon: "-122.2930",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 1809.58234403296
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 3,
                            id: 1300699,
                            stop_id: "ctbmt_i",
                            stop_name: "Courtyard by Marriott",
                            lat: "37.8340",
                            lon: "-122.2934"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8336",
                            lon: "-122.2935",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 1960.95175225187
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8332",
                            lon: "-122.2935",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 2004.397793443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8321",
                            lon: "-122.2931",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2132.0300486184
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8315",
                            lon: "-122.2930",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2198.10957730742
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8295",
                            lon: "-122.2929",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2412.97471025409
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8292",
                            lon: "-122.2928",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2447.70400805019
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8287",
                            lon: "-122.2924",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2512.53337835819
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8285",
                            lon: "-122.2918",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2574.21216311254
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8286",
                            lon: "-122.2913",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 2615.55087339616
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8292",
                            lon: "-122.2882",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 2894.69880643288
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 4,
                            id: 1300670,
                            stop_id: "40hr_i",
                            stop_name: "40th at Horton",
                            lat: "37.8294",
                            lon: "-122.2872"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 5,
                            id: 1300704,
                            stop_id: "40ho_i",
                            stop_name: "40th at Hollis",
                            lat: "37.8299",
                            lon: "-122.2849"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 6,
                            id: 1300698,
                            stop_id: "40em_i",
                            stop_name: "40th at Emery",
                            lat: "37.8306",
                            lon: "-122.2813"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 7,
                            id: 1300688,
                            stop_id: "40sp_i",
                            stop_name: "40th at San Pablo",
                            lat: "37.8308",
                            lon: "-122.2802"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3779.41964733372
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3807.00605664587
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4025.23447680661
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4319.90708088201
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4649.26126619344
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 8,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sat",
                            stop_sequence: 9,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sat",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4813.87638026413
                        }
                    ],
                    [
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8371",
                            lon: "-122.3025",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8371",
                            lon: "-122.3046",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 178.721614707195
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 1,
                            id: 1300691,
                            stop_id: "fps_i",
                            stop_name: "Fire and Police Stations",
                            lat: "37.8372",
                            lon: "-122.3046"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8372",
                            lon: "-122.3057",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 277.522058528334
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8371",
                            lon: "-122.3061",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 310.966572409235
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8370",
                            lon: "-122.3061",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 322.120704008739
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8370",
                            lon: "-122.3052",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 394.439255510518
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8370",
                            lon: "-122.3018",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 699.165244579259
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8370",
                            lon: "-122.3008",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 784.529230731597
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8371",
                            lon: "-122.3004",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 817.689565025443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8375",
                            lon: "-122.2985",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 989.539226968423
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8382",
                            lon: "-122.2953",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1281.68433721772
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8382",
                            lon: "-122.2948",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1330.44165829309
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8381",
                            lon: "-122.2946",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1351.69511532923
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 2,
                            id: 1300687,
                            stop_id: "chpp_i",
                            stop_name: "Christie at Powell St. Plaza",
                            lat: "37.8373",
                            lon: "-122.2944"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8372",
                            lon: "-122.2943",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1456.28357624421
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8370",
                            lon: "-122.2940",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1488.210157286
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8370",
                            lon: "-122.2932",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1564.61924248714
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8368",
                            lon: "-122.2930",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1590.92034997301
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8353",
                            lon: "-122.2929",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1761.37489793292
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8348",
                            lon: "-122.2930",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 1809.58234403296
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 3,
                            id: 1300699,
                            stop_id: "ctbmt_i",
                            stop_name: "Courtyard by Marriott",
                            lat: "37.8340",
                            lon: "-122.2934"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8336",
                            lon: "-122.2935",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 1960.95175225187
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8332",
                            lon: "-122.2935",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 2004.397793443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8321",
                            lon: "-122.2931",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2132.0300486184
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8315",
                            lon: "-122.2930",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2198.10957730742
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8295",
                            lon: "-122.2929",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2412.97471025409
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8292",
                            lon: "-122.2928",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2447.70400805019
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8287",
                            lon: "-122.2924",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2512.53337835819
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8285",
                            lon: "-122.2918",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2574.21216311254
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8286",
                            lon: "-122.2913",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 2615.55087339616
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8292",
                            lon: "-122.2882",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 2894.69880643288
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 4,
                            id: 1300670,
                            stop_id: "40hr_i",
                            stop_name: "40th at Horton",
                            lat: "37.8294",
                            lon: "-122.2872"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 5,
                            id: 1300704,
                            stop_id: "40ho_i",
                            stop_name: "40th at Hollis",
                            lat: "37.8299",
                            lon: "-122.2849"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 6,
                            id: 1300698,
                            stop_id: "40em_i",
                            stop_name: "40th at Emery",
                            lat: "37.8306",
                            lon: "-122.2813"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 7,
                            id: 1300688,
                            stop_id: "40sp_i",
                            stop_name: "40th at San Pablo",
                            lat: "37.8308",
                            lon: "-122.2802"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3779.41964733372
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3807.00605664587
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4025.23447680661
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4319.90708088201
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4649.26126619344
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 8,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "sun",
                            stop_sequence: 9,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "sun",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4813.87638026413
                        }
                    ],
                    [
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3025",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3046",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 178.721614707195
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300691,
                            stop_id: "fps_i",
                            stop_name: "Fire and Police Stations",
                            lat: "37.8372",
                            lon: "-122.3046"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.3057",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 277.522058528334
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3061",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 310.966572409235
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3061",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 322.120704008739
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3052",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 394.439255510518
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3018",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 699.165244579259
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3008",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 784.529230731597
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3004",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 817.689565025443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2985",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 989.539226968423
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2953",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1281.68433721772
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2948",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1330.44165829309
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8381",
                            lon: "-122.2946",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1351.69511532923
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300687,
                            stop_id: "chpp_i",
                            stop_name: "Christie at Powell St. Plaza",
                            lat: "37.8373",
                            lon: "-122.2944"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.2943",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1456.28357624421
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.2940",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1488.210157286
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.2932",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1564.61924248714
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8368",
                            lon: "-122.2930",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1590.92034997301
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8353",
                            lon: "-122.2929",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1761.37489793292
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8348",
                            lon: "-122.2930",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 1809.58234403296
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300699,
                            stop_id: "ctbmt_i",
                            stop_name: "Courtyard by Marriott",
                            lat: "37.8340",
                            lon: "-122.2934"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8336",
                            lon: "-122.2935",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 1960.95175225187
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8332",
                            lon: "-122.2935",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 2004.397793443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8321",
                            lon: "-122.2931",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2132.0300486184
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8315",
                            lon: "-122.2930",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2198.10957730742
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8295",
                            lon: "-122.2929",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2412.97471025409
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8292",
                            lon: "-122.2928",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2447.70400805019
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8287",
                            lon: "-122.2924",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2512.53337835819
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2918",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2574.21216311254
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8286",
                            lon: "-122.2913",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 2615.55087339616
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8292",
                            lon: "-122.2882",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 2894.69880643288
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300670,
                            stop_id: "40hr_i",
                            stop_name: "40th at Horton",
                            lat: "37.8294",
                            lon: "-122.2872"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300704,
                            stop_id: "40ho_i",
                            stop_name: "40th at Hollis",
                            lat: "37.8299",
                            lon: "-122.2849"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300698,
                            stop_id: "40em_i",
                            stop_name: "40th at Emery",
                            lat: "37.8306",
                            lon: "-122.2813"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300688,
                            stop_id: "40sp_i",
                            stop_name: "40th at San Pablo",
                            lat: "37.8308",
                            lon: "-122.2802"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3779.41964733372
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3807.00605664587
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4025.23447680661
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4319.90708088201
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4649.26126619344
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179209,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4813.87638026413
                        }
                    ]
                ]
            },
            {
                route: "powell",
                data: [
                    [
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 75.8890909867075
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 343.960462688778
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 360.314235767734
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 554.673791333519
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 1005.74603588194
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1038.27013749974
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1311.04875056675
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1330.42669043742
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1556.81509170655
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1696.83788353479
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1726.78074461322
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 2,
                            id: 1300683,
                            stop_id: "40sp_o",
                            stop_name: "40th at San Pablo",
                            lat: "37.8311",
                            lon: "-122.2796"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 3,
                            id: 1300681,
                            stop_id: "40em_o",
                            stop_name: "40th at Emery",
                            lat: "37.8308",
                            lon: "-122.2812"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8308",
                            lon: "-122.2812",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1973.94568855274
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 4,
                            id: 1300679,
                            stop_id: "40ho_o",
                            stop_name: "40th at Hollis",
                            lat: "37.8300",
                            lon: "-122.2850"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 5,
                            id: 1300665,
                            stop_id: "40hr_o",
                            stop_name: "40th at Horton",
                            lat: "37.8294",
                            lon: "-122.2879"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8293",
                            lon: "-122.2887",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2653.68279429223
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8287",
                            lon: "-122.2907",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2843.62100985966
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8286",
                            lon: "-122.2913",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2895.15508873707
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8287",
                            lon: "-122.2921",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2963.69007921248
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8291",
                            lon: "-122.2926",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 3020.31626068864
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8296",
                            lon: "-122.2928",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3087.89886825362
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8315",
                            lon: "-122.2929",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3294.90810914363
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8322",
                            lon: "-122.2930",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3367.71652895943
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8330",
                            lon: "-122.2933",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3465.25664132114
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 6,
                            id: 1300692,
                            stop_id: "embay_o",
                            stop_name: "Bay Street",
                            lat: "37.8333",
                            lon: "-122.2933"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8337",
                            lon: "-122.2934",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3538.77664541328
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8341",
                            lon: "-122.2933",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3588.48441918634
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8348",
                            lon: "-122.2929",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3671.4924388693
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8354",
                            lon: "-122.2928",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3739.59943947006
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 7,
                            id: 1300678,
                            stop_id: "shch_o",
                            stop_name: "Shellmound at Christie",
                            lat: "37.8374",
                            lon: "-122.2930"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8387",
                            lon: "-122.2931",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 4105.41038007341
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 8,
                            id: 1300663,
                            stop_id: "wfs_o",
                            stop_name: "Hyatt Summerfield Suites",
                            lat: "37.8388",
                            lon: "-122.2932"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8397",
                            lon: "-122.2934",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 4224.0160493145
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8400",
                            lon: "-122.2934",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 4254.05156160053
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8408",
                            lon: "-122.2932",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4351.78891982809
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8413",
                            lon: "-122.2929",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4407.35626424199
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8416",
                            lon: "-122.2929",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4447.39612462122
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8419",
                            lon: "-122.2930",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4474.43651542448
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8442",
                            lon: "-122.2937",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4736.80467986201
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8451",
                            lon: "-122.2942",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4848.47549895272
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8462",
                            lon: "-122.2945",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4977.22931368617
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 9,
                            id: 1300694,
                            stop_id: "65sh_o",
                            stop_name: "65th at Shellmound",
                            lat: "37.8462",
                            lon: "-122.2949"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8462",
                            lon: "-122.2962",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 5130.1617685843
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8460",
                            lon: "-122.2965",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 5154.28893406978
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 10,
                            id: 1300677,
                            stop_id: "ch65_o",
                            stop_name: "Christie at 65th",
                            lat: "37.8456",
                            lon: "-122.2964"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8443",
                            lon: "-122.2960",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 5346.74915358019
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 11,
                            id: 1300703,
                            stop_id: "ch64_o",
                            stop_name: "Christie at 64th",
                            lat: "37.8436",
                            lon: "-122.2958"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 12,
                            id: 1300666,
                            stop_id: "ebpm_o",
                            stop_name: "Christie at Public Market",
                            lat: "37.8416",
                            lon: "-122.2951"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8403",
                            lon: "-122.2947",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5806.37585981936
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8401",
                            lon: "-122.2947",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5834.23005424005
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 13,
                            id: 1300686,
                            stop_id: "chsw_o",
                            stop_name: "Christie at Shellmound",
                            lat: "37.8398",
                            lon: "-122.2948"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8394",
                            lon: "-122.2950",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 5907.74538990391
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8392",
                            lon: "-122.2950",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 5929.98440664827
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8386",
                            lon: "-122.2948",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 6004.1620357068
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8385",
                            lon: "-122.2948",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 6017.15770717537
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8380",
                            lon: "-122.2970",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6212.77328127792
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8378",
                            lon: "-122.2975",
                            shape_pt_sequence: 60,
                            shape_dist_traveled: 6265.14978739172
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 14,
                            id: 1300674,
                            stop_id: "pohi_o",
                            stop_name: "Powell at Hilton Garden Inn",
                            lat: "37.8377",
                            lon: "-122.2984"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8374",
                            lon: "-122.2996",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6452.56866028787
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8376",
                            lon: "-122.2999",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6484.16996627494
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 15,
                            id: 1300673,
                            stop_id: "wgt_o",
                            stop_name: "The Towers",
                            lat: "37.8381",
                            lon: "-122.3002"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8390",
                            lon: "-122.3006",
                            shape_pt_sequence: 65,
                            shape_dist_traveled: 6653.55697090503
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8389",
                            lon: "-122.3008",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 6676.31927592042
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8374",
                            lon: "-122.3001",
                            shape_pt_sequence: 67,
                            shape_dist_traveled: 6845.70370999327
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8373",
                            lon: "-122.3002",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 6860.78356619977
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8372",
                            lon: "-122.3008",
                            shape_pt_sequence: 69,
                            shape_dist_traveled: 6920.2515577909
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sat",
                            stop_sequence: 16,
                            id: 1300664,
                            stop_id: "wgc_o",
                            stop_name: "Watergate Condos",
                            lat: "37.8371",
                            lon: "-122.3025"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sat",
                            lat: "37.8371",
                            lon: "-122.3025",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7068.72906666922
                        }
                    ],
                    [
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 75.8890909867075
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 343.960462688778
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 360.314235767734
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 554.673791333519
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 1005.74603588194
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1038.27013749974
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1311.04875056675
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1330.42669043742
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1556.81509170655
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1696.83788353479
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1726.78074461322
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 2,
                            id: 1300683,
                            stop_id: "40sp_o",
                            stop_name: "40th at San Pablo",
                            lat: "37.8311",
                            lon: "-122.2796"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 3,
                            id: 1300681,
                            stop_id: "40em_o",
                            stop_name: "40th at Emery",
                            lat: "37.8308",
                            lon: "-122.2812"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8308",
                            lon: "-122.2812",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1973.94568855274
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 4,
                            id: 1300679,
                            stop_id: "40ho_o",
                            stop_name: "40th at Hollis",
                            lat: "37.8300",
                            lon: "-122.2850"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 5,
                            id: 1300665,
                            stop_id: "40hr_o",
                            stop_name: "40th at Horton",
                            lat: "37.8294",
                            lon: "-122.2879"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8293",
                            lon: "-122.2887",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2653.68279429223
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8287",
                            lon: "-122.2907",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2843.62100985966
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8286",
                            lon: "-122.2913",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2895.15508873707
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8287",
                            lon: "-122.2921",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2963.69007921248
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8291",
                            lon: "-122.2926",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 3020.31626068864
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8296",
                            lon: "-122.2928",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3087.89886825362
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8315",
                            lon: "-122.2929",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3294.90810914363
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8322",
                            lon: "-122.2930",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3367.71652895943
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8330",
                            lon: "-122.2933",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3465.25664132114
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 6,
                            id: 1300692,
                            stop_id: "embay_o",
                            stop_name: "Bay Street",
                            lat: "37.8333",
                            lon: "-122.2933"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8337",
                            lon: "-122.2934",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3538.77664541328
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8341",
                            lon: "-122.2933",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3588.48441918634
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8348",
                            lon: "-122.2929",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3671.4924388693
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8354",
                            lon: "-122.2928",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3739.59943947006
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 7,
                            id: 1300678,
                            stop_id: "shch_o",
                            stop_name: "Shellmound at Christie",
                            lat: "37.8374",
                            lon: "-122.2930"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8387",
                            lon: "-122.2931",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 4105.41038007341
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 8,
                            id: 1300663,
                            stop_id: "wfs_o",
                            stop_name: "Hyatt Summerfield Suites",
                            lat: "37.8388",
                            lon: "-122.2932"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8397",
                            lon: "-122.2934",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 4224.0160493145
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8400",
                            lon: "-122.2934",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 4254.05156160053
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8408",
                            lon: "-122.2932",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4351.78891982809
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8413",
                            lon: "-122.2929",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4407.35626424199
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8416",
                            lon: "-122.2929",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4447.39612462122
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8419",
                            lon: "-122.2930",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4474.43651542448
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8442",
                            lon: "-122.2937",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4736.80467986201
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8451",
                            lon: "-122.2942",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4848.47549895272
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8462",
                            lon: "-122.2945",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4977.22931368617
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 9,
                            id: 1300694,
                            stop_id: "65sh_o",
                            stop_name: "65th at Shellmound",
                            lat: "37.8462",
                            lon: "-122.2949"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8462",
                            lon: "-122.2962",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 5130.1617685843
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8460",
                            lon: "-122.2965",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 5154.28893406978
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 10,
                            id: 1300677,
                            stop_id: "ch65_o",
                            stop_name: "Christie at 65th",
                            lat: "37.8456",
                            lon: "-122.2964"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8443",
                            lon: "-122.2960",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 5346.74915358019
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 11,
                            id: 1300703,
                            stop_id: "ch64_o",
                            stop_name: "Christie at 64th",
                            lat: "37.8436",
                            lon: "-122.2958"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 12,
                            id: 1300666,
                            stop_id: "ebpm_o",
                            stop_name: "Christie at Public Market",
                            lat: "37.8416",
                            lon: "-122.2951"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8403",
                            lon: "-122.2947",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5806.37585981936
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8401",
                            lon: "-122.2947",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5834.23005424005
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 13,
                            id: 1300686,
                            stop_id: "chsw_o",
                            stop_name: "Christie at Shellmound",
                            lat: "37.8398",
                            lon: "-122.2948"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8394",
                            lon: "-122.2950",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 5907.74538990391
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8392",
                            lon: "-122.2950",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 5929.98440664827
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8386",
                            lon: "-122.2948",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 6004.1620357068
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8385",
                            lon: "-122.2948",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 6017.15770717537
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8380",
                            lon: "-122.2970",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6212.77328127792
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8378",
                            lon: "-122.2975",
                            shape_pt_sequence: 60,
                            shape_dist_traveled: 6265.14978739172
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 14,
                            id: 1300674,
                            stop_id: "pohi_o",
                            stop_name: "Powell at Hilton Garden Inn",
                            lat: "37.8377",
                            lon: "-122.2984"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8374",
                            lon: "-122.2996",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6452.56866028787
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8376",
                            lon: "-122.2999",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6484.16996627494
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 15,
                            id: 1300673,
                            stop_id: "wgt_o",
                            stop_name: "The Towers",
                            lat: "37.8381",
                            lon: "-122.3002"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8390",
                            lon: "-122.3006",
                            shape_pt_sequence: 65,
                            shape_dist_traveled: 6653.55697090503
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8389",
                            lon: "-122.3008",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 6676.31927592042
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8374",
                            lon: "-122.3001",
                            shape_pt_sequence: 67,
                            shape_dist_traveled: 6845.70370999327
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8373",
                            lon: "-122.3002",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 6860.78356619977
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8372",
                            lon: "-122.3008",
                            shape_pt_sequence: 69,
                            shape_dist_traveled: 6920.2515577909
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "sun",
                            stop_sequence: 16,
                            id: 1300664,
                            stop_id: "wgc_o",
                            stop_name: "Watergate Condos",
                            lat: "37.8371",
                            lon: "-122.3025"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "sun",
                            lat: "37.8371",
                            lon: "-122.3025",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7068.72906666922
                        }
                    ],
                    [
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 75.8890909867075
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 343.960462688778
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 360.314235767734
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 554.673791333519
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 1005.74603588194
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1038.27013749974
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1311.04875056675
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1330.42669043742
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1556.81509170655
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1696.83788353479
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1726.78074461322
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300683,
                            stop_id: "40sp_o",
                            stop_name: "40th at San Pablo",
                            lat: "37.8311",
                            lon: "-122.2796"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300681,
                            stop_id: "40em_o",
                            stop_name: "40th at Emery",
                            lat: "37.8308",
                            lon: "-122.2812"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8308",
                            lon: "-122.2812",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1973.94568855274
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300679,
                            stop_id: "40ho_o",
                            stop_name: "40th at Hollis",
                            lat: "37.8300",
                            lon: "-122.2850"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300665,
                            stop_id: "40hr_o",
                            stop_name: "40th at Horton",
                            lat: "37.8294",
                            lon: "-122.2879"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2887",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2653.68279429223
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8287",
                            lon: "-122.2907",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2843.62100985966
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8286",
                            lon: "-122.2913",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2895.15508873707
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8287",
                            lon: "-122.2921",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2963.69007921248
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8291",
                            lon: "-122.2926",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 3020.31626068864
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8296",
                            lon: "-122.2928",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3087.89886825362
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8315",
                            lon: "-122.2929",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3294.90810914363
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8322",
                            lon: "-122.2930",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3367.71652895943
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8330",
                            lon: "-122.2933",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3465.25664132114
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300692,
                            stop_id: "embay_o",
                            stop_name: "Bay Street",
                            lat: "37.8333",
                            lon: "-122.2933"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8337",
                            lon: "-122.2934",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3538.77664541328
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8341",
                            lon: "-122.2933",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3588.48441918634
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8348",
                            lon: "-122.2929",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3671.4924388693
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8354",
                            lon: "-122.2928",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3739.59943947006
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300678,
                            stop_id: "shch_o",
                            stop_name: "Shellmound at Christie",
                            lat: "37.8374",
                            lon: "-122.2930"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8387",
                            lon: "-122.2931",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 4105.41038007341
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300663,
                            stop_id: "wfs_o",
                            stop_name: "Hyatt Summerfield Suites",
                            lat: "37.8388",
                            lon: "-122.2932"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8397",
                            lon: "-122.2934",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 4224.0160493145
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8400",
                            lon: "-122.2934",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 4254.05156160053
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8408",
                            lon: "-122.2932",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 4351.78891982809
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8413",
                            lon: "-122.2929",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4407.35626424199
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8416",
                            lon: "-122.2929",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4447.39612462122
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8419",
                            lon: "-122.2930",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4474.43651542448
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8442",
                            lon: "-122.2937",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4736.80467986201
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8451",
                            lon: "-122.2942",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4848.47549895272
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8462",
                            lon: "-122.2945",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4977.22931368617
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300694,
                            stop_id: "65sh_o",
                            stop_name: "65th at Shellmound",
                            lat: "37.8462",
                            lon: "-122.2949"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8462",
                            lon: "-122.2962",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 5130.1617685843
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8460",
                            lon: "-122.2965",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 5154.28893406978
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 10,
                            id: 1300677,
                            stop_id: "ch65_o",
                            stop_name: "Christie at 65th",
                            lat: "37.8456",
                            lon: "-122.2964"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8443",
                            lon: "-122.2960",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 5346.74915358019
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 11,
                            id: 1300703,
                            stop_id: "ch64_o",
                            stop_name: "Christie at 64th",
                            lat: "37.8436",
                            lon: "-122.2958"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 12,
                            id: 1300666,
                            stop_id: "ebpm_o",
                            stop_name: "Christie at Public Market",
                            lat: "37.8416",
                            lon: "-122.2951"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8403",
                            lon: "-122.2947",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5806.37585981936
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8401",
                            lon: "-122.2947",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5834.23005424005
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 13,
                            id: 1300686,
                            stop_id: "chsw_o",
                            stop_name: "Christie at Shellmound",
                            lat: "37.8398",
                            lon: "-122.2948"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8394",
                            lon: "-122.2950",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 5907.74538990391
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8392",
                            lon: "-122.2950",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 5929.98440664827
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8386",
                            lon: "-122.2948",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 6004.1620357068
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8385",
                            lon: "-122.2948",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 6017.15770717537
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8380",
                            lon: "-122.2970",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6212.77328127792
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8378",
                            lon: "-122.2975",
                            shape_pt_sequence: 60,
                            shape_dist_traveled: 6265.14978739172
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 14,
                            id: 1300674,
                            stop_id: "pohi_o",
                            stop_name: "Powell at Hilton Garden Inn",
                            lat: "37.8377",
                            lon: "-122.2984"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2996",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6452.56866028787
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2999",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6484.16996627494
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 15,
                            id: 1300673,
                            stop_id: "wgt_o",
                            stop_name: "The Towers",
                            lat: "37.8381",
                            lon: "-122.3002"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8390",
                            lon: "-122.3006",
                            shape_pt_sequence: 65,
                            shape_dist_traveled: 6653.55697090503
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8389",
                            lon: "-122.3008",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 6676.31927592042
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.3001",
                            shape_pt_sequence: 67,
                            shape_dist_traveled: 6845.70370999327
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8373",
                            lon: "-122.3002",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 6860.78356619977
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.3008",
                            shape_pt_sequence: 69,
                            shape_dist_traveled: 6920.2515577909
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 16,
                            id: 1300664,
                            stop_id: "wgc_o",
                            stop_name: "Watergate Condos",
                            lat: "37.8371",
                            lon: "-122.3025"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179203,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3025",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7068.72906666922
                        }
                    ]
                ]
            },
            {
                route: "test",
                data: []
            },
            {
                route: "test",
                data: [
                    [
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300693,
                            stop_id: "bbowl_i",
                            stop_name: "Berkeley Bowl West",
                            lat: "37.8525",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8411",
                            lon: "-122.2897",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8525",
                            lon: "-122.2896",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 4.37256065707487
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300682,
                            stop_id: "ho59_i",
                            stop_name: "Hollis at 59th (Emery Station)",
                            lat: "37.8410",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8520",
                            lon: "-122.2895",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 62.0902972788909
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2888",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 322.298423720837
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8518",
                            lon: "-122.2896",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 76.7810939746311
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2883",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 428.043250218712
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8515",
                            lon: "-122.2911",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 219.427200746886
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300701,
                            stop_id: "ho53_i",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8357",
                            lon: "-122.2875"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8514",
                            lon: "-122.2912",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 235.498732120492
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8349",
                            lon: "-122.2872",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 727.811167747961
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8502",
                            lon: "-122.2909",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 373.509570964256
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300672,
                            stop_id: "ho45_i",
                            stop_name: "Hollis at 45th",
                            lat: "37.8331",
                            lon: "-122.2865"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8500",
                            lon: "-122.2909",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 392.976755725412
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2858",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1155.93174375756
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8498",
                            lon: "-122.2920",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 488.080034897472
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2855",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1182.56360717878
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8496",
                            lon: "-122.2923",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 524.676352562997
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300696,
                            stop_id: "pix_i",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8317",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8494",
                            lon: "-122.2923",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 545.876272827251
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2816",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1538.7330609851
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8479",
                            lon: "-122.2919",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 718.77787005202
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2814",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1559.56312478986
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8478",
                            lon: "-122.2916",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 747.02653082959
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300675,
                            stop_id: "em40_i",
                            stop_name: "Emery at 40th",
                            lat: "37.8309",
                            lon: "-122.2811"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8483",
                            lon: "-122.2888",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 994.98978936484
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2809",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1696.96995501348
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8483",
                            lon: "-122.2886",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1012.58571944325
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1917.78950661326
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300697,
                            stop_id: "vall66_i",
                            stop_name: "Vallejo at 66th",
                            lat: "37.8475",
                            lon: "-122.2884"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1945.37591592542
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8475",
                            lon: "-122.2884",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1105.29007377562
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 2163.60433608615
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8474",
                            lon: "-122.2884",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1120.67553256166
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 2458.27694016155
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8468",
                            lon: "-122.2912",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1374.02260948282
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2787.63112547298
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8467",
                            lon: "-122.2915",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 1399.52145983662
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 10,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300660,
                            stop_id: "65ho_i",
                            stop_name: "65th at Hollis",
                            lat: "37.8465",
                            lon: "-122.2914"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 11,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8449",
                            lon: "-122.2909",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 1607.5658045845
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179204,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2965.59617436019
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300684,
                            stop_id: "ho64_i",
                            stop_name: "Hollis at 63rd",
                            lat: "37.8437",
                            lon: "-122.2905"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8431",
                            lon: "-122.2903",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 1808.52525895251
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8410",
                            lon: "-122.2897",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2054.57106240164
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2888",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2359.12691376079
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2883",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2464.87174025867
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8357",
                            lon: "-122.2875",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2667.36403974257
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8349",
                            lon: "-122.2872",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2764.63965778791
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8331",
                            lon: "-122.2865",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 2970.83224892396
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2858",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3192.76023379752
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2855",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3219.39209721873
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8317",
                            lon: "-122.2827",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3478.99481985932
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2816",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3575.56155102505
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2814",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 3596.39161482981
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8309",
                            lon: "-122.2811",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3704.18452150681
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2809",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3733.79844505343
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2785",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 3954.61799665322
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2782",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 3982.20440596537
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8308",
                            lon: "-122.2757",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4200.43282612611
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2724",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4495.10543020151
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2688",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4824.45961551294
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8295",
                            lon: "-122.2675",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4936.07761543323
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4988.62011403646
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179201,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 45,
                            shape_dist_traveled: 5002.42466440014
                        }
                    ]
                ]
            },
            {
                route: "test",
                data: [
                    [
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2663",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 148.882258091906
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 330.639150091779
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 330.639150091779
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 346.992923170735
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 346.992923170735
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 541.35247873652
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 541.35247873652
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 992.424723284937
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 992.424723284937
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1024.94882490274
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2744",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 1024.94882490274
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1297.72743796975
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8306",
                            lon: "-122.2739",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 1297.72743796975
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1317.10537784042
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8307",
                            lon: "-122.2740",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1317.10537784042
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1543.49377910955
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2766",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1543.49377910955
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1683.51657093779
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8314",
                            lon: "-122.2781",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1683.51657093779
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1713.45943201622
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2785",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1713.45943201622
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1809.4369482424
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8311",
                            lon: "-122.2795",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1809.4369482424
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1835.98610285487
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2798",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1835.98610285487
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1955.52889360502
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8322",
                            lon: "-122.2802",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1955.52889360502
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1981.85688716198
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2805",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1981.85688716198
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300700,
                            stop_id: "ihop_o",
                            stop_name: "IHOP",
                            lat: "37.8323",
                            lon: "-122.2807"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8323",
                            lon: "-122.2807",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 2000.28523573265
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300695,
                            stop_id: "pawa_o",
                            stop_name: "Park at Watts (Pixar)",
                            lat: "37.8319",
                            lon: "-122.2827"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8319",
                            lon: "-122.2827",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2179.74214132603
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2446.70462477123
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8312",
                            lon: "-122.2856",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2446.70462477123
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2464.84395265793
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2858",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2464.84395265793
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300662,
                            stop_id: "ho45_o",
                            stop_name: "Hollis at 45th",
                            lat: "37.8332",
                            lon: "-122.2864"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8332",
                            lon: "-122.2864",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2681.77774410768
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300685,
                            stop_id: "ho53_o",
                            stop_name: "Hollis at 53rd",
                            lat: "37.8362",
                            lon: "-122.2876"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8362",
                            lon: "-122.2876",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 3029.26950629333
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3137.6438361722
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.2880",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 3137.6438361722
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3290.01173805234
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2887",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 3290.01173805234
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3309.45876033304
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2890",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 3309.45876033304
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3354.26895345848
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8382",
                            lon: "-122.2894",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 3354.26895345848
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300680,
                            stop_id: "stho_o",
                            stop_name: "Stanford at Horton (Emery Station)",
                            lat: "37.8376",
                            lon: "-122.2900"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 3435.86723864096
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3440.08735708244
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2900",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3440.08735708244
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3467.55810869762
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2903",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3467.55810869762
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 7,
                            id: 1300676,
                            stop_id: "es_o",
                            stop_name: "Amtrak Station",
                            lat: "37.8407",
                            lon: "-122.2913"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8407",
                            lon: "-122.2913",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3818.31510093848
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8409",
                            lon: "-122.2912",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3839.83403580134
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8409",
                            lon: "-122.2913",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3835.01746327289
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8412",
                            lon: "-122.2898",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3969.50523543673
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179207,
                            service_id: "wkd",
                            lat: "37.8410",
                            lon: "-122.2905",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3906.37575077761
                        },
                        {
                            trip_headsign: "to Emeryville",
                            shape_id: 179206,
                            service_id: "wkd",
                            lat: "37.8413",
                            lon: "-122.2897",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3986.84720200116
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 8,
                            id: 1300689,
                            stop_id: "ho59_o",
                            stop_name: "Hollis at 59th",
                            lat: "37.8416",
                            lon: "-122.2897"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 9,
                            id: 1300702,
                            stop_id: "ho64_o",
                            stop_name: "Hollis at 64th",
                            lat: "37.8450",
                            lon: "-122.2908"
                        },
                        {
                            trip_headsign: "to Emeryville",
                            service_id: "wkd",
                            stop_sequence: 10,
                            id: 1300669,
                            stop_id: "ho65_o",
                            stop_name: "Hollis at 65th",
                            lat: "37.8468",
                            lon: "-122.2914"
                        }
                    ]
                ]
            },
            {
                route: "wgexp_am",
                data: []
            },
            {
                route: "wgexp_am",
                data: [
                    [
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 62.5677783897081
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 0,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2663",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 148.882258091906
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2663",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 240.12987934868
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2663",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 240.12987934868
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 262.238889276663
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 262.238889276663
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2663",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 348.553368978861
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2663",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 348.553368978861
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 530.310260978734
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 530.310260978734
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 546.66403405769
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 546.66403405769
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 741.023589623475
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 741.023589623475
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1190.37216989811
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 1190.37216989811
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2760",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1354.36856262557
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2760",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1354.36856262557
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2778",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1515.74876697865
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2778",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1515.74876697865
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2787",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1597.61725083297
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2787",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1597.61725083297
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2793",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1652.99317565182
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2793",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1652.99317565182
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2804",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1747.91114103913
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2804",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1747.91114103913
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2811",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1807.0835635651
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2811",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1807.0835635651
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8279",
                            lon: "-122.2822",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1912.89543416558
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8279",
                            lon: "-122.2822",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1912.89543416558
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2830",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1983.5510856487
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2830",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1983.5510856487
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8275",
                            lon: "-122.2841",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2085.47462582273
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8275",
                            lon: "-122.2841",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 2085.47462582273
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2853",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2199.03659950099
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2853",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2199.03659950099
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8267",
                            lon: "-122.2870",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2354.84319425732
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8267",
                            lon: "-122.2870",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2354.84319425732
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8267",
                            lon: "-122.2881",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2449.93341907888
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8267",
                            lon: "-122.2881",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2449.93341907888
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8268",
                            lon: "-122.2890",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 2530.29082130483
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8268",
                            lon: "-122.2890",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 2530.29082130483
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8271",
                            lon: "-122.2901",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2637.84608399484
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8271",
                            lon: "-122.2901",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2637.84608399484
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8275",
                            lon: "-122.2913",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2749.46268766128
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8275",
                            lon: "-122.2913",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2749.46268766128
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2919",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2809.16440788919
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2919",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2809.16440788919
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8283",
                            lon: "-122.2926",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2896.03525857367
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8283",
                            lon: "-122.2926",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2896.03525857367
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8289",
                            lon: "-122.2931",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2972.6253295944
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8289",
                            lon: "-122.2931",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2972.6253295944
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2933",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3029.35801468301
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2933",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 3029.35801468301
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8298",
                            lon: "-122.2933",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3073.04308595551
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8298",
                            lon: "-122.2933",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3073.04308595551
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2932",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3240.1152559696
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2932",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3240.1152559696
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8318",
                            lon: "-122.2932",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3296.85194400177
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8318",
                            lon: "-122.2932",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3296.85194400177
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8324",
                            lon: "-122.2934",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3367.21034826972
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8324",
                            lon: "-122.2934",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3367.21034826972
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8331",
                            lon: "-122.2937",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3446.45386081179
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8331",
                            lon: "-122.2937",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3446.45386081179
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8342",
                            lon: "-122.2943",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 3585.43789166131
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8342",
                            lon: "-122.2943",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 3585.43789166131
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8350",
                            lon: "-122.2947",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3674.96430348393
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8350",
                            lon: "-122.2947",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3674.96430348393
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8361",
                            lon: "-122.2953",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3813.73925580279
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8361",
                            lon: "-122.2953",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3813.73925580279
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2960",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 3969.48136588288
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2960",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 3969.48136588288
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8379",
                            lon: "-122.2962",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4028.93960780573
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8379",
                            lon: "-122.2962",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 4028.93960780573
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8380",
                            lon: "-122.2970",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4097.22735856013
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8380",
                            lon: "-122.2970",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4097.22735856013
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8378",
                            lon: "-122.2975",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4149.60386467393
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8378",
                            lon: "-122.2975",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4149.60386467393
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300671,
                            stop_id: "pohi_i",
                            stop_name: "Powell at Hilton Garden Inn",
                            lat: "37.8377",
                            lon: "-122.2984"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179213,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2984",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4226.33873219809
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2996",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 4337.02273757008
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8376",
                            lon: "-122.2999",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4368.62404355715
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300668,
                            stop_id: "wgt_i",
                            stop_name: "The Towers",
                            lat: "37.8381",
                            lon: "-122.3002"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8390",
                            lon: "-122.3006",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 4538.00843816087
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8389",
                            lon: "-122.3008",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 4560.77074317626
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.3001",
                            shape_pt_sequence: 48,
                            shape_dist_traveled: 4730.15517724911
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8373",
                            lon: "-122.3002",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 4745.23503345561
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.3008",
                            shape_pt_sequence: 50,
                            shape_dist_traveled: 4804.70302504675
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300705,
                            stop_id: "wgc_i",
                            stop_name: "Watergate Condos",
                            lat: "37.8371",
                            lon: "-122.3025"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300691,
                            stop_id: "fps_i",
                            stop_name: "Fire and Police Stations",
                            lat: "37.8372",
                            lon: "-122.3046"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.3060",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5254.42597437987
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3061",
                            shape_pt_sequence: 54,
                            shape_dist_traveled: 5271.33975448627
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3052",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 5343.65830598805
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3018",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 5648.38429505679
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3008",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 5733.74828120913
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3004",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 5766.90861550298
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8377",
                            lon: "-122.2975",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 6037.82425818687
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8381",
                            lon: "-122.2971",
                            shape_pt_sequence: 60,
                            shape_dist_traveled: 6088.52299687937
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8383",
                            lon: "-122.2971",
                            shape_pt_sequence: 61,
                            shape_dist_traveled: 6115.26754802443
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8389",
                            lon: "-122.2973",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 6179.96623954576
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8394",
                            lon: "-122.2976",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6244.25441425785
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8398",
                            lon: "-122.2976",
                            shape_pt_sequence: 64,
                            shape_dist_traveled: 6284.28464439769
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8397",
                            lon: "-122.2973",
                            shape_pt_sequence: 65,
                            shape_dist_traveled: 6311.46053318638
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8394",
                            lon: "-122.2972",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 6349.71650623664
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2968",
                            shape_pt_sequence: 67,
                            shape_dist_traveled: 6463.7767675673
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2966",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 6560.24689447095
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8359",
                            lon: "-122.2959",
                            shape_pt_sequence: 69,
                            shape_dist_traveled: 6751.91957706043
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8346",
                            lon: "-122.2953",
                            shape_pt_sequence: 70,
                            shape_dist_traveled: 6901.29917823496
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8326",
                            lon: "-122.2943",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7151.3228295668
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8318",
                            lon: "-122.2940",
                            shape_pt_sequence: 72,
                            shape_dist_traveled: 7233.75544351289
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8309",
                            lon: "-122.2938",
                            shape_pt_sequence: 73,
                            shape_dist_traveled: 7335.21263497968
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2938",
                            shape_pt_sequence: 74,
                            shape_dist_traveled: 7411.94226914083
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8292",
                            lon: "-122.2939",
                            shape_pt_sequence: 75,
                            shape_dist_traveled: 7532.23831920483
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8288",
                            lon: "-122.2938",
                            shape_pt_sequence: 76,
                            shape_dist_traveled: 7571.78574839536
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2934",
                            shape_pt_sequence: 77,
                            shape_dist_traveled: 7653.33444771801
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2929",
                            shape_pt_sequence: 78,
                            shape_dist_traveled: 7712.1093748967
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2912",
                            shape_pt_sequence: 79,
                            shape_dist_traveled: 7887.50148511845
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8265",
                            lon: "-122.2903",
                            shape_pt_sequence: 80,
                            shape_dist_traveled: 7977.90830241387
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2896",
                            shape_pt_sequence: 81,
                            shape_dist_traveled: 8046.24997018051
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2888",
                            shape_pt_sequence: 82,
                            shape_dist_traveled: 8118.8178605881
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2882",
                            shape_pt_sequence: 83,
                            shape_dist_traveled: 8171.5158895329
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2876",
                            shape_pt_sequence: 84,
                            shape_dist_traveled: 8222.36316907271
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8266",
                            lon: "-122.2866",
                            shape_pt_sequence: 85,
                            shape_dist_traveled: 8316.07709204104
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8270",
                            lon: "-122.2850",
                            shape_pt_sequence: 86,
                            shape_dist_traveled: 8463.68452961546
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2838",
                            shape_pt_sequence: 87,
                            shape_dist_traveled: 8565.60877738469
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8274",
                            lon: "-122.2832",
                            shape_pt_sequence: 88,
                            shape_dist_traveled: 8628.59695271555
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8276",
                            lon: "-122.2825",
                            shape_pt_sequence: 89,
                            shape_dist_traveled: 8688.75739647064
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8281",
                            lon: "-122.2809",
                            shape_pt_sequence: 90,
                            shape_dist_traveled: 8842.89978964306
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2791",
                            shape_pt_sequence: 91,
                            shape_dist_traveled: 9001.44200092459
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2780",
                            shape_pt_sequence: 92,
                            shape_dist_traveled: 9100.71204472075
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8281",
                            lon: "-122.2762",
                            shape_pt_sequence: 93,
                            shape_dist_traveled: 9262.25502791461
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2739",
                            shape_pt_sequence: 94,
                            shape_dist_traveled: 9465.83715187991
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8274",
                            lon: "-122.2712",
                            shape_pt_sequence: 95,
                            shape_dist_traveled: 9702.79432663159
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8271",
                            lon: "-122.2692",
                            shape_pt_sequence: 96,
                            shape_dist_traveled: 9884.65019505347
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8273",
                            lon: "-122.2689",
                            shape_pt_sequence: 97,
                            shape_dist_traveled: 9914.29596965319
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8296",
                            lon: "-122.2684",
                            shape_pt_sequence: 98,
                            shape_dist_traveled: 10170.3645981686
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2682",
                            shape_pt_sequence: 99,
                            shape_dist_traveled: 10185.6850649108
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179212,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2668",
                            shape_pt_sequence: 102,
                            shape_dist_traveled: 10317.7545617585
                        }
                    ]
                ]
            },
            {
                route: "wgexp_am",
                data: []
            },
            {
                route: "wgexp_pm",
                data: []
            },
            {
                route: "wgexp_pm",
                data: [
                    [
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 6,
                            id: 1300690,
                            stop_id: "barta_i",
                            stop_name: "MacArthur Bart Station (Hidden Arrival)",
                            lat: "37.8294",
                            lon: "-122.2669"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3033",
                            shape_pt_sequence: 1,
                            shape_dist_traveled: 0
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 0.452961635681712
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3018",
                            shape_pt_sequence: 2,
                            shape_dist_traveled: 132.608757815641
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 76.795014258027
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3008",
                            shape_pt_sequence: 3,
                            shape_dist_traveled: 219.895571543256
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 0,
                            id: 1300661,
                            stop_id: "bart_o",
                            stop_name: "MacArthur BART Station",
                            lat: "37.8285",
                            lon: "-122.2663"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8373",
                            lon: "-122.2999",
                            shape_pt_sequence: 4,
                            shape_dist_traveled: 299.943245286215
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2663",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 254.357115216999
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2999",
                            shape_pt_sequence: 5,
                            shape_dist_traveled: 322.797923055595
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8293",
                            lon: "-122.2661",
                            shape_pt_sequence: 6,
                            shape_dist_traveled: 276.466125144982
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 4,
                            id: 1300668,
                            stop_id: "wgt_i",
                            stop_name: "The Towers",
                            lat: "37.8381",
                            lon: "-122.3002"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2663",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 362.78060484718
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8390",
                            lon: "-122.3006",
                            shape_pt_sequence: 7,
                            shape_dist_traveled: 497.298016821089
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2668",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 544.537496847053
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8392",
                            lon: "-122.3005",
                            shape_pt_sequence: 8,
                            shape_dist_traveled: 524.550182857754
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2669",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 560.891269926009
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8394",
                            lon: "-122.2995",
                            shape_pt_sequence: 9,
                            shape_dist_traveled: 616.57893755783
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2691",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 755.250825491794
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8395",
                            lon: "-122.2989",
                            shape_pt_sequence: 10,
                            shape_dist_traveled: 667.62756519425
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8280",
                            lon: "-122.2741",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 1204.59940576643
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8398",
                            lon: "-122.2984",
                            shape_pt_sequence: 11,
                            shape_dist_traveled: 720.739251038632
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2760",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 1368.59579849389
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8399",
                            lon: "-122.2979",
                            shape_pt_sequence: 12,
                            shape_dist_traveled: 769.155599892259
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2778",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 1529.97600284697
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8398",
                            lon: "-122.2974",
                            shape_pt_sequence: 13,
                            shape_dist_traveled: 815.300423154383
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2787",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 1611.84448670129
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8395",
                            lon: "-122.2971",
                            shape_pt_sequence: 14,
                            shape_dist_traveled: 862.353204249436
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8285",
                            lon: "-122.2793",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 1667.22041152013
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2969",
                            shape_pt_sequence: 15,
                            shape_dist_traveled: 984.595051938668
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2804",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1762.13837690745
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2966",
                            shape_pt_sequence: 16,
                            shape_dist_traveled: 1093.05434737481
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2811",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1821.31079943342
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8363",
                            lon: "-122.2961",
                            shape_pt_sequence: 17,
                            shape_dist_traveled: 1223.98056427184
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8279",
                            lon: "-122.2822",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1927.1226700339
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8358",
                            lon: "-122.2959",
                            shape_pt_sequence: 18,
                            shape_dist_traveled: 1280.66643776654
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2830",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1997.77832151702
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8347",
                            lon: "-122.2953",
                            shape_pt_sequence: 19,
                            shape_dist_traveled: 1421.22973355816
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8275",
                            lon: "-122.2841",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 2099.70186169105
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8326",
                            lon: "-122.2943",
                            shape_pt_sequence: 20,
                            shape_dist_traveled: 1673.26688406506
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2853",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 2213.26383536931
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8318",
                            lon: "-122.2940",
                            shape_pt_sequence: 21,
                            shape_dist_traveled: 1755.69949801115
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8267",
                            lon: "-122.2870",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 2369.07043012564
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8309",
                            lon: "-122.2938",
                            shape_pt_sequence: 22,
                            shape_dist_traveled: 1857.15668947793
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8267",
                            lon: "-122.2881",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 2464.1606549472
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2938",
                            shape_pt_sequence: 23,
                            shape_dist_traveled: 1933.88632363909
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8268",
                            lon: "-122.2890",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2544.51805717315
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8292",
                            lon: "-122.2939",
                            shape_pt_sequence: 24,
                            shape_dist_traveled: 2054.18237370308
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8271",
                            lon: "-122.2901",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2652.07331986316
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8288",
                            lon: "-122.2938",
                            shape_pt_sequence: 25,
                            shape_dist_traveled: 2093.72980289362
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8275",
                            lon: "-122.2913",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2763.6899235296
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2934",
                            shape_pt_sequence: 26,
                            shape_dist_traveled: 2175.27850221627
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2919",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2823.39164375751
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2929",
                            shape_pt_sequence: 27,
                            shape_dist_traveled: 2234.05342939495
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8283",
                            lon: "-122.2926",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2910.26249444199
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2912",
                            shape_pt_sequence: 28,
                            shape_dist_traveled: 2409.44553961671
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8289",
                            lon: "-122.2931",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2986.85256546271
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8265",
                            lon: "-122.2903",
                            shape_pt_sequence: 29,
                            shape_dist_traveled: 2499.85235691213
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2933",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 3043.58525055133
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2896",
                            shape_pt_sequence: 30,
                            shape_dist_traveled: 2568.19402467877
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8298",
                            lon: "-122.2933",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 3087.27032182383
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2888",
                            shape_pt_sequence: 31,
                            shape_dist_traveled: 2640.76191508636
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8313",
                            lon: "-122.2932",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 3254.34249183792
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2882",
                            shape_pt_sequence: 32,
                            shape_dist_traveled: 2693.45994403115
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8318",
                            lon: "-122.2932",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 3311.07917987009
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2876",
                            shape_pt_sequence: 33,
                            shape_dist_traveled: 2744.30722357096
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8324",
                            lon: "-122.2934",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 3381.43758413804
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8266",
                            lon: "-122.2866",
                            shape_pt_sequence: 34,
                            shape_dist_traveled: 2838.0211465393
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8331",
                            lon: "-122.2937",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 3460.68109668011
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8270",
                            lon: "-122.2850",
                            shape_pt_sequence: 35,
                            shape_dist_traveled: 2985.62858411372
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8342",
                            lon: "-122.2943",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3599.66512752962
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2838",
                            shape_pt_sequence: 36,
                            shape_dist_traveled: 3087.55283188294
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8350",
                            lon: "-122.2947",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3689.19153935225
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8274",
                            lon: "-122.2832",
                            shape_pt_sequence: 37,
                            shape_dist_traveled: 3150.5410072138
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8361",
                            lon: "-122.2953",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 3827.96649167111
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8276",
                            lon: "-122.2825",
                            shape_pt_sequence: 38,
                            shape_dist_traveled: 3210.70145096889
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2960",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 3983.7086017512
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8281",
                            lon: "-122.2809",
                            shape_pt_sequence: 39,
                            shape_dist_traveled: 3364.84384414131
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8379",
                            lon: "-122.2962",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 4043.16684367405
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2791",
                            shape_pt_sequence: 40,
                            shape_dist_traveled: 3523.38605542285
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8380",
                            lon: "-122.2970",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 4111.45459442844
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2780",
                            shape_pt_sequence: 41,
                            shape_dist_traveled: 3622.656099219
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8378",
                            lon: "-122.2975",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 4163.83110054225
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8281",
                            lon: "-122.2762",
                            shape_pt_sequence: 42,
                            shape_dist_traveled: 3784.19908241287
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 1,
                            id: 1300671,
                            stop_id: "pohi_i",
                            stop_name: "Powell at Hilton Garden Inn",
                            lat: "37.8377",
                            lon: "-122.2984"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2739",
                            shape_pt_sequence: 43,
                            shape_dist_traveled: 3987.78120637817
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.3008",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4465.61377811
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8274",
                            lon: "-122.2712",
                            shape_pt_sequence: 44,
                            shape_dist_traveled: 4224.73838112985
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 2,
                            id: 1300705,
                            stop_id: "wgc_i",
                            stop_name: "Watergate Condos",
                            lat: "37.8371",
                            lon: "-122.3025"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8271",
                            lon: "-122.2692",
                            shape_pt_sequence: 45,
                            shape_dist_traveled: 4406.59424955173
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 3,
                            id: 1300691,
                            stop_id: "fps_i",
                            stop_name: "Fire and Police Stations",
                            lat: "37.8372",
                            lon: "-122.3046"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3046",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 4792.81290169551
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8273",
                            lon: "-122.2689",
                            shape_pt_sequence: 46,
                            shape_dist_traveled: 4436.24002415144
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8372",
                            lon: "-122.3057",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 4891.61334551665
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8296",
                            lon: "-122.2684",
                            shape_pt_sequence: 47,
                            shape_dist_traveled: 4692.30865266685
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3061",
                            shape_pt_sequence: 48,
                            shape_dist_traveled: 4925.05785939755
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2682",
                            shape_pt_sequence: 48,
                            shape_dist_traveled: 4707.6291194091
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3061",
                            shape_pt_sequence: 49,
                            shape_dist_traveled: 4936.21199099706
                        },
                        {
                            trip_headsign: "to BART Station",
                            service_id: "wkd",
                            stop_sequence: 5,
                            id: 1300667,
                            stop_id: "bartw_i",
                            stop_name: "MacArthur Bart Station",
                            lat: "37.8295",
                            lon: "-122.2675"
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3052",
                            shape_pt_sequence: 50,
                            shape_dist_traveled: 5008.53054249884
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 50,
                            shape_dist_traveled: 4825.8959941663
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8370",
                            lon: "-122.3018",
                            shape_pt_sequence: 51,
                            shape_dist_traveled: 5313.25653156758
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179211,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 51,
                            shape_dist_traveled: 4826.34868144025
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8371",
                            lon: "-122.3008",
                            shape_pt_sequence: 52,
                            shape_dist_traveled: 5400.54334529519
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8373",
                            lon: "-122.2999",
                            shape_pt_sequence: 53,
                            shape_dist_traveled: 5480.59101903815
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8375",
                            lon: "-122.2999",
                            shape_pt_sequence: 54,
                            shape_dist_traveled: 5503.44569680753
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8381",
                            lon: "-122.3002",
                            shape_pt_sequence: 55,
                            shape_dist_traveled: 5574.47473156701
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8390",
                            lon: "-122.3006",
                            shape_pt_sequence: 56,
                            shape_dist_traveled: 5677.94579057303
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8392",
                            lon: "-122.3005",
                            shape_pt_sequence: 57,
                            shape_dist_traveled: 5705.19795660969
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8394",
                            lon: "-122.2995",
                            shape_pt_sequence: 58,
                            shape_dist_traveled: 5797.22671130977
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8395",
                            lon: "-122.2989",
                            shape_pt_sequence: 59,
                            shape_dist_traveled: 5848.27533894619
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8398",
                            lon: "-122.2984",
                            shape_pt_sequence: 60,
                            shape_dist_traveled: 5901.38702479057
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8399",
                            lon: "-122.2979",
                            shape_pt_sequence: 61,
                            shape_dist_traveled: 5949.80337364419
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8398",
                            lon: "-122.2974",
                            shape_pt_sequence: 62,
                            shape_dist_traveled: 5995.94819690632
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8395",
                            lon: "-122.2971",
                            shape_pt_sequence: 63,
                            shape_dist_traveled: 6043.00097800137
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8384",
                            lon: "-122.2969",
                            shape_pt_sequence: 64,
                            shape_dist_traveled: 6165.2428256906
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8374",
                            lon: "-122.2966",
                            shape_pt_sequence: 65,
                            shape_dist_traveled: 6273.70212112674
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8363",
                            lon: "-122.2961",
                            shape_pt_sequence: 66,
                            shape_dist_traveled: 6404.62833802378
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8358",
                            lon: "-122.2959",
                            shape_pt_sequence: 67,
                            shape_dist_traveled: 6461.31421151848
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8347",
                            lon: "-122.2953",
                            shape_pt_sequence: 68,
                            shape_dist_traveled: 6601.87750731009
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8326",
                            lon: "-122.2943",
                            shape_pt_sequence: 69,
                            shape_dist_traveled: 6853.91465781699
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8318",
                            lon: "-122.2940",
                            shape_pt_sequence: 70,
                            shape_dist_traveled: 6936.34727176308
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8309",
                            lon: "-122.2938",
                            shape_pt_sequence: 71,
                            shape_dist_traveled: 7037.80446322987
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8303",
                            lon: "-122.2938",
                            shape_pt_sequence: 72,
                            shape_dist_traveled: 7114.53409739102
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8292",
                            lon: "-122.2939",
                            shape_pt_sequence: 73,
                            shape_dist_traveled: 7234.83014745502
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8288",
                            lon: "-122.2938",
                            shape_pt_sequence: 74,
                            shape_dist_traveled: 7274.37757664556
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8282",
                            lon: "-122.2934",
                            shape_pt_sequence: 75,
                            shape_dist_traveled: 7355.92627596821
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2929",
                            shape_pt_sequence: 76,
                            shape_dist_traveled: 7414.70120314689
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8269",
                            lon: "-122.2912",
                            shape_pt_sequence: 77,
                            shape_dist_traveled: 7590.09331336864
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8265",
                            lon: "-122.2903",
                            shape_pt_sequence: 78,
                            shape_dist_traveled: 7680.50013066406
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2896",
                            shape_pt_sequence: 79,
                            shape_dist_traveled: 7748.84179843071
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2888",
                            shape_pt_sequence: 80,
                            shape_dist_traveled: 7821.40968883829
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2882",
                            shape_pt_sequence: 81,
                            shape_dist_traveled: 7874.10771778309
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8263",
                            lon: "-122.2876",
                            shape_pt_sequence: 82,
                            shape_dist_traveled: 7924.9549973229
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8266",
                            lon: "-122.2866",
                            shape_pt_sequence: 83,
                            shape_dist_traveled: 8018.66892029123
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8270",
                            lon: "-122.2850",
                            shape_pt_sequence: 84,
                            shape_dist_traveled: 8166.27635786565
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8272",
                            lon: "-122.2838",
                            shape_pt_sequence: 85,
                            shape_dist_traveled: 8268.20060563488
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8274",
                            lon: "-122.2832",
                            shape_pt_sequence: 86,
                            shape_dist_traveled: 8331.18878096574
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8276",
                            lon: "-122.2825",
                            shape_pt_sequence: 87,
                            shape_dist_traveled: 8391.34922472083
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8281",
                            lon: "-122.2809",
                            shape_pt_sequence: 88,
                            shape_dist_traveled: 8545.49161789325
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2791",
                            shape_pt_sequence: 89,
                            shape_dist_traveled: 8704.03382917478
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8284",
                            lon: "-122.2780",
                            shape_pt_sequence: 90,
                            shape_dist_traveled: 8803.30387297094
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8281",
                            lon: "-122.2762",
                            shape_pt_sequence: 91,
                            shape_dist_traveled: 8964.8468561648
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8278",
                            lon: "-122.2739",
                            shape_pt_sequence: 92,
                            shape_dist_traveled: 9168.4289801301
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8274",
                            lon: "-122.2712",
                            shape_pt_sequence: 93,
                            shape_dist_traveled: 9405.38615488178
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8271",
                            lon: "-122.2692",
                            shape_pt_sequence: 94,
                            shape_dist_traveled: 9587.24202330366
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8273",
                            lon: "-122.2689",
                            shape_pt_sequence: 95,
                            shape_dist_traveled: 9616.88779790338
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8296",
                            lon: "-122.2684",
                            shape_pt_sequence: 96,
                            shape_dist_traveled: 9872.95642641879
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8297",
                            lon: "-122.2682",
                            shape_pt_sequence: 97,
                            shape_dist_traveled: 9888.27689316104
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8295",
                            lon: "-122.2675",
                            shape_pt_sequence: 98,
                            shape_dist_traveled: 9953.99934104179
                        },
                        {
                            trip_headsign: "to BART Station",
                            shape_id: 179208,
                            service_id: "wkd",
                            lat: "37.8294",
                            lon: "-122.2669",
                            shape_pt_sequence: 99,
                            shape_dist_traveled: 10006.996455192
                        }
                    ]
                ]
            },
            {
                route: "wgexp_pm",
                data: []
            }
        ];

        var triggerpoints =[];

        array.forEach(function(item){

           if(item.route===$scope.route) {
               item.data.forEach(function(service_id){
                if (service_id[0].trip_headsign === $scope.headsign  ) {
                    if (service_id[0].service_id === $scope.service_id) {
                        var i = 0;

                        service_id.forEach(function (point) {

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

                        var clonedArray = JSON.parse(JSON.stringify(service_id.reverse()));

                        for (var j = 0; j < clonedArray.length - 1; j++) {
                            if (clonedArray[j].stop_sequence) {
                                var currentStop = clonedArray[j];
                                //we have a stop and now we need to find a lat/lng that is 40 meters away
                                //lets get items in the array until we are over 40 meters away then we want to grab that item and the one before
                                //and we'll have a line in which the 40 meter point is in.

                                var index = 1;
                                var distance = 40;

                                while (((j + index) < clonedArray.length) && (distance > (calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon)))) {  //get going until we are over 40 meters or we hit the last item in the array
                                    console.log(calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon), 'should be less than 40 in the while');
                                    distance = distance - calcLatLngDistance(currentStop.lat, currentStop.lon, clonedArray[j + index].lat, clonedArray[j + index].lon);

                                    //store this point so that we can factor in it's distance from origin
                                    index = index + 1;
                                }

                                var nextMaxPoint = clonedArray[j + index];
                                var nextMinPoint = clonedArray[j + index - 1];

                                var testresult = midpoint(nextMinPoint.lat, nextMinPoint.lon, nextMaxPoint.lat, nextMaxPoint.lon, (distance / calcLatLngDistance(nextMaxPoint.lat, nextMaxPoint.lon, nextMinPoint.lat, nextMinPoint.lon)));

                                //we have a triggerpoint lat lon.. add it to trigger points array so we can create it later...
                                triggerpoints.push({lat: testresult[0], lon: testresult[1]});
                            }
                        }
                    }
                }
               });
           }
        });
        var i=0;
        triggerpoints.forEach(function(triggerpoint)
        {

            $scope.markers['triggerpoint' + i] =
                {
                    lat: triggerpoint.lat * 1,
                    lng: triggerpoint.lon * 1,
                    draggable: false,
                    message: 'triggerpoint'+i,
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