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

    $scope.addMarkers = function () {
        var array = [
            {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8294',
                lng: '-122.2668',
                shape_pt_sequence: 1,
                shape_dist_traveled: 0
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 1,
                id: 1300661,
                stop_id: 'bart_o',
                stop_name: 'MacArthur BART Station',
                lat: '37.8285',
                lng: '-122.2663'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8293',
                lng: '-122.2661',
                shape_pt_sequence: 2,
                shape_dist_traveled: 62.5677783897081
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 2,
                id: 1300700,
                stop_id: 'ihop_o',
                stop_name: 'IHOP',
                lat: '37.8323',
                lng: '-122.2807'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8285',
                lng: '-122.2663',
                shape_pt_sequence: 3,
                shape_dist_traveled: 148.882258091906
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 3,
                id: 1300695,
                stop_id: 'pawa_o',
                stop_name: 'Park at Watts (Pixar)',
                lat: '37.8319',
                lng: '-122.2827'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8269',
                lng: '-122.2668',
                shape_pt_sequence: 4,
                shape_dist_traveled: 330.639150091779
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8269',
                lng: '-122.2669',
                shape_pt_sequence: 5,
                shape_dist_traveled: 346.992923170735
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8272',
                lng: '-122.2691',
                shape_pt_sequence: 6,
                shape_dist_traveled: 541.35247873652
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8280',
                lng: '-122.2741',
                shape_pt_sequence: 7,
                shape_dist_traveled: 992.424723284937
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8282',
                lng: '-122.2744',
                shape_pt_sequence: 8,
                shape_dist_traveled: 1024.94882490274
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 4,
                id: 1300662,
                stop_id: 'ho45_o',
                stop_name: 'Hollis at 45th',
                lat: '37.8332',
                lng: '-122.2864'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8306',
                lng: '-122.2739',
                shape_pt_sequence: 9,
                shape_dist_traveled: 1297.72743796975
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8307',
                lng: '-122.2740',
                shape_pt_sequence: 10,
                shape_dist_traveled: 1317.10537784042
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8311',
                lng: '-122.2766',
                shape_pt_sequence: 11,
                shape_dist_traveled: 1543.49377910955
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8314',
                lng: '-122.2781',
                shape_pt_sequence: 12,
                shape_dist_traveled: 1683.51657093779
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8313',
                lng: '-122.2785',
                shape_pt_sequence: 13,
                shape_dist_traveled: 1713.45943201622
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8311',
                lng: '-122.2795',
                shape_pt_sequence: 14,
                shape_dist_traveled: 1809.4369482424
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8312',
                lng: '-122.2798',
                shape_pt_sequence: 15,
                shape_dist_traveled: 1835.98610285487
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8322',
                lng: '-122.2802',
                shape_pt_sequence: 16,
                shape_dist_traveled: 1955.52889360502
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8323',
                lng: '-122.2805',
                shape_pt_sequence: 17,
                shape_dist_traveled: 1981.85688716198
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8323',
                lng: '-122.2807',
                shape_pt_sequence: 18,
                shape_dist_traveled: 2000.28523573265
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8319',
                lng: '-122.2827',
                shape_pt_sequence: 19,
                shape_dist_traveled: 2179.74214132603
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8312',
                lng: '-122.2856',
                shape_pt_sequence: 20,
                shape_dist_traveled: 2446.70462477123
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8313',
                lng: '-122.2858',
                shape_pt_sequence: 21,
                shape_dist_traveled: 2464.84395265793
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8332',
                lng: '-122.2864',
                shape_pt_sequence: 22,
                shape_dist_traveled: 2681.77774410768
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 5,
                id: 1300685,
                stop_id: 'ho53_o',
                stop_name: 'Hollis at 53rd',
                lat: '37.8362',
                lng: '-122.2876'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8362',
                lng: '-122.2876',
                shape_pt_sequence: 23,
                shape_dist_traveled: 3029.26950629333
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8371',
                lng: '-122.2880',
                shape_pt_sequence: 24,
                shape_dist_traveled: 3137.6438361722
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8383',
                lng: '-122.2887',
                shape_pt_sequence: 25,
                shape_dist_traveled: 3290.01173805234
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8384',
                lng: '-122.2890',
                shape_pt_sequence: 26,
                shape_dist_traveled: 3309.45876033304
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8382',
                lng: '-122.2894',
                shape_pt_sequence: 27,
                shape_dist_traveled: 3354.26895345848
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 6,
                id: 1300680,
                stop_id: 'stho_o',
                stop_name: 'Stanford at Horton (Emery Station)',
                lat: '37.8376',
                lng: '-122.2900'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8376',
                lng: '-122.2900',
                shape_pt_sequence: 28,
                shape_dist_traveled: 3435.86723864096
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 7,
                id: 1300676,
                stop_id: 'es_o',
                stop_name: 'Amtrak Station',
                lat: '37.8407',
                lng: '-122.2913'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8376',
                lng: '-122.2900',
                shape_pt_sequence: 29,
                shape_dist_traveled: 3440.08735708244
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8377',
                lng: '-122.2903',
                shape_pt_sequence: 30,
                shape_dist_traveled: 3467.55810869762
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8407',
                lng: '-122.2913',
                shape_pt_sequence: 31,
                shape_dist_traveled: 3818.31510093848
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8409',
                lng: '-122.2912',
                shape_pt_sequence: 32,
                shape_dist_traveled: 3839.83403580134
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8412',
                lng: '-122.2898',
                shape_pt_sequence: 33,
                shape_dist_traveled: 3969.50523543673
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8413',
                lng: '-122.2897',
                shape_pt_sequence: 34,
                shape_dist_traveled: 3986.84720200116
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 8,
                id: 1300689,
                stop_id: 'ho59_o',
                stop_name: 'Hollis at 59th',
                lat: '37.8416',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8416',
                lng: '-122.2897',
                shape_pt_sequence: 35,
                shape_dist_traveled: 4015.28238120342
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 9,
                id: 1300702,
                stop_id: 'ho64_o',
                stop_name: 'Hollis at 64th',
                lat: '37.8450',
                lng: '-122.2908'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8450',
                lng: '-122.2908',
                shape_pt_sequence: 36,
                shape_dist_traveled: 4409.40066146477
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 10,
                id: 1300669,
                stop_id: 'ho65_o',
                stop_name: 'Hollis at 65th',
                lat: '37.8468',
                lng: '-122.2914'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8468',
                lng: '-122.2914',
                shape_pt_sequence: 37,
                shape_dist_traveled: 4619.59714698666
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8493',
                lng: '-122.2922',
                shape_pt_sequence: 38,
                shape_dist_traveled: 4904.38464088082
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8497',
                lng: '-122.2921',
                shape_pt_sequence: 39,
                shape_dist_traveled: 4944.94224120347
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8499',
                lng: '-122.2910',
                shape_pt_sequence: 40,
                shape_dist_traveled: 5045.99019313928
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8502',
                lng: '-122.2907',
                shape_pt_sequence: 41,
                shape_dist_traveled: 5082.28966157428
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8511',
                lng: '-122.2910',
                shape_pt_sequence: 42,
                shape_dist_traveled: 5192.53821385625
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 11,
                id: 1300693,
                stop_id: 'bbowl_i',
                stop_name: 'Berkeley Bowl West',
                lat: '37.8525',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8521',
                lng: '-122.2914',
                shape_pt_sequence: 43,
                shape_dist_traveled: 5306.00089779036
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8522',
                lng: '-122.2913',
                shape_pt_sequence: 44,
                shape_dist_traveled: 5317.95561300719
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8525',
                lng: '-122.2897',
                shape_pt_sequence: 45,
                shape_dist_traveled: 5461.16873264778
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8524',
                lng: '-122.2897',
                shape_pt_sequence: 46,
                shape_dist_traveled: 5472.41675594397
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8520',
                lng: '-122.2895',
                shape_pt_sequence: 47,
                shape_dist_traveled: 5530.07482288556
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8518',
                lng: '-122.2896',
                shape_pt_sequence: 48,
                shape_dist_traveled: 5544.7656195813
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8515',
                lng: '-122.2911',
                shape_pt_sequence: 49,
                shape_dist_traveled: 5687.41172635356
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8514',
                lng: '-122.2912',
                shape_pt_sequence: 50,
                shape_dist_traveled: 5703.48325772716
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8502',
                lng: '-122.2909',
                shape_pt_sequence: 51,
                shape_dist_traveled: 5841.49409657093
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8500',
                lng: '-122.2909',
                shape_pt_sequence: 52,
                shape_dist_traveled: 5860.96128133208
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8498',
                lng: '-122.2920',
                shape_pt_sequence: 53,
                shape_dist_traveled: 5956.06456050414
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8496',
                lng: '-122.2923',
                shape_pt_sequence: 54,
                shape_dist_traveled: 5992.66087816967
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8494',
                lng: '-122.2923',
                shape_pt_sequence: 55,
                shape_dist_traveled: 6013.86079843392
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8479',
                lng: '-122.2919',
                shape_pt_sequence: 56,
                shape_dist_traveled: 6186.76239565869
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8478',
                lng: '-122.2916',
                shape_pt_sequence: 57,
                shape_dist_traveled: 6215.01105643626
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8483',
                lng: '-122.2888',
                shape_pt_sequence: 58,
                shape_dist_traveled: 6462.97431497151
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8483',
                lng: '-122.2886',
                shape_pt_sequence: 59,
                shape_dist_traveled: 6480.57024504992
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 12,
                id: 1300697,
                stop_id: 'vall66_i',
                stop_name: 'Vallejo at 66th',
                lat: '37.8475',
                lng: '-122.2884'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8475',
                lng: '-122.2884',
                shape_pt_sequence: 60,
                shape_dist_traveled: 6572.23993050853
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 13,
                id: 1300660,
                stop_id: '65ho_i',
                stop_name: '65th at Hollis',
                lat: '37.8465',
                lng: '-122.2914'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8475',
                lng: '-122.2884',
                shape_pt_sequence: 61,
                shape_dist_traveled: 6573.27459938229
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8474',
                lng: '-122.2884',
                shape_pt_sequence: 62,
                shape_dist_traveled: 6588.66005816833
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 14,
                id: 1300684,
                stop_id: 'ho64_i',
                stop_name: 'Hollis at 63rd',
                lat: '37.8437',
                lng: '-122.2905'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8468',
                lng: '-122.2912',
                shape_pt_sequence: 63,
                shape_dist_traveled: 6842.00713508949
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8467',
                lng: '-122.2915',
                shape_pt_sequence: 64,
                shape_dist_traveled: 6867.50598544329
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8465',
                lng: '-122.2914',
                shape_pt_sequence: 65,
                shape_dist_traveled: 6883.2028998358
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8449',
                lng: '-122.2909',
                shape_pt_sequence: 66,
                shape_dist_traveled: 7075.55033019117
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8437',
                lng: '-122.2905',
                shape_pt_sequence: 67,
                shape_dist_traveled: 7214.84266811456
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8431',
                lng: '-122.2903',
                shape_pt_sequence: 68,
                shape_dist_traveled: 7276.50978455918
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 15,
                id: 1300682,
                stop_id: 'ho59_i',
                stop_name: 'Hollis at 59th (Emery Station)',
                lat: '37.8410',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8410',
                lng: '-122.2897',
                shape_pt_sequence: 69,
                shape_dist_traveled: 7522.55558800831
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8383',
                lng: '-122.2888',
                shape_pt_sequence: 70,
                shape_dist_traveled: 7827.11143936746
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8375',
                lng: '-122.2883',
                shape_pt_sequence: 71,
                shape_dist_traveled: 7932.85626586534
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 16,
                id: 1300701,
                stop_id: 'ho53_i',
                stop_name: 'Hollis at 53rd',
                lat: '37.8357',
                lng: '-122.2875'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8357',
                lng: '-122.2875',
                shape_pt_sequence: 72,
                shape_dist_traveled: 8135.34856534924
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8349',
                lng: '-122.2872',
                shape_pt_sequence: 73,
                shape_dist_traveled: 8232.62418339458
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 17,
                id: 1300672,
                stop_id: 'ho45_i',
                stop_name: 'Hollis at 45th',
                lat: '37.8331',
                lng: '-122.2865'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8331',
                lng: '-122.2865',
                shape_pt_sequence: 74,
                shape_dist_traveled: 8438.81677453063
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8312',
                lng: '-122.2858',
                shape_pt_sequence: 75,
                shape_dist_traveled: 8660.74475940419
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8311',
                lng: '-122.2855',
                shape_pt_sequence: 76,
                shape_dist_traveled: 8687.3766228254
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 18,
                id: 1300696,
                stop_id: 'pix_i',
                stop_name: 'Park at Watts (Pixar)',
                lat: '37.8317',
                lng: '-122.2827'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8317',
                lng: '-122.2827',
                shape_pt_sequence: 77,
                shape_dist_traveled: 8946.97934546599
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8319',
                lng: '-122.2816',
                shape_pt_sequence: 78,
                shape_dist_traveled: 9043.54607663172
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8319',
                lng: '-122.2814',
                shape_pt_sequence: 79,
                shape_dist_traveled: 9064.37614043648
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 19,
                id: 1300675,
                stop_id: 'em40_i',
                stop_name: 'Emery at 40th',
                lat: '37.8309',
                lng: '-122.2811'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8309',
                lng: '-122.2811',
                shape_pt_sequence: 80,
                shape_dist_traveled: 9172.16904711348
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8307',
                lng: '-122.2809',
                shape_pt_sequence: 81,
                shape_dist_traveled: 9201.7829706601
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8312',
                lng: '-122.2785',
                shape_pt_sequence: 82,
                shape_dist_traveled: 9422.60252225989
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8312',
                lng: '-122.2782',
                shape_pt_sequence: 83,
                shape_dist_traveled: 9450.18893157204
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8308',
                lng: '-122.2757',
                shape_pt_sequence: 84,
                shape_dist_traveled: 9668.41735173278
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8303',
                lng: '-122.2724',
                shape_pt_sequence: 85,
                shape_dist_traveled: 9963.08995580818
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8297',
                lng: '-122.2688',
                shape_pt_sequence: 86,
                shape_dist_traveled: 10292.4441411196
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 20,
                id: 1300667,
                stop_id: 'bartw_i',
                stop_name: 'MacArthur Bart Station',
                lat: '37.8295',
                lng: '-122.2675'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sat',
                lat: '37.8295',
                lng: '-122.2675',
                shape_pt_sequence: 87,
                shape_dist_traveled: 10404.0621410399
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sat',
                stop_sequence: 21,
                id: 1300690,
                stop_id: 'barta_i',
                stop_name: 'MacArthur Bart Station (Hidden Arrival)',
                lat: '37.8294',
                lng: '-122.2669'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8294',
                lng: '-122.2668',
                shape_pt_sequence: 1,
                shape_dist_traveled: 0
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 1,
                id: 1300661,
                stop_id: 'bart_o',
                stop_name: 'MacArthur BART Station',
                lat: '37.8285',
                lng: '-122.2663'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8293',
                lng: '-122.2661',
                shape_pt_sequence: 2,
                shape_dist_traveled: 62.5677783897081
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 2,
                id: 1300700,
                stop_id: 'ihop_o',
                stop_name: 'IHOP',
                lat: '37.8323',
                lng: '-122.2807'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8285',
                lng: '-122.2663',
                shape_pt_sequence: 3,
                shape_dist_traveled: 148.882258091906
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 3,
                id: 1300695,
                stop_id: 'pawa_o',
                stop_name: 'Park at Watts (Pixar)',
                lat: '37.8319',
                lng: '-122.2827'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8269',
                lng: '-122.2668',
                shape_pt_sequence: 4,
                shape_dist_traveled: 330.639150091779
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8269',
                lng: '-122.2669',
                shape_pt_sequence: 5,
                shape_dist_traveled: 346.992923170735
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8272',
                lng: '-122.2691',
                shape_pt_sequence: 6,
                shape_dist_traveled: 541.35247873652
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8280',
                lng: '-122.2741',
                shape_pt_sequence: 7,
                shape_dist_traveled: 992.424723284937
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8282',
                lng: '-122.2744',
                shape_pt_sequence: 8,
                shape_dist_traveled: 1024.94882490274
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 4,
                id: 1300662,
                stop_id: 'ho45_o',
                stop_name: 'Hollis at 45th',
                lat: '37.8332',
                lng: '-122.2864'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8306',
                lng: '-122.2739',
                shape_pt_sequence: 9,
                shape_dist_traveled: 1297.72743796975
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8307',
                lng: '-122.2740',
                shape_pt_sequence: 10,
                shape_dist_traveled: 1317.10537784042
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8311',
                lng: '-122.2766',
                shape_pt_sequence: 11,
                shape_dist_traveled: 1543.49377910955
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8314',
                lng: '-122.2781',
                shape_pt_sequence: 12,
                shape_dist_traveled: 1683.51657093779
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8313',
                lng: '-122.2785',
                shape_pt_sequence: 13,
                shape_dist_traveled: 1713.45943201622
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8311',
                lng: '-122.2795',
                shape_pt_sequence: 14,
                shape_dist_traveled: 1809.4369482424
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8312',
                lng: '-122.2798',
                shape_pt_sequence: 15,
                shape_dist_traveled: 1835.98610285487
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8322',
                lng: '-122.2802',
                shape_pt_sequence: 16,
                shape_dist_traveled: 1955.52889360502
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8323',
                lng: '-122.2805',
                shape_pt_sequence: 17,
                shape_dist_traveled: 1981.85688716198
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8323',
                lng: '-122.2807',
                shape_pt_sequence: 18,
                shape_dist_traveled: 2000.28523573265
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8319',
                lng: '-122.2827',
                shape_pt_sequence: 19,
                shape_dist_traveled: 2179.74214132603
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8312',
                lng: '-122.2856',
                shape_pt_sequence: 20,
                shape_dist_traveled: 2446.70462477123
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8313',
                lng: '-122.2858',
                shape_pt_sequence: 21,
                shape_dist_traveled: 2464.84395265793
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8332',
                lng: '-122.2864',
                shape_pt_sequence: 22,
                shape_dist_traveled: 2681.77774410768
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 5,
                id: 1300685,
                stop_id: 'ho53_o',
                stop_name: 'Hollis at 53rd',
                lat: '37.8362',
                lng: '-122.2876'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8362',
                lng: '-122.2876',
                shape_pt_sequence: 23,
                shape_dist_traveled: 3029.26950629333
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8371',
                lng: '-122.2880',
                shape_pt_sequence: 24,
                shape_dist_traveled: 3137.6438361722
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8383',
                lng: '-122.2887',
                shape_pt_sequence: 25,
                shape_dist_traveled: 3290.01173805234
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8384',
                lng: '-122.2890',
                shape_pt_sequence: 26,
                shape_dist_traveled: 3309.45876033304
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8382',
                lng: '-122.2894',
                shape_pt_sequence: 27,
                shape_dist_traveled: 3354.26895345848
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 6,
                id: 1300680,
                stop_id: 'stho_o',
                stop_name: 'Stanford at Horton (Emery Station)',
                lat: '37.8376',
                lng: '-122.2900'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8376',
                lng: '-122.2900',
                shape_pt_sequence: 28,
                shape_dist_traveled: 3435.86723864096
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 7,
                id: 1300676,
                stop_id: 'es_o',
                stop_name: 'Amtrak Station',
                lat: '37.8407',
                lng: '-122.2913'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8376',
                lng: '-122.2900',
                shape_pt_sequence: 29,
                shape_dist_traveled: 3440.08735708244
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8377',
                lng: '-122.2903',
                shape_pt_sequence: 30,
                shape_dist_traveled: 3467.55810869762
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8407',
                lng: '-122.2913',
                shape_pt_sequence: 31,
                shape_dist_traveled: 3818.31510093848
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8409',
                lng: '-122.2912',
                shape_pt_sequence: 32,
                shape_dist_traveled: 3839.83403580134
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8412',
                lng: '-122.2898',
                shape_pt_sequence: 33,
                shape_dist_traveled: 3969.50523543673
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8413',
                lng: '-122.2897',
                shape_pt_sequence: 34,
                shape_dist_traveled: 3986.84720200116
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 8,
                id: 1300689,
                stop_id: 'ho59_o',
                stop_name: 'Hollis at 59th',
                lat: '37.8416',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8416',
                lng: '-122.2897',
                shape_pt_sequence: 35,
                shape_dist_traveled: 4015.28238120342
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 9,
                id: 1300702,
                stop_id: 'ho64_o',
                stop_name: 'Hollis at 64th',
                lat: '37.8450',
                lng: '-122.2908'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8450',
                lng: '-122.2908',
                shape_pt_sequence: 36,
                shape_dist_traveled: 4409.40066146477
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 10,
                id: 1300669,
                stop_id: 'ho65_o',
                stop_name: 'Hollis at 65th',
                lat: '37.8468',
                lng: '-122.2914'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8468',
                lng: '-122.2914',
                shape_pt_sequence: 37,
                shape_dist_traveled: 4619.59714698666
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8493',
                lng: '-122.2922',
                shape_pt_sequence: 38,
                shape_dist_traveled: 4904.38464088082
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8497',
                lng: '-122.2921',
                shape_pt_sequence: 39,
                shape_dist_traveled: 4944.94224120347
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8499',
                lng: '-122.2910',
                shape_pt_sequence: 40,
                shape_dist_traveled: 5045.99019313928
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8502',
                lng: '-122.2907',
                shape_pt_sequence: 41,
                shape_dist_traveled: 5082.28966157428
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8511',
                lng: '-122.2910',
                shape_pt_sequence: 42,
                shape_dist_traveled: 5192.53821385625
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 11,
                id: 1300693,
                stop_id: 'bbowl_i',
                stop_name: 'Berkeley Bowl West',
                lat: '37.8525',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8521',
                lng: '-122.2914',
                shape_pt_sequence: 43,
                shape_dist_traveled: 5306.00089779036
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8522',
                lng: '-122.2913',
                shape_pt_sequence: 44,
                shape_dist_traveled: 5317.95561300719
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8525',
                lng: '-122.2897',
                shape_pt_sequence: 45,
                shape_dist_traveled: 5461.16873264778
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8524',
                lng: '-122.2897',
                shape_pt_sequence: 46,
                shape_dist_traveled: 5472.41675594397
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8520',
                lng: '-122.2895',
                shape_pt_sequence: 47,
                shape_dist_traveled: 5530.07482288556
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8518',
                lng: '-122.2896',
                shape_pt_sequence: 48,
                shape_dist_traveled: 5544.7656195813
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8515',
                lng: '-122.2911',
                shape_pt_sequence: 49,
                shape_dist_traveled: 5687.41172635356
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8514',
                lng: '-122.2912',
                shape_pt_sequence: 50,
                shape_dist_traveled: 5703.48325772716
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8502',
                lng: '-122.2909',
                shape_pt_sequence: 51,
                shape_dist_traveled: 5841.49409657093
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8500',
                lng: '-122.2909',
                shape_pt_sequence: 52,
                shape_dist_traveled: 5860.96128133208
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8498',
                lng: '-122.2920',
                shape_pt_sequence: 53,
                shape_dist_traveled: 5956.06456050414
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8496',
                lng: '-122.2923',
                shape_pt_sequence: 54,
                shape_dist_traveled: 5992.66087816967
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8494',
                lng: '-122.2923',
                shape_pt_sequence: 55,
                shape_dist_traveled: 6013.86079843392
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8479',
                lng: '-122.2919',
                shape_pt_sequence: 56,
                shape_dist_traveled: 6186.76239565869
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8478',
                lng: '-122.2916',
                shape_pt_sequence: 57,
                shape_dist_traveled: 6215.01105643626
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8483',
                lng: '-122.2888',
                shape_pt_sequence: 58,
                shape_dist_traveled: 6462.97431497151
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8483',
                lng: '-122.2886',
                shape_pt_sequence: 59,
                shape_dist_traveled: 6480.57024504992
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 12,
                id: 1300697,
                stop_id: 'vall66_i',
                stop_name: 'Vallejo at 66th',
                lat: '37.8475',
                lng: '-122.2884'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8475',
                lng: '-122.2884',
                shape_pt_sequence: 60,
                shape_dist_traveled: 6572.23993050853
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 13,
                id: 1300660,
                stop_id: '65ho_i',
                stop_name: '65th at Hollis',
                lat: '37.8465',
                lng: '-122.2914'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8475',
                lng: '-122.2884',
                shape_pt_sequence: 61,
                shape_dist_traveled: 6573.27459938229
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8474',
                lng: '-122.2884',
                shape_pt_sequence: 62,
                shape_dist_traveled: 6588.66005816833
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 14,
                id: 1300684,
                stop_id: 'ho64_i',
                stop_name: 'Hollis at 63rd',
                lat: '37.8437',
                lng: '-122.2905'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8468',
                lng: '-122.2912',
                shape_pt_sequence: 63,
                shape_dist_traveled: 6842.00713508949
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8467',
                lng: '-122.2915',
                shape_pt_sequence: 64,
                shape_dist_traveled: 6867.50598544329
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8465',
                lng: '-122.2914',
                shape_pt_sequence: 65,
                shape_dist_traveled: 6883.2028998358
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8449',
                lng: '-122.2909',
                shape_pt_sequence: 66,
                shape_dist_traveled: 7075.55033019117
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8437',
                lng: '-122.2905',
                shape_pt_sequence: 67,
                shape_dist_traveled: 7214.84266811456
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8431',
                lng: '-122.2903',
                shape_pt_sequence: 68,
                shape_dist_traveled: 7276.50978455918
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 15,
                id: 1300682,
                stop_id: 'ho59_i',
                stop_name: 'Hollis at 59th (Emery Station)',
                lat: '37.8410',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8410',
                lng: '-122.2897',
                shape_pt_sequence: 69,
                shape_dist_traveled: 7522.55558800831
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8383',
                lng: '-122.2888',
                shape_pt_sequence: 70,
                shape_dist_traveled: 7827.11143936746
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8375',
                lng: '-122.2883',
                shape_pt_sequence: 71,
                shape_dist_traveled: 7932.85626586534
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 16,
                id: 1300701,
                stop_id: 'ho53_i',
                stop_name: 'Hollis at 53rd',
                lat: '37.8357',
                lng: '-122.2875'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8357',
                lng: '-122.2875',
                shape_pt_sequence: 72,
                shape_dist_traveled: 8135.34856534924
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8349',
                lng: '-122.2872',
                shape_pt_sequence: 73,
                shape_dist_traveled: 8232.62418339458
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 17,
                id: 1300672,
                stop_id: 'ho45_i',
                stop_name: 'Hollis at 45th',
                lat: '37.8331',
                lng: '-122.2865'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8331',
                lng: '-122.2865',
                shape_pt_sequence: 74,
                shape_dist_traveled: 8438.81677453063
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8312',
                lng: '-122.2858',
                shape_pt_sequence: 75,
                shape_dist_traveled: 8660.74475940419
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8311',
                lng: '-122.2855',
                shape_pt_sequence: 76,
                shape_dist_traveled: 8687.3766228254
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 18,
                id: 1300696,
                stop_id: 'pix_i',
                stop_name: 'Park at Watts (Pixar)',
                lat: '37.8317',
                lng: '-122.2827'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8317',
                lng: '-122.2827',
                shape_pt_sequence: 77,
                shape_dist_traveled: 8946.97934546599
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8319',
                lng: '-122.2816',
                shape_pt_sequence: 78,
                shape_dist_traveled: 9043.54607663172
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8319',
                lng: '-122.2814',
                shape_pt_sequence: 79,
                shape_dist_traveled: 9064.37614043648
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 19,
                id: 1300675,
                stop_id: 'em40_i',
                stop_name: 'Emery at 40th',
                lat: '37.8309',
                lng: '-122.2811'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8309',
                lng: '-122.2811',
                shape_pt_sequence: 80,
                shape_dist_traveled: 9172.16904711348
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8307',
                lng: '-122.2809',
                shape_pt_sequence: 81,
                shape_dist_traveled: 9201.7829706601
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8312',
                lng: '-122.2785',
                shape_pt_sequence: 82,
                shape_dist_traveled: 9422.60252225989
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8312',
                lng: '-122.2782',
                shape_pt_sequence: 83,
                shape_dist_traveled: 9450.18893157204
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8308',
                lng: '-122.2757',
                shape_pt_sequence: 84,
                shape_dist_traveled: 9668.41735173278
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8303',
                lng: '-122.2724',
                shape_pt_sequence: 85,
                shape_dist_traveled: 9963.08995580818
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8297',
                lng: '-122.2688',
                shape_pt_sequence: 86,
                shape_dist_traveled: 10292.4441411196
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 20,
                id: 1300667,
                stop_id: 'bartw_i',
                stop_name: 'MacArthur Bart Station',
                lat: '37.8295',
                lng: '-122.2675'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'sun',
                lat: '37.8295',
                lng: '-122.2675',
                shape_pt_sequence: 87,
                shape_dist_traveled: 10404.0621410399
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'sun',
                stop_sequence: 21,
                id: 1300690,
                stop_id: 'barta_i',
                stop_name: 'MacArthur Bart Station (Hidden Arrival)',
                lat: '37.8294',
                lng: '-122.2669'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8294',
                lng: '-122.2668',
                shape_pt_sequence: 1,
                shape_dist_traveled: 0
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 1,
                id: 1300661,
                stop_id: 'bart_o',
                stop_name: 'MacArthur BART Station',
                lat: '37.8285',
                lng: '-122.2663'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8293',
                lng: '-122.2661',
                shape_pt_sequence: 2,
                shape_dist_traveled: 62.5677783897081
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 2,
                id: 1300700,
                stop_id: 'ihop_o',
                stop_name: 'IHOP',
                lat: '37.8323',
                lng: '-122.2807'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8285',
                lng: '-122.2663',
                shape_pt_sequence: 3,
                shape_dist_traveled: 148.882258091906
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 3,
                id: 1300695,
                stop_id: 'pawa_o',
                stop_name: 'Park at Watts (Pixar)',
                lat: '37.8319',
                lng: '-122.2827'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8269',
                lng: '-122.2668',
                shape_pt_sequence: 4,
                shape_dist_traveled: 330.639150091779
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8269',
                lng: '-122.2669',
                shape_pt_sequence: 5,
                shape_dist_traveled: 346.992923170735
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8272',
                lng: '-122.2691',
                shape_pt_sequence: 6,
                shape_dist_traveled: 541.35247873652
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8280',
                lng: '-122.2741',
                shape_pt_sequence: 7,
                shape_dist_traveled: 992.424723284937
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8282',
                lng: '-122.2744',
                shape_pt_sequence: 8,
                shape_dist_traveled: 1024.94882490274
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 4,
                id: 1300662,
                stop_id: 'ho45_o',
                stop_name: 'Hollis at 45th',
                lat: '37.8332',
                lng: '-122.2864'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8306',
                lng: '-122.2739',
                shape_pt_sequence: 9,
                shape_dist_traveled: 1297.72743796975
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8307',
                lng: '-122.2740',
                shape_pt_sequence: 10,
                shape_dist_traveled: 1317.10537784042
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8311',
                lng: '-122.2766',
                shape_pt_sequence: 11,
                shape_dist_traveled: 1543.49377910955
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8314',
                lng: '-122.2781',
                shape_pt_sequence: 12,
                shape_dist_traveled: 1683.51657093779
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8313',
                lng: '-122.2785',
                shape_pt_sequence: 13,
                shape_dist_traveled: 1713.45943201622
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8311',
                lng: '-122.2795',
                shape_pt_sequence: 14,
                shape_dist_traveled: 1809.4369482424
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8312',
                lng: '-122.2798',
                shape_pt_sequence: 15,
                shape_dist_traveled: 1835.98610285487
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8322',
                lng: '-122.2802',
                shape_pt_sequence: 16,
                shape_dist_traveled: 1955.52889360502
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8323',
                lng: '-122.2805',
                shape_pt_sequence: 17,
                shape_dist_traveled: 1981.85688716198
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8323',
                lng: '-122.2807',
                shape_pt_sequence: 18,
                shape_dist_traveled: 2000.28523573265
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8319',
                lng: '-122.2827',
                shape_pt_sequence: 19,
                shape_dist_traveled: 2179.74214132603
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8312',
                lng: '-122.2856',
                shape_pt_sequence: 20,
                shape_dist_traveled: 2446.70462477123
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8313',
                lng: '-122.2858',
                shape_pt_sequence: 21,
                shape_dist_traveled: 2464.84395265793
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8332',
                lng: '-122.2864',
                shape_pt_sequence: 22,
                shape_dist_traveled: 2681.77774410768
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 5,
                id: 1300685,
                stop_id: 'ho53_o',
                stop_name: 'Hollis at 53rd',
                lat: '37.8362',
                lng: '-122.2876'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8362',
                lng: '-122.2876',
                shape_pt_sequence: 23,
                shape_dist_traveled: 3029.26950629333
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8371',
                lng: '-122.2880',
                shape_pt_sequence: 24,
                shape_dist_traveled: 3137.6438361722
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8383',
                lng: '-122.2887',
                shape_pt_sequence: 25,
                shape_dist_traveled: 3290.01173805234
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8384',
                lng: '-122.2890',
                shape_pt_sequence: 26,
                shape_dist_traveled: 3309.45876033304
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8382',
                lng: '-122.2894',
                shape_pt_sequence: 27,
                shape_dist_traveled: 3354.26895345848
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 6,
                id: 1300680,
                stop_id: 'stho_o',
                stop_name: 'Stanford at Horton (Emery Station)',
                lat: '37.8376',
                lng: '-122.2900'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8376',
                lng: '-122.2900',
                shape_pt_sequence: 28,
                shape_dist_traveled: 3435.86723864096
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 7,
                id: 1300676,
                stop_id: 'es_o',
                stop_name: 'Amtrak Station',
                lat: '37.8407',
                lng: '-122.2913'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8376',
                lng: '-122.2900',
                shape_pt_sequence: 29,
                shape_dist_traveled: 3440.08735708244
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8377',
                lng: '-122.2903',
                shape_pt_sequence: 30,
                shape_dist_traveled: 3467.55810869762
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8407',
                lng: '-122.2913',
                shape_pt_sequence: 31,
                shape_dist_traveled: 3818.31510093848
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8409',
                lng: '-122.2912',
                shape_pt_sequence: 32,
                shape_dist_traveled: 3839.83403580134
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8412',
                lng: '-122.2898',
                shape_pt_sequence: 33,
                shape_dist_traveled: 3969.50523543673
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8413',
                lng: '-122.2897',
                shape_pt_sequence: 34,
                shape_dist_traveled: 3986.84720200116
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 8,
                id: 1300689,
                stop_id: 'ho59_o',
                stop_name: 'Hollis at 59th',
                lat: '37.8416',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8416',
                lng: '-122.2897',
                shape_pt_sequence: 35,
                shape_dist_traveled: 4015.28238120342
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 9,
                id: 1300702,
                stop_id: 'ho64_o',
                stop_name: 'Hollis at 64th',
                lat: '37.8450',
                lng: '-122.2908'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8450',
                lng: '-122.2908',
                shape_pt_sequence: 36,
                shape_dist_traveled: 4409.40066146477
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 10,
                id: 1300669,
                stop_id: 'ho65_o',
                stop_name: 'Hollis at 65th',
                lat: '37.8468',
                lng: '-122.2914'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8468',
                lng: '-122.2914',
                shape_pt_sequence: 37,
                shape_dist_traveled: 4619.59714698666
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8493',
                lng: '-122.2922',
                shape_pt_sequence: 38,
                shape_dist_traveled: 4904.38464088082
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8497',
                lng: '-122.2921',
                shape_pt_sequence: 39,
                shape_dist_traveled: 4944.94224120347
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8499',
                lng: '-122.2910',
                shape_pt_sequence: 40,
                shape_dist_traveled: 5045.99019313928
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8502',
                lng: '-122.2907',
                shape_pt_sequence: 41,
                shape_dist_traveled: 5082.28966157428
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8511',
                lng: '-122.2910',
                shape_pt_sequence: 42,
                shape_dist_traveled: 5192.53821385625
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 11,
                id: 1300693,
                stop_id: 'bbowl_i',
                stop_name: 'Berkeley Bowl West',
                lat: '37.8525',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8521',
                lng: '-122.2914',
                shape_pt_sequence: 43,
                shape_dist_traveled: 5306.00089779036
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8522',
                lng: '-122.2913',
                shape_pt_sequence: 44,
                shape_dist_traveled: 5317.95561300719
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8525',
                lng: '-122.2897',
                shape_pt_sequence: 45,
                shape_dist_traveled: 5461.16873264778
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8524',
                lng: '-122.2897',
                shape_pt_sequence: 46,
                shape_dist_traveled: 5472.41675594397
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8520',
                lng: '-122.2895',
                shape_pt_sequence: 47,
                shape_dist_traveled: 5530.07482288556
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8518',
                lng: '-122.2896',
                shape_pt_sequence: 48,
                shape_dist_traveled: 5544.7656195813
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8515',
                lng: '-122.2911',
                shape_pt_sequence: 49,
                shape_dist_traveled: 5687.41172635356
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8514',
                lng: '-122.2912',
                shape_pt_sequence: 50,
                shape_dist_traveled: 5703.48325772716
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8502',
                lng: '-122.2909',
                shape_pt_sequence: 51,
                shape_dist_traveled: 5841.49409657093
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8500',
                lng: '-122.2909',
                shape_pt_sequence: 52,
                shape_dist_traveled: 5860.96128133208
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8498',
                lng: '-122.2920',
                shape_pt_sequence: 53,
                shape_dist_traveled: 5956.06456050414
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8496',
                lng: '-122.2923',
                shape_pt_sequence: 54,
                shape_dist_traveled: 5992.66087816967
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8494',
                lng: '-122.2923',
                shape_pt_sequence: 55,
                shape_dist_traveled: 6013.86079843392
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8479',
                lng: '-122.2919',
                shape_pt_sequence: 56,
                shape_dist_traveled: 6186.76239565869
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8478',
                lng: '-122.2916',
                shape_pt_sequence: 57,
                shape_dist_traveled: 6215.01105643626
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8483',
                lng: '-122.2888',
                shape_pt_sequence: 58,
                shape_dist_traveled: 6462.97431497151
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8483',
                lng: '-122.2886',
                shape_pt_sequence: 59,
                shape_dist_traveled: 6480.57024504992
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 12,
                id: 1300697,
                stop_id: 'vall66_i',
                stop_name: 'Vallejo at 66th',
                lat: '37.8475',
                lng: '-122.2884'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8475',
                lng: '-122.2884',
                shape_pt_sequence: 60,
                shape_dist_traveled: 6572.23993050853
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 13,
                id: 1300660,
                stop_id: '65ho_i',
                stop_name: '65th at Hollis',
                lat: '37.8465',
                lng: '-122.2914'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8475',
                lng: '-122.2884',
                shape_pt_sequence: 61,
                shape_dist_traveled: 6573.27459938229
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8474',
                lng: '-122.2884',
                shape_pt_sequence: 62,
                shape_dist_traveled: 6588.66005816833
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 14,
                id: 1300684,
                stop_id: 'ho64_i',
                stop_name: 'Hollis at 63rd',
                lat: '37.8437',
                lng: '-122.2905'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8468',
                lng: '-122.2912',
                shape_pt_sequence: 63,
                shape_dist_traveled: 6842.00713508949
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8467',
                lng: '-122.2915',
                shape_pt_sequence: 64,
                shape_dist_traveled: 6867.50598544329
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8465',
                lng: '-122.2914',
                shape_pt_sequence: 65,
                shape_dist_traveled: 6883.2028998358
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8449',
                lng: '-122.2909',
                shape_pt_sequence: 66,
                shape_dist_traveled: 7075.55033019117
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8437',
                lng: '-122.2905',
                shape_pt_sequence: 67,
                shape_dist_traveled: 7214.84266811456
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8431',
                lng: '-122.2903',
                shape_pt_sequence: 68,
                shape_dist_traveled: 7276.50978455918
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 15,
                id: 1300682,
                stop_id: 'ho59_i',
                stop_name: 'Hollis at 59th (Emery Station)',
                lat: '37.8410',
                lng: '-122.2897'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8410',
                lng: '-122.2897',
                shape_pt_sequence: 69,
                shape_dist_traveled: 7522.55558800831
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8383',
                lng: '-122.2888',
                shape_pt_sequence: 70,
                shape_dist_traveled: 7827.11143936746
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8375',
                lng: '-122.2883',
                shape_pt_sequence: 71,
                shape_dist_traveled: 7932.85626586534
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 16,
                id: 1300701,
                stop_id: 'ho53_i',
                stop_name: 'Hollis at 53rd',
                lat: '37.8357',
                lng: '-122.2875'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8357',
                lng: '-122.2875',
                shape_pt_sequence: 72,
                shape_dist_traveled: 8135.34856534924
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8349',
                lng: '-122.2872',
                shape_pt_sequence: 73,
                shape_dist_traveled: 8232.62418339458
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 17,
                id: 1300672,
                stop_id: 'ho45_i',
                stop_name: 'Hollis at 45th',
                lat: '37.8331',
                lng: '-122.2865'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8331',
                lng: '-122.2865',
                shape_pt_sequence: 74,
                shape_dist_traveled: 8438.81677453063
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8312',
                lng: '-122.2858',
                shape_pt_sequence: 75,
                shape_dist_traveled: 8660.74475940419
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8311',
                lng: '-122.2855',
                shape_pt_sequence: 76,
                shape_dist_traveled: 8687.3766228254
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 18,
                id: 1300696,
                stop_id: 'pix_i',
                stop_name: 'Park at Watts (Pixar)',
                lat: '37.8317',
                lng: '-122.2827'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8317',
                lng: '-122.2827',
                shape_pt_sequence: 77,
                shape_dist_traveled: 8946.97934546599
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8319',
                lng: '-122.2816',
                shape_pt_sequence: 78,
                shape_dist_traveled: 9043.54607663172
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8319',
                lng: '-122.2814',
                shape_pt_sequence: 79,
                shape_dist_traveled: 9064.37614043648
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 19,
                id: 1300675,
                stop_id: 'em40_i',
                stop_name: 'Emery at 40th',
                lat: '37.8309',
                lng: '-122.2811'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8309',
                lng: '-122.2811',
                shape_pt_sequence: 80,
                shape_dist_traveled: 9172.16904711348
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8307',
                lng: '-122.2809',
                shape_pt_sequence: 81,
                shape_dist_traveled: 9201.7829706601
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8312',
                lng: '-122.2785',
                shape_pt_sequence: 82,
                shape_dist_traveled: 9422.60252225989
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8312',
                lng: '-122.2782',
                shape_pt_sequence: 83,
                shape_dist_traveled: 9450.18893157204
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8308',
                lng: '-122.2757',
                shape_pt_sequence: 84,
                shape_dist_traveled: 9668.41735173278
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8303',
                lng: '-122.2724',
                shape_pt_sequence: 85,
                shape_dist_traveled: 9963.08995580818
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8297',
                lng: '-122.2688',
                shape_pt_sequence: 86,
                shape_dist_traveled: 10292.4441411196
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 20,
                id: 1300667,
                stop_id: 'bartw_i',
                stop_name: 'MacArthur Bart Station',
                lat: '37.8295',
                lng: '-122.2675'
            }
            , {
                trip_headsign: 'Loop',
                shape_id: 179210,
                service_id: 'wkd',
                lat: '37.8295',
                lng: '-122.2675',
                shape_pt_sequence: 87,
                shape_dist_traveled: 10404.0621410399
            }
            , {
                trip_headsign: 'Loop',
                service_id: 'wkd',
                stop_sequence: 21,
                id: 1300690,
                stop_id: 'barta_i',
                stop_name: 'MacArthur Bart Station (Hidden Arrival)',
                lat: '37.8294',
                lng: '-122.2669'
            }];
        var obj = {};
        for (var i = 0; i < array.length; i++) {
            console.log(array[i]);

       

            $scope.markers['x' + i] =

                {
                    lat: array[i].lat * 1,
                    lng: array[i].lng * 1,
                    message: array[i].stop_id ? array[i].stop_id : 'point ' + array[i].shape_pt_sequence
                };


        }


    };


}]);