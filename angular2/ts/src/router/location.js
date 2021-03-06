System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/async', 'angular2/src/core/facade/exceptions', 'angular2/angular2'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var lang_1, async_1, lang_2, exceptions_1, angular2_1;
    var APP_BASE_HREF, Location;
    function _stripBaseHref(baseHref, url) {
        if (baseHref.length > 0 && url.startsWith(baseHref)) {
            return url.substring(baseHref.length);
        }
        return url;
    }
    function _addBaseHref(baseHref, url) {
        if (!url.startsWith(baseHref)) {
            return baseHref + url;
        }
        return url;
    }
    function stripIndexHtml(url) {
        if (/\/index.html$/g.test(url)) {
            // '/index.html'.length == 11
            return url.substring(0, url.length - 11);
        }
        return url;
    }
    function stripTrailingSlash(url) {
        if (/\/$/g.test(url)) {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            /**
             * The `APP_BASE_HREF` token represents the base href to be used with the
             * {@link PathLocationStrategy}.
             *
             * If you're using {@link PathLocationStrategy}, you must provide a provider to a string
             * representing the URL prefix that should be preserved when generating and recognizing
             * URLs.
             *
             * ## Example
             *
             * ```
             * import {Component} from 'angular2/angular2';
             * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [
             *   ROUTER_PROVIDERS,
             *   PathLocationStrategy,
             *   provide(APP_BASE_HREF, {useValue: '/my/app'})
             * ]);
             * ```
             */
            APP_BASE_HREF = lang_1.CONST_EXPR(new angular2_1.OpaqueToken('appBaseHref'));
            /**
             * `Location` is a service that applications can use to interact with a browser's URL.
             * Depending on which {@link LocationStrategy} is used, `Location` will either persist
             * to the URL's path or the URL's hash segment.
             *
             * Note: it's better to use {@link Router#navigate} service to trigger route changes. Use
             * `Location` only if you need to interact with or create normalized URLs outside of
             * routing.
             *
             * `Location` is responsible for normalizing the URL against the application's base href.
             * A normalized URL is absolute from the URL host, includes the application's base href, and has no
             * trailing slash:
             * - `/my/app/user/123` is normalized
             * - `my/app/user/123` **is not** normalized
             * - `/my/app/user/123/` **is not** normalized
             *
             * ## Example
             *
             * ```
             * import {Component} from 'angular2/angular2';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig,
             *   Location
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   constructor(location: Location) {
             *     location.go('/foo');
             *   }
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            let Location = class {
                constructor(platformStrategy, href) {
                    this.platformStrategy = platformStrategy;
                    /** @internal */
                    this._subject = new async_1.EventEmitter();
                    var browserBaseHref = lang_1.isPresent(href) ? href : this.platformStrategy.getBaseHref();
                    if (lang_2.isBlank(browserBaseHref)) {
                        throw new exceptions_1.BaseException(`No base href set. Either provide a provider for the APP_BASE_HREF token or add a base element to the document.`);
                    }
                    this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
                    this.platformStrategy.onPopState((_) => { async_1.ObservableWrapper.callNext(this._subject, { 'url': this.path(), 'pop': true }); });
                }
                /**
                 * Returns the normalized URL path.
                 */
                path() { return this.normalize(this.platformStrategy.path()); }
                /**
                 * Given a string representing a URL, returns the normalized URL path.
                 */
                normalize(url) {
                    return stripTrailingSlash(_stripBaseHref(this._baseHref, stripIndexHtml(url)));
                }
                /**
                 * Given a string representing a URL, returns the normalized URL path.
                 * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
                 * before normalizing.
                 */
                normalizeAbsolutely(url) {
                    if (!url.startsWith('/')) {
                        url = '/' + url;
                    }
                    return stripTrailingSlash(_addBaseHref(this._baseHref, url));
                }
                /**
                 * Changes the browsers URL to the normalized version of the given URL, and pushes a
                 * new item onto the platform's history.
                 */
                go(path, query = '') {
                    var absolutePath = this.normalizeAbsolutely(path);
                    this.platformStrategy.pushState(null, '', absolutePath, query);
                }
                /**
                 * Navigates forward in the platform's history.
                 */
                forward() { this.platformStrategy.forward(); }
                /**
                 * Navigates back in the platform's history.
                 */
                back() { this.platformStrategy.back(); }
                /**
                 * Subscribe to the platform's `popState` events.
                 */
                subscribe(onNext, onThrow = null, onReturn = null) {
                    async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
                }
            };
            Location = __decorate([
                angular2_1.Injectable(),
                __param(1, angular2_1.Optional()),
                __param(1, angular2_1.Inject(APP_BASE_HREF))
            ], Location);
            Location = Location;
        }
    }
});
//# sourceMappingURL=location.js.map