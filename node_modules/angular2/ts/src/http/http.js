System.register(['angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/angular2', './static_request', './base_request_options', './enums'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var lang_1, exceptions_1, angular2_1, static_request_1, base_request_options_1, enums_1;
    var Http, Jsonp;
    function httpRequest(backend, request) {
        return backend.createConnection(request).response;
    }
    function mergeOptions(defaultOpts, providedOpts, method, url) {
        var newOptions = defaultOpts;
        if (lang_1.isPresent(providedOpts)) {
            // Hack so Dart can used named parameters
            newOptions = newOptions.merge(new base_request_options_1.RequestOptions({
                method: providedOpts.method,
                url: providedOpts.url,
                search: providedOpts.search,
                headers: providedOpts.headers,
                body: providedOpts.body
            }));
        }
        if (lang_1.isPresent(method)) {
            return newOptions.merge(new base_request_options_1.RequestOptions({ method: method, url: url }));
        }
        else {
            return newOptions.merge(new base_request_options_1.RequestOptions({ url: url }));
        }
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (static_request_1_1) {
                static_request_1 = static_request_1_1;
            },
            function (base_request_options_1_1) {
                base_request_options_1 = base_request_options_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }],
        execute: function() {
            /**
             * Performs http requests using `XMLHttpRequest` as the default backend.
             *
             * `Http` is available as an injectable class, with methods to perform http requests. Calling
             * `request` returns an {@link Observable} which will emit a single {@link Response} when a
             * response is received.
             *
             * #Example
             *
             * ```typescript
             * import {Http, HTTP_PROVIDERS} from 'angular2/http';
             * @Component({
             *   selector: 'http-app',
             *   viewProviders: [HTTP_PROVIDERS],
             *   templateUrl: 'people.html'
             * })
             * class PeopleComponent {
             *   constructor(http: Http) {
             *     http.get('people.json')
             *       // Call map on the response observable to get the parsed people object
             *       .map(res => res.json())
             *       // Subscribe to the observable to get the parsed people object and attach it to the
             *       // component
             *       .subscribe(people => this.people = people);
             *   }
             * }
             * ```
             *
             *
             * #Example
             *
             * ```
             * http.get('people.json').observer({next: (value) => this.people = people});
             * ```
             *
             * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
             * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
             * the {@link XHRBackend} provider, as in the following example:
             *
             * #Example
             *
             * ```typescript
             * import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';
             * var injector = Injector.resolveAndCreate([
             *   BaseRequestOptions,
             *   MockBackend,
             *   provide(Http, {useFactory:
             *       function(backend, defaultOptions) {
             *         return new Http(backend, defaultOptions);
             *       },
             *       deps: [MockBackend, BaseRequestOptions]})
             * ]);
             * var http = injector.get(Http);
             * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
             * ```
             *
             **/
            let Http = class {
                constructor(_backend, _defaultOptions) {
                    this._backend = _backend;
                    this._defaultOptions = _defaultOptions;
                }
                /**
                 * Performs any type of http request. First argument is required, and can either be a url or
                 * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
                 * object can be provided as the 2nd argument. The options object will be merged with the values
                 * of {@link BaseRequestOptions} before performing the request.
                 */
                request(url, options) {
                    var responseObservable;
                    if (lang_1.isString(url)) {
                        responseObservable = httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Get, url)));
                    }
                    else if (url instanceof static_request_1.Request) {
                        responseObservable = httpRequest(this._backend, url);
                    }
                    else {
                        throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
                    }
                    return responseObservable;
                }
                /**
                 * Performs a request with `get` http method.
                 */
                get(url, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Get, url)));
                }
                /**
                 * Performs a request with `post` http method.
                 */
                post(url, body, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethods.Post, url)));
                }
                /**
                 * Performs a request with `put` http method.
                 */
                put(url, body, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethods.Put, url)));
                }
                /**
                 * Performs a request with `delete` http method.
                 */
                delete(url, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Delete, url)));
                }
                /**
                 * Performs a request with `patch` http method.
                 */
                patch(url, body, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethods.Patch, url)));
                }
                /**
                 * Performs a request with `head` http method.
                 */
                head(url, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Head, url)));
                }
            };
            Http = __decorate([
                angular2_1.Injectable()
            ], Http);
            Http = Http;
            let Jsonp = class extends Http {
                constructor(backend, defaultOptions) {
                    super(backend, defaultOptions);
                }
                /**
                 * Performs any type of http request. First argument is required, and can either be a url or
                 * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
                 * object can be provided as the 2nd argument. The options object will be merged with the values
                 * of {@link BaseRequestOptions} before performing the request.
                 */
                request(url, options) {
                    var responseObservable;
                    if (lang_1.isString(url)) {
                        url = new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Get, url));
                    }
                    if (url instanceof static_request_1.Request) {
                        if (url.method !== enums_1.RequestMethods.Get) {
                            exceptions_1.makeTypeError('JSONP requests must use GET request method.');
                        }
                        responseObservable = httpRequest(this._backend, url);
                    }
                    else {
                        throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
                    }
                    return responseObservable;
                }
            };
            Jsonp = __decorate([
                angular2_1.Injectable()
            ], Jsonp);
            Jsonp = Jsonp;
        }
    }
});
//# sourceMappingURL=http.js.map