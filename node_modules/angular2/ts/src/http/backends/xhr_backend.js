System.register(['../enums', '../static_response', '../base_response_options', 'angular2/angular2', 'angular2/src/core/facade/lang'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var enums_1, static_response_1, base_response_options_1, angular2_1, lang_1;
    var Rx, Observable, XHRConnection, XHRBackend;
    return {
        setters:[
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (static_response_1_1) {
                static_response_1 = static_response_1_1;
            },
            function (base_response_options_1_1) {
                base_response_options_1 = base_response_options_1_1;
            },
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // todo(robwormald): temporary until https://github.com/angular/angular/issues/4390 decided
            var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
            var { Observable } = Rx;
            /**
            * Creates connections using `XMLHttpRequest`. Given a fully-qualified
            * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
            * request.
            *
            * This class would typically not be created or interacted with directly inside applications, though
            * the {@link MockConnection} may be interacted with in tests.
            */
            class XHRConnection {
                constructor(req, browserXHR, baseResponseOptions) {
                    this.request = req;
                    this.response = new Observable(responseObserver => {
                        let _xhr = browserXHR.build();
                        _xhr.open(enums_1.RequestMethods[req.method].toUpperCase(), req.url);
                        // load event handler
                        let onLoad = () => {
                            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                            // response/responseType properties were introduced in XHR Level2 spec (supported by
                            // IE10)
                            let response = lang_1.isPresent(_xhr.response) ? _xhr.response : _xhr.responseText;
                            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                            let status = _xhr.status === 1223 ? 204 : _xhr.status;
                            // fix status code when it is 0 (0 status is undocumented).
                            // Occurs when accessing file resources or on Android 4.1 stock browser
                            // while retrieving files from application cache.
                            if (status === 0) {
                                status = response ? 200 : 0;
                            }
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: response, status: status });
                            if (lang_1.isPresent(baseResponseOptions)) {
                                responseOptions = baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.next(new static_response_1.Response(responseOptions));
                            // TODO(gdi2290): defer complete if array buffer until done
                            responseObserver.complete();
                        };
                        // error event handler
                        let onError = (err) => {
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: err, type: enums_1.ResponseTypes.Error });
                            if (lang_1.isPresent(baseResponseOptions)) {
                                responseOptions = baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.error(new static_response_1.Response(responseOptions));
                        };
                        if (lang_1.isPresent(req.headers)) {
                            req.headers.forEach((values, name) => _xhr.setRequestHeader(name, values.join(',')));
                        }
                        _xhr.addEventListener('load', onLoad);
                        _xhr.addEventListener('error', onError);
                        _xhr.send(this.request.text());
                        return () => {
                            _xhr.removeEventListener('load', onLoad);
                            _xhr.removeEventListener('error', onError);
                            _xhr.abort();
                        };
                    });
                }
            }
            XHRConnection = XHRConnection;
            /**
             * Creates {@link XHRConnection} instances.
             *
             * This class would typically not be used by end users, but could be
             * overridden if a different backend implementation should be used,
             * such as in a node backend.
             *
             * #Example
             *
             * ```
             * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from 'angular2/http';
             * @Component({
             *   viewProviders: [
             *     HTTP_PROVIDERS,
             *     provide(Http, {useFactory: (backend, options) => {
             *       return new Http(backend, options);
             *     }, deps: [MyNodeBackend, BaseRequestOptions]})]
             * })
             * class MyComponent {
             *   constructor(http:Http) {
             *     http('people.json').subscribe(res => this.people = res.json());
             *   }
             * }
             * ```
             *
             **/
            let XHRBackend = class {
                constructor(_browserXHR, _baseResponseOptions) {
                    this._browserXHR = _browserXHR;
                    this._baseResponseOptions = _baseResponseOptions;
                }
                createConnection(request) {
                    return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
                }
            };
            XHRBackend = __decorate([
                angular2_1.Injectable()
            ], XHRBackend);
            XHRBackend = XHRBackend;
        }
    }
});
//# sourceMappingURL=xhr_backend.js.map