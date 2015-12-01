System.register(['angular2/src/core/facade/lang'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var lang_1;
    var RouteConfig, Route, AuxRoute, AsyncRoute, Redirect;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * The `RouteConfig` decorator defines routes for a given component.
             *
             * It takes an array of {@link RouteDefinition}s.
             */
            let RouteConfig = class {
                constructor(configs) {
                    this.configs = configs;
                }
            };
            RouteConfig = __decorate([
                lang_1.CONST()
            ], RouteConfig);
            RouteConfig = RouteConfig;
            /**
             * `Route` is a type of {@link RouteDefinition} used to route a path to a component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `component` a component type.
             * - `as` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via the {@link ROUTE_DATA} token.
             *
             * ## Example
             * ```
             * import {RouteConfig} from 'angular2/router';
             *
             * @RouteConfig([
             *   {path: '/home', component: HomeCmp, as: 'HomeCmp' }
             * ])
             * class MyApp {}
             * ```
             */
            let Route = class {
                constructor({ path, component, as, data }) {
                    this.path = path;
                    this.component = component;
                    this.as = as;
                    this.loader = null;
                    this.redirectTo = null;
                    this.data = data;
                }
            };
            Route = __decorate([
                lang_1.CONST()
            ], Route);
            Route = Route;
            /**
             * `AuxRoute` is a type of {@link RouteDefinition} used to define an auxiliary route.
             *
             * It takes an object with the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `component` a component type.
             * - `as` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via the {@link ROUTE_DATA} token.
             *
             * ## Example
             * ```
             * import {RouteConfig, AuxRoute} from 'angular2/router';
             *
             * @RouteConfig([
             *   new AuxRoute({path: '/home', component: HomeCmp})
             * ])
             * class MyApp {}
             * ```
             */
            let AuxRoute = class {
                constructor({ path, component, as }) {
                    this.data = null;
                    // added next two properties to work around https://github.com/Microsoft/TypeScript/issues/4107
                    this.loader = null;
                    this.redirectTo = null;
                    this.path = path;
                    this.component = component;
                    this.as = as;
                }
            };
            AuxRoute = __decorate([
                lang_1.CONST()
            ], AuxRoute);
            AuxRoute = AuxRoute;
            /**
             * `AsyncRoute` is a type of {@link RouteDefinition} used to route a path to an asynchronously
             * loaded component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `loader` is a function that returns a promise that resolves to a component.
             * - `as` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via the {@link ROUTE_DATA} token.
             *
             * ## Example
             * ```
             * import {RouteConfig} from 'angular2/router';
             *
             * @RouteConfig([
             *   {path: '/home', loader: () => Promise.resolve(MyLoadedCmp), as: 'MyLoadedCmp'}
             * ])
             * class MyApp {}
             * ```
             */
            let AsyncRoute = class {
                constructor({ path, loader, as, data }) {
                    this.path = path;
                    this.loader = loader;
                    this.as = as;
                    this.data = data;
                }
            };
            AsyncRoute = __decorate([
                lang_1.CONST()
            ], AsyncRoute);
            AsyncRoute = AsyncRoute;
            /**
             * `Redirect` is a type of {@link RouteDefinition} used to route a path to an asynchronously loaded
             * component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `redirectTo` is a string representing the new URL to be matched against.
             *
             * ## Example
             * ```
             * import {RouteConfig} from 'angular2/router';
             *
             * @RouteConfig([
             *   {path: '/', redirectTo: '/home'},
             *   {path: '/home', component: HomeCmp}
             * ])
             * class MyApp {}
             * ```
             */
            let Redirect = class {
                constructor({ path, redirectTo }) {
                    this.as = null;
                    // added next property to work around https://github.com/Microsoft/TypeScript/issues/4107
                    this.loader = null;
                    this.data = null;
                    this.path = path;
                    this.redirectTo = redirectTo;
                }
            };
            Redirect = __decorate([
                lang_1.CONST()
            ], Redirect);
            Redirect = Redirect;
        }
    }
});
//# sourceMappingURL=route_config_impl.js.map