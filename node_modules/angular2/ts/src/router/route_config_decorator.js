System.register(['./route_config_impl', 'angular2/src/core/util/decorators'], function(exports_1) {
    var route_config_impl_1, decorators_1;
    var RouteConfig;
    return {
        setters:[
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
                exports_1({
                    "Route": route_config_impl_1_1["Route"],
                    "Redirect": route_config_impl_1_1["Redirect"],
                    "AuxRoute": route_config_impl_1_1["AuxRoute"],
                    "AsyncRoute": route_config_impl_1_1["AsyncRoute"],
                    "RouteDefinition": route_config_impl_1_1["RouteDefinition"]
                });
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }],
        execute: function() {
            RouteConfig = decorators_1.makeDecorator(route_config_impl_1.RouteConfig);
        }
    }
});
//# sourceMappingURL=route_config_decorator.js.map