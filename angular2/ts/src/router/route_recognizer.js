System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/src/core/facade/collection', './path_recognizer', './route_config_impl', './async_route_handler', './sync_route_handler', './url_parser'], function(exports_1) {
    var lang_1, exceptions_1, collection_1, path_recognizer_1, route_config_impl_1, async_route_handler_1, sync_route_handler_1, url_parser_1;
    var RouteRecognizer, Redirector;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (path_recognizer_1_1) {
                path_recognizer_1 = path_recognizer_1_1;
            },
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
            },
            function (async_route_handler_1_1) {
                async_route_handler_1 = async_route_handler_1_1;
            },
            function (sync_route_handler_1_1) {
                sync_route_handler_1 = sync_route_handler_1_1;
            },
            function (url_parser_1_1) {
                url_parser_1 = url_parser_1_1;
            }],
        execute: function() {
            /**
             * `RouteRecognizer` is responsible for recognizing routes for a single component.
             * It is consumed by `RouteRegistry`, which knows how to recognize an entire hierarchy of
             * components.
             */
            class RouteRecognizer {
                constructor() {
                    this.names = new collection_1.Map();
                    this.auxRoutes = new collection_1.Map();
                    // TODO: optimize this into a trie
                    this.matchers = [];
                    // TODO: optimize this into a trie
                    this.redirects = [];
                }
                config(config) {
                    var handler;
                    if (lang_1.isPresent(config.as) && config.as[0].toUpperCase() != config.as[0]) {
                        var suggestedAlias = config.as[0].toUpperCase() + config.as.substring(1);
                        throw new exceptions_1.BaseException(`Route '${config.path}' with alias '${config.as}' does not begin with an uppercase letter. Route aliases should be CamelCase like '${suggestedAlias}'.`);
                    }
                    if (config instanceof route_config_impl_1.AuxRoute) {
                        handler = new sync_route_handler_1.SyncRouteHandler(config.component, config.data);
                        let path = lang_1.StringWrapper.startsWith(config.path, '/') ? config.path.substring(1) : config.path;
                        var recognizer = new path_recognizer_1.PathRecognizer(config.path, handler);
                        this.auxRoutes.set(path, recognizer);
                        return recognizer.terminal;
                    }
                    if (config instanceof route_config_impl_1.Redirect) {
                        this.redirects.push(new Redirector(config.path, config.redirectTo));
                        return true;
                    }
                    if (config instanceof route_config_impl_1.Route) {
                        handler = new sync_route_handler_1.SyncRouteHandler(config.component, config.data);
                    }
                    else if (config instanceof route_config_impl_1.AsyncRoute) {
                        handler = new async_route_handler_1.AsyncRouteHandler(config.loader, config.data);
                    }
                    var recognizer = new path_recognizer_1.PathRecognizer(config.path, handler);
                    this.matchers.forEach((matcher) => {
                        if (recognizer.hash == matcher.hash) {
                            throw new exceptions_1.BaseException(`Configuration '${config.path}' conflicts with existing route '${matcher.path}'`);
                        }
                    });
                    this.matchers.push(recognizer);
                    if (lang_1.isPresent(config.as)) {
                        this.names.set(config.as, recognizer);
                    }
                    return recognizer.terminal;
                }
                /**
                 * Given a URL, returns a list of `RouteMatch`es, which are partial recognitions for some route.
                 *
                 */
                recognize(urlParse) {
                    var solutions = [];
                    urlParse = this._redirect(urlParse);
                    this.matchers.forEach((pathRecognizer) => {
                        var pathMatch = pathRecognizer.recognize(urlParse);
                        if (lang_1.isPresent(pathMatch)) {
                            solutions.push(pathMatch);
                        }
                    });
                    return solutions;
                }
                /** @internal */
                _redirect(urlParse) {
                    for (var i = 0; i < this.redirects.length; i += 1) {
                        let redirector = this.redirects[i];
                        var redirectedUrl = redirector.redirect(urlParse);
                        if (lang_1.isPresent(redirectedUrl)) {
                            return redirectedUrl;
                        }
                    }
                    return urlParse;
                }
                recognizeAuxiliary(urlParse) {
                    var pathRecognizer = this.auxRoutes.get(urlParse.path);
                    if (lang_1.isBlank(pathRecognizer)) {
                        return null;
                    }
                    return pathRecognizer.recognize(urlParse);
                }
                hasRoute(name) { return this.names.has(name); }
                generate(name, params) {
                    var pathRecognizer = this.names.get(name);
                    if (lang_1.isBlank(pathRecognizer)) {
                        return null;
                    }
                    return pathRecognizer.generate(params);
                }
            }
            RouteRecognizer = RouteRecognizer;
            class Redirector {
                constructor(path, redirectTo) {
                    this.segments = [];
                    this.toSegments = [];
                    if (lang_1.StringWrapper.startsWith(path, '/')) {
                        path = path.substring(1);
                    }
                    this.segments = path.split('/');
                    if (lang_1.StringWrapper.startsWith(redirectTo, '/')) {
                        redirectTo = redirectTo.substring(1);
                    }
                    this.toSegments = redirectTo.split('/');
                }
                /**
                 * Returns `null` or a `ParsedUrl` representing the new path to match
                 */
                redirect(urlParse) {
                    for (var i = 0; i < this.segments.length; i += 1) {
                        if (lang_1.isBlank(urlParse)) {
                            return null;
                        }
                        let segment = this.segments[i];
                        if (segment != urlParse.path) {
                            return null;
                        }
                        urlParse = urlParse.child;
                    }
                    for (var i = this.toSegments.length - 1; i >= 0; i -= 1) {
                        let segment = this.toSegments[i];
                        urlParse = new url_parser_1.Url(segment, urlParse);
                    }
                    return urlParse;
                }
            }
            Redirector = Redirector;
        }
    }
});
//# sourceMappingURL=route_recognizer.js.map