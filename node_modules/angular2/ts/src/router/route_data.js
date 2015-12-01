System.register(['angular2/angular2', 'angular2/src/core/facade/lang'], function(exports_1) {
    var angular2_1, lang_1;
    var ROUTE_DATA;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            ROUTE_DATA = lang_1.CONST_EXPR(new angular2_1.OpaqueToken('routeData'));
        }
    }
});
//# sourceMappingURL=route_data.js.map