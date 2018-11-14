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
        var array =     [
            {
                trip_headsign: "to BART Station",
                service_id: "wkd",
                stop_sequence: 6,
                id: 1300690,
                stop_id: "barta_i",
                stop_name: "MacArthur Bart Station (Hidden Arrival)",
                lat: "37.8294",
                lng: "-122.2669"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8370",
                lng: "-122.3033",
                shape_pt_sequence: 1,
                shape_dist_traveled: 0
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8294",
                lng: "-122.2669",
                shape_pt_sequence: 2,
                shape_dist_traveled: 0.452961635681712
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8370",
                lng: "-122.3018",
                shape_pt_sequence: 2,
                shape_dist_traveled: 132.608757815641
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8293",
                lng: "-122.2661",
                shape_pt_sequence: 3,
                shape_dist_traveled: 76.795014258027
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8371",
                lng: "-122.3008",
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
                lng: "-122.2663"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8373",
                lng: "-122.2999",
                shape_pt_sequence: 4,
                shape_dist_traveled: 299.943245286215
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8293",
                lng: "-122.2663",
                shape_pt_sequence: 5,
                shape_dist_traveled: 254.357115216999
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8375",
                lng: "-122.2999",
                shape_pt_sequence: 5,
                shape_dist_traveled: 322.797923055595
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8293",
                lng: "-122.2661",
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
                lng: "-122.3002"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8285",
                lng: "-122.2663",
                shape_pt_sequence: 7,
                shape_dist_traveled: 362.78060484718
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8390",
                lng: "-122.3006",
                shape_pt_sequence: 7,
                shape_dist_traveled: 497.298016821089
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8269",
                lng: "-122.2668",
                shape_pt_sequence: 8,
                shape_dist_traveled: 544.537496847053
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8392",
                lng: "-122.3005",
                shape_pt_sequence: 8,
                shape_dist_traveled: 524.550182857754
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8269",
                lng: "-122.2669",
                shape_pt_sequence: 9,
                shape_dist_traveled: 560.891269926009
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8394",
                lng: "-122.2995",
                shape_pt_sequence: 9,
                shape_dist_traveled: 616.57893755783
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8272",
                lng: "-122.2691",
                shape_pt_sequence: 10,
                shape_dist_traveled: 755.250825491794
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8395",
                lng: "-122.2989",
                shape_pt_sequence: 10,
                shape_dist_traveled: 667.62756519425
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8280",
                lng: "-122.2741",
                shape_pt_sequence: 11,
                shape_dist_traveled: 1204.59940576643
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8398",
                lng: "-122.2984",
                shape_pt_sequence: 11,
                shape_dist_traveled: 720.739251038632
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8282",
                lng: "-122.2760",
                shape_pt_sequence: 12,
                shape_dist_traveled: 1368.59579849389
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8399",
                lng: "-122.2979",
                shape_pt_sequence: 12,
                shape_dist_traveled: 769.155599892259
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8285",
                lng: "-122.2778",
                shape_pt_sequence: 13,
                shape_dist_traveled: 1529.97600284697
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8398",
                lng: "-122.2974",
                shape_pt_sequence: 13,
                shape_dist_traveled: 815.300423154383
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8285",
                lng: "-122.2787",
                shape_pt_sequence: 14,
                shape_dist_traveled: 1611.84448670129
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8395",
                lng: "-122.2971",
                shape_pt_sequence: 14,
                shape_dist_traveled: 862.353204249436
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8285",
                lng: "-122.2793",
                shape_pt_sequence: 15,
                shape_dist_traveled: 1667.22041152013
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8384",
                lng: "-122.2969",
                shape_pt_sequence: 15,
                shape_dist_traveled: 984.595051938668
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8284",
                lng: "-122.2804",
                shape_pt_sequence: 16,
                shape_dist_traveled: 1762.13837690745
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8374",
                lng: "-122.2966",
                shape_pt_sequence: 16,
                shape_dist_traveled: 1093.05434737481
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8282",
                lng: "-122.2811",
                shape_pt_sequence: 17,
                shape_dist_traveled: 1821.31079943342
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8363",
                lng: "-122.2961",
                shape_pt_sequence: 17,
                shape_dist_traveled: 1223.98056427184
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8279",
                lng: "-122.2822",
                shape_pt_sequence: 18,
                shape_dist_traveled: 1927.1226700339
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8358",
                lng: "-122.2959",
                shape_pt_sequence: 18,
                shape_dist_traveled: 1280.66643776654
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8278",
                lng: "-122.2830",
                shape_pt_sequence: 19,
                shape_dist_traveled: 1997.77832151702
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8347",
                lng: "-122.2953",
                shape_pt_sequence: 19,
                shape_dist_traveled: 1421.22973355816
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8275",
                lng: "-122.2841",
                shape_pt_sequence: 20,
                shape_dist_traveled: 2099.70186169105
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8326",
                lng: "-122.2943",
                shape_pt_sequence: 20,
                shape_dist_traveled: 1673.26688406506
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8272",
                lng: "-122.2853",
                shape_pt_sequence: 21,
                shape_dist_traveled: 2213.26383536931
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8318",
                lng: "-122.2940",
                shape_pt_sequence: 21,
                shape_dist_traveled: 1755.69949801115
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8267",
                lng: "-122.2870",
                shape_pt_sequence: 22,
                shape_dist_traveled: 2369.07043012564
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8309",
                lng: "-122.2938",
                shape_pt_sequence: 22,
                shape_dist_traveled: 1857.15668947793
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8267",
                lng: "-122.2881",
                shape_pt_sequence: 23,
                shape_dist_traveled: 2464.1606549472
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8303",
                lng: "-122.2938",
                shape_pt_sequence: 23,
                shape_dist_traveled: 1933.88632363909
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8268",
                lng: "-122.2890",
                shape_pt_sequence: 24,
                shape_dist_traveled: 2544.51805717315
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8292",
                lng: "-122.2939",
                shape_pt_sequence: 24,
                shape_dist_traveled: 2054.18237370308
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8271",
                lng: "-122.2901",
                shape_pt_sequence: 25,
                shape_dist_traveled: 2652.07331986316
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8288",
                lng: "-122.2938",
                shape_pt_sequence: 25,
                shape_dist_traveled: 2093.72980289362
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8275",
                lng: "-122.2913",
                shape_pt_sequence: 26,
                shape_dist_traveled: 2763.6899235296
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8282",
                lng: "-122.2934",
                shape_pt_sequence: 26,
                shape_dist_traveled: 2175.27850221627
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8278",
                lng: "-122.2919",
                shape_pt_sequence: 27,
                shape_dist_traveled: 2823.39164375751
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8278",
                lng: "-122.2929",
                shape_pt_sequence: 27,
                shape_dist_traveled: 2234.05342939495
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8283",
                lng: "-122.2926",
                shape_pt_sequence: 28,
                shape_dist_traveled: 2910.26249444199
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8269",
                lng: "-122.2912",
                shape_pt_sequence: 28,
                shape_dist_traveled: 2409.44553961671
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8289",
                lng: "-122.2931",
                shape_pt_sequence: 29,
                shape_dist_traveled: 2986.85256546271
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8265",
                lng: "-122.2903",
                shape_pt_sequence: 29,
                shape_dist_traveled: 2499.85235691213
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8294",
                lng: "-122.2933",
                shape_pt_sequence: 30,
                shape_dist_traveled: 3043.58525055133
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2896",
                shape_pt_sequence: 30,
                shape_dist_traveled: 2568.19402467877
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8298",
                lng: "-122.2933",
                shape_pt_sequence: 31,
                shape_dist_traveled: 3087.27032182383
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2888",
                shape_pt_sequence: 31,
                shape_dist_traveled: 2640.76191508636
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8313",
                lng: "-122.2932",
                shape_pt_sequence: 32,
                shape_dist_traveled: 3254.34249183792
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2882",
                shape_pt_sequence: 32,
                shape_dist_traveled: 2693.45994403115
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8318",
                lng: "-122.2932",
                shape_pt_sequence: 33,
                shape_dist_traveled: 3311.07917987009
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2876",
                shape_pt_sequence: 33,
                shape_dist_traveled: 2744.30722357096
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8324",
                lng: "-122.2934",
                shape_pt_sequence: 34,
                shape_dist_traveled: 3381.43758413804
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8266",
                lng: "-122.2866",
                shape_pt_sequence: 34,
                shape_dist_traveled: 2838.0211465393
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8331",
                lng: "-122.2937",
                shape_pt_sequence: 35,
                shape_dist_traveled: 3460.68109668011
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8270",
                lng: "-122.2850",
                shape_pt_sequence: 35,
                shape_dist_traveled: 2985.62858411372
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8342",
                lng: "-122.2943",
                shape_pt_sequence: 36,
                shape_dist_traveled: 3599.66512752962
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8272",
                lng: "-122.2838",
                shape_pt_sequence: 36,
                shape_dist_traveled: 3087.55283188294
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8350",
                lng: "-122.2947",
                shape_pt_sequence: 37,
                shape_dist_traveled: 3689.19153935225
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8274",
                lng: "-122.2832",
                shape_pt_sequence: 37,
                shape_dist_traveled: 3150.5410072138
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8361",
                lng: "-122.2953",
                shape_pt_sequence: 38,
                shape_dist_traveled: 3827.96649167111
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8276",
                lng: "-122.2825",
                shape_pt_sequence: 38,
                shape_dist_traveled: 3210.70145096889
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8374",
                lng: "-122.2960",
                shape_pt_sequence: 39,
                shape_dist_traveled: 3983.7086017512
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8281",
                lng: "-122.2809",
                shape_pt_sequence: 39,
                shape_dist_traveled: 3364.84384414131
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8379",
                lng: "-122.2962",
                shape_pt_sequence: 40,
                shape_dist_traveled: 4043.16684367405
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8284",
                lng: "-122.2791",
                shape_pt_sequence: 40,
                shape_dist_traveled: 3523.38605542285
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8380",
                lng: "-122.2970",
                shape_pt_sequence: 41,
                shape_dist_traveled: 4111.45459442844
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8284",
                lng: "-122.2780",
                shape_pt_sequence: 41,
                shape_dist_traveled: 3622.656099219
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8378",
                lng: "-122.2975",
                shape_pt_sequence: 42,
                shape_dist_traveled: 4163.83110054225
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8281",
                lng: "-122.2762",
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
                lng: "-122.2984"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8278",
                lng: "-122.2739",
                shape_pt_sequence: 43,
                shape_dist_traveled: 3987.78120637817
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8372",
                lng: "-122.3008",
                shape_pt_sequence: 44,
                shape_dist_traveled: 4465.61377811
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8274",
                lng: "-122.2712",
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
                lng: "-122.3025"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8271",
                lng: "-122.2692",
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
                lng: "-122.3046"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8371",
                lng: "-122.3046",
                shape_pt_sequence: 46,
                shape_dist_traveled: 4792.81290169551
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8273",
                lng: "-122.2689",
                shape_pt_sequence: 46,
                shape_dist_traveled: 4436.24002415144
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8372",
                lng: "-122.3057",
                shape_pt_sequence: 47,
                shape_dist_traveled: 4891.61334551665
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8296",
                lng: "-122.2684",
                shape_pt_sequence: 47,
                shape_dist_traveled: 4692.30865266685
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8371",
                lng: "-122.3061",
                shape_pt_sequence: 48,
                shape_dist_traveled: 4925.05785939755
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8297",
                lng: "-122.2682",
                shape_pt_sequence: 48,
                shape_dist_traveled: 4707.6291194091
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8370",
                lng: "-122.3061",
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
                lng: "-122.2675"
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8370",
                lng: "-122.3052",
                shape_pt_sequence: 50,
                shape_dist_traveled: 5008.53054249884
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8294",
                lng: "-122.2669",
                shape_pt_sequence: 50,
                shape_dist_traveled: 4825.8959941663
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8370",
                lng: "-122.3018",
                shape_pt_sequence: 51,
                shape_dist_traveled: 5313.25653156758
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179211,
                service_id: "wkd",
                lat: "37.8294",
                lng: "-122.2669",
                shape_pt_sequence: 51,
                shape_dist_traveled: 4826.34868144025
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8371",
                lng: "-122.3008",
                shape_pt_sequence: 52,
                shape_dist_traveled: 5400.54334529519
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8373",
                lng: "-122.2999",
                shape_pt_sequence: 53,
                shape_dist_traveled: 5480.59101903815
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8375",
                lng: "-122.2999",
                shape_pt_sequence: 54,
                shape_dist_traveled: 5503.44569680753
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8381",
                lng: "-122.3002",
                shape_pt_sequence: 55,
                shape_dist_traveled: 5574.47473156701
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8390",
                lng: "-122.3006",
                shape_pt_sequence: 56,
                shape_dist_traveled: 5677.94579057303
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8392",
                lng: "-122.3005",
                shape_pt_sequence: 57,
                shape_dist_traveled: 5705.19795660969
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8394",
                lng: "-122.2995",
                shape_pt_sequence: 58,
                shape_dist_traveled: 5797.22671130977
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8395",
                lng: "-122.2989",
                shape_pt_sequence: 59,
                shape_dist_traveled: 5848.27533894619
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8398",
                lng: "-122.2984",
                shape_pt_sequence: 60,
                shape_dist_traveled: 5901.38702479057
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8399",
                lng: "-122.2979",
                shape_pt_sequence: 61,
                shape_dist_traveled: 5949.80337364419
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8398",
                lng: "-122.2974",
                shape_pt_sequence: 62,
                shape_dist_traveled: 5995.94819690632
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8395",
                lng: "-122.2971",
                shape_pt_sequence: 63,
                shape_dist_traveled: 6043.00097800137
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8384",
                lng: "-122.2969",
                shape_pt_sequence: 64,
                shape_dist_traveled: 6165.2428256906
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8374",
                lng: "-122.2966",
                shape_pt_sequence: 65,
                shape_dist_traveled: 6273.70212112674
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8363",
                lng: "-122.2961",
                shape_pt_sequence: 66,
                shape_dist_traveled: 6404.62833802378
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8358",
                lng: "-122.2959",
                shape_pt_sequence: 67,
                shape_dist_traveled: 6461.31421151848
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8347",
                lng: "-122.2953",
                shape_pt_sequence: 68,
                shape_dist_traveled: 6601.87750731009
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8326",
                lng: "-122.2943",
                shape_pt_sequence: 69,
                shape_dist_traveled: 6853.91465781699
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8318",
                lng: "-122.2940",
                shape_pt_sequence: 70,
                shape_dist_traveled: 6936.34727176308
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8309",
                lng: "-122.2938",
                shape_pt_sequence: 71,
                shape_dist_traveled: 7037.80446322987
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8303",
                lng: "-122.2938",
                shape_pt_sequence: 72,
                shape_dist_traveled: 7114.53409739102
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8292",
                lng: "-122.2939",
                shape_pt_sequence: 73,
                shape_dist_traveled: 7234.83014745502
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8288",
                lng: "-122.2938",
                shape_pt_sequence: 74,
                shape_dist_traveled: 7274.37757664556
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8282",
                lng: "-122.2934",
                shape_pt_sequence: 75,
                shape_dist_traveled: 7355.92627596821
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8278",
                lng: "-122.2929",
                shape_pt_sequence: 76,
                shape_dist_traveled: 7414.70120314689
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8269",
                lng: "-122.2912",
                shape_pt_sequence: 77,
                shape_dist_traveled: 7590.09331336864
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8265",
                lng: "-122.2903",
                shape_pt_sequence: 78,
                shape_dist_traveled: 7680.50013066406
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2896",
                shape_pt_sequence: 79,
                shape_dist_traveled: 7748.84179843071
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2888",
                shape_pt_sequence: 80,
                shape_dist_traveled: 7821.40968883829
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2882",
                shape_pt_sequence: 81,
                shape_dist_traveled: 7874.10771778309
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8263",
                lng: "-122.2876",
                shape_pt_sequence: 82,
                shape_dist_traveled: 7924.9549973229
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8266",
                lng: "-122.2866",
                shape_pt_sequence: 83,
                shape_dist_traveled: 8018.66892029123
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8270",
                lng: "-122.2850",
                shape_pt_sequence: 84,
                shape_dist_traveled: 8166.27635786565
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8272",
                lng: "-122.2838",
                shape_pt_sequence: 85,
                shape_dist_traveled: 8268.20060563488
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8274",
                lng: "-122.2832",
                shape_pt_sequence: 86,
                shape_dist_traveled: 8331.18878096574
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8276",
                lng: "-122.2825",
                shape_pt_sequence: 87,
                shape_dist_traveled: 8391.34922472083
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8281",
                lng: "-122.2809",
                shape_pt_sequence: 88,
                shape_dist_traveled: 8545.49161789325
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8284",
                lng: "-122.2791",
                shape_pt_sequence: 89,
                shape_dist_traveled: 8704.03382917478
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8284",
                lng: "-122.2780",
                shape_pt_sequence: 90,
                shape_dist_traveled: 8803.30387297094
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8281",
                lng: "-122.2762",
                shape_pt_sequence: 91,
                shape_dist_traveled: 8964.8468561648
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8278",
                lng: "-122.2739",
                shape_pt_sequence: 92,
                shape_dist_traveled: 9168.4289801301
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8274",
                lng: "-122.2712",
                shape_pt_sequence: 93,
                shape_dist_traveled: 9405.38615488178
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8271",
                lng: "-122.2692",
                shape_pt_sequence: 94,
                shape_dist_traveled: 9587.24202330366
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8273",
                lng: "-122.2689",
                shape_pt_sequence: 95,
                shape_dist_traveled: 9616.88779790338
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8296",
                lng: "-122.2684",
                shape_pt_sequence: 96,
                shape_dist_traveled: 9872.95642641879
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8297",
                lng: "-122.2682",
                shape_pt_sequence: 97,
                shape_dist_traveled: 9888.27689316104
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8295",
                lng: "-122.2675",
                shape_pt_sequence: 98,
                shape_dist_traveled: 9953.99934104179
            },
            {
                trip_headsign: "to BART Station",
                shape_id: 179208,
                service_id: "wkd",
                lat: "37.8294",
                lng: "-122.2669",
                shape_pt_sequence: 99,
                shape_dist_traveled: 10006.996455192
            }
        ];




        for (var i = 0; i < array.length; i++) {

                    console.log(array[i]);
                    $scope.markers['x' + i] =
                        {
                            lat: array[i].lat * 1,
                            lng: array[i].lng * 1,
                            draggable: false,
                            message: array[i].stop_id ? array[i].stop_id : 'point ' + array[i].shape_pt_sequence,
                            icon: {
                                type: "awesomeMarker",
                                icon: "star",
                                markerColor: array[i].stop_id ? 'red' : 'blue'
                            }
                        };
                }

    };


}]);