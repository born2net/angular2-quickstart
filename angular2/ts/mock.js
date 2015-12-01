System.register(['./src/mock/mock_location_strategy', './src/router/location_strategy', 'angular2/src/mock/view_resolver_mock', 'angular2/src/core/compiler/xhr_mock'], function(exports_1) {
    var exportedNames_1 = {
        'LocationStrategy': true,
        'MockViewResolver': true,
        'MockXHR': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (mock_location_strategy_1_1) {
                exportStar_1(mock_location_strategy_1_1);
            },
            function (location_strategy_1_1) {
                exports_1({
                    "LocationStrategy": location_strategy_1_1["LocationStrategy"]
                });
            },
            function (view_resolver_mock_1_1) {
                exports_1({
                    "MockViewResolver": view_resolver_mock_1_1["MockViewResolver"]
                });
            },
            function (xhr_mock_1_1) {
                exports_1({
                    "MockXHR": xhr_mock_1_1["MockXHR"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=mock.js.map