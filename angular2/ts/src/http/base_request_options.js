System.register(['angular2/src/core/facade/lang', './headers', './enums', 'angular2/angular2', './url_search_params', './http_utils'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var lang_1, headers_1, enums_1, angular2_1, url_search_params_1, http_utils_1;
    var RequestOptions, BaseRequestOptions;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (url_search_params_1_1) {
                url_search_params_1 = url_search_params_1_1;
            },
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            }],
        execute: function() {
            /**
             * Creates a request options object to be optionally provided when instantiating a
             * {@link Request}.
             *
             * This class is based on the `RequestInit` description in the [Fetch
             * Spec](https://fetch.spec.whatwg.org/#requestinit).
             *
             * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
             * class, which sub-classes `RequestOptions`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
             *
             * ```typescript
             * import {RequestOptions, Request, RequestMethods} from 'angular2/http';
             *
             * var options = new RequestOptions({
             *   method: RequestMethods.Post,
             *   url: 'https://google.com'
             * });
             * var req = new Request(options);
             * console.log('req.method:', RequestMethods[req.method]); // Post
             * console.log('options.url:', options.url); // https://google.com
             * ```
             */
            class RequestOptions {
                constructor({ method, headers, body, url, search } = {}) {
                    this.method = lang_1.isPresent(method) ? http_utils_1.normalizeMethodName(method) : null;
                    this.headers = lang_1.isPresent(headers) ? headers : null;
                    this.body = lang_1.isPresent(body) ? body : null;
                    this.url = lang_1.isPresent(url) ? url : null;
                    this.search = lang_1.isPresent(search) ? (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) :
                        (search)) :
                        null;
                }
                /**
                 * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
                 * existing values. This method will not change the values of the instance on which it is being
                 * called.
                 *
                 * Note that `headers` and `search` will override existing values completely if present in
                 * the `options` object. If these values should be merged, it should be done prior to calling
                 * `merge` on the `RequestOptions` instance.
                 *
                 * Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
                 *
                 * ```typescript
                 * import {RequestOptions, Request, RequestMethods} from 'angular2/http';
                 *
                 * var options = new RequestOptions({
                 *   method: RequestMethods.Post
                 * });
                 * var req = new Request(options.merge({
                 *   url: 'https://google.com'
                 * }));
                 * console.log('req.method:', RequestMethods[req.method]); // Post
                 * console.log('options.url:', options.url); // null
                 * console.log('req.url:', req.url); // https://google.com
                 * ```
                 */
                merge(options) {
                    return new RequestOptions({
                        method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
                        headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
                        body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
                        url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
                        search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ?
                            (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams((options.search)) :
                                (options.search).clone()) :
                            this.search
                    });
                }
            }
            RequestOptions = RequestOptions;
            /**
             * Subclass of {@link RequestOptions}, with default values.
             *
             * Default values:
             *  * method: {@link RequestMethods RequestMethods.Get}
             *  * headers: empty {@link Headers} object
             *
             * This class could be extended and bound to the {@link RequestOptions} class
             * when configuring an {@link Injector}, in order to override the default options
             * used by {@link Http} to create and send {@link Request Requests}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/LEKVSx?p=preview))
             *
             * ```typescript
             * import {provide, bootstrap} from 'angular2/angular2';
             * import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from 'angular2/http';
             * import {App} from './myapp';
             *
             * class MyOptions extends BaseRequestOptions {
             *   search: string = 'coreTeam=true';
             * }
             *
             * bootstrap(App, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})]);
             * ```
             *
             * The options could also be extended when manually creating a {@link Request}
             * object.
             *
             * ### Example ([live demo](http://plnkr.co/edit/oyBoEvNtDhOSfi9YxaVb?p=preview))
             *
             * ```
             * import {BaseRequestOptions, Request, RequestMethods} from 'angular2/http';
             *
             * var options = new BaseRequestOptions();
             * var req = new Request(options.merge({
             *   method: RequestMethods.Post,
             *   url: 'https://google.com'
             * }));
             * console.log('req.method:', RequestMethods[req.method]); // Post
             * console.log('options.url:', options.url); // null
             * console.log('req.url:', req.url); // https://google.com
             * ```
             */
            let BaseRequestOptions = class extends RequestOptions {
                constructor() {
                    super({ method: enums_1.RequestMethods.Get, headers: new headers_1.Headers() });
                }
            };
            BaseRequestOptions = __decorate([
                angular2_1.Injectable()
            ], BaseRequestOptions);
            BaseRequestOptions = BaseRequestOptions;
        }
    }
});
//# sourceMappingURL=base_request_options.js.map