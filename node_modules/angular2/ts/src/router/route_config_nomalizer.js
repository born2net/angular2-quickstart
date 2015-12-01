System.register(['./route_config_decorator', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions'], function(exports_1) {
    var route_config_decorator_1, lang_1, exceptions_1;
    /**
     * Given a JS Object that represents... returns a corresponding Route, AsyncRoute, or Redirect
     */
    function normalizeRouteConfig(config) {
        if (config instanceof route_config_decorator_1.Route || config instanceof route_config_decorator_1.Redirect || config instanceof route_config_decorator_1.AsyncRoute ||
            config instanceof route_config_decorator_1.AuxRoute) {
            return config;
        }
        if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
            throw new exceptions_1.BaseException(`Route config should contain exactly one "component", "loader", or "redirectTo" property.`);
        }
        if (config.loader) {
            return new route_config_decorator_1.AsyncRoute({ path: config.path, loader: config.loader, as: config.as });
        }
        if (config.component) {
            if (typeof config.component == 'object') {
                let componentDefinitionObject = config.component;
                if (componentDefinitionObject.type == 'constructor') {
                    return new route_config_decorator_1.Route({
                        path: config.path,
                        component: componentDefinitionObject.constructor,
                        as: config.as
                    });
                }
                else if (componentDefinitionObject.type == 'loader') {
                    return new route_config_decorator_1.AsyncRoute({ path: config.path, loader: componentDefinitionObject.loader, as: config.as });
                }
                else {
                    throw new exceptions_1.BaseException(`Invalid component type "${componentDefinitionObject.type}". Valid types are "constructor" and "loader".`);
                }
            }
            return new route_config_decorator_1.Route(config);
        }
        if (config.redirectTo) {
            return new route_config_decorator_1.Redirect({ path: config.path, redirectTo: config.redirectTo });
        }
        return config;
    }
    exports_1("normalizeRouteConfig", normalizeRouteConfig);
    function assertComponentExists(component, path) {
        if (!lang_1.isType(component)) {
            throw new exceptions_1.BaseException(`Component for route "${path}" is not defined, or is not a class.`);
        }
    }
    exports_1("assertComponentExists", assertComponentExists);
    return {
        setters:[
            function (route_config_decorator_1_1) {
                route_config_decorator_1 = route_config_decorator_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=route_config_nomalizer.js.map