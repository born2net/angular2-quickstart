System.register(['../interfaces', '../enums', '../static_response', '../base_response_options', 'angular2/angular2', 'angular2/src/core/facade/exceptions', 'angular2/src/core/facade/lang'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var interfaces_1, enums_1, static_response_1, base_response_options_1, angular2_1, exceptions_1, lang_1;
    var Rx, Observable, JSONPConnection, JSONPConnection_, JSONPBackend, JSONPBackend_;
    return {
        setters:[
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
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
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // todo(robwormald): temporary until https://github.com/angular/angular/issues/4390 decided
            var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
            var { Observable } = Rx;
            class JSONPConnection {
            }
            JSONPConnection = JSONPConnection;
            class JSONPConnection_ extends JSONPConnection {
                constructor(req, _dom, baseResponseOptions) {
                    super();
                    this._dom = _dom;
                    this.baseResponseOptions = baseResponseOptions;
                    this._finished = false;
                    if (req.method !== enums_1.RequestMethods.Get) {
                        throw exceptions_1.makeTypeError("JSONP requests must use GET request method.");
                    }
                    this.request = req;
                    this.response = new Observable(responseObserver => {
                        this.readyState = enums_1.ReadyStates.Loading;
                        let id = this._id = _dom.nextRequestID();
                        _dom.exposeConnection(id, this);
                        // Workaround Dart
                        // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
                        let callback = _dom.requestCallback(this._id);
                        let url = req.url;
                        if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                            url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', `=${callback}&`);
                        }
                        else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                            url =
                                lang_1.StringWrapper.substring(url, 0, url.length - '=JSONP_CALLBACK'.length) + `=${callback}`;
                        }
                        let script = this._script = _dom.build(url);
                        let onLoad = event => {
                            if (this.readyState === enums_1.ReadyStates.Cancelled)
                                return;
                            this.readyState = enums_1.ReadyStates.Done;
                            _dom.cleanup(script);
                            if (!this._finished) {
                                responseObserver.error(exceptions_1.makeTypeError('JSONP injected script did not invoke callback.'));
                                return;
                            }
                            let responseOptions = new base_response_options_1.ResponseOptions({ body: this._responseData });
                            if (lang_1.isPresent(this.baseResponseOptions)) {
                                responseOptions = this.baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.next(new static_response_1.Response(responseOptions));
                            responseObserver.complete();
                        };
                        let onError = error => {
                            if (this.readyState === enums_1.ReadyStates.Cancelled)
                                return;
                            this.readyState = enums_1.ReadyStates.Done;
                            _dom.cleanup(script);
                            responseObserver.error(error);
                        };
                        script.addEventListener('load', onLoad);
                        script.addEventListener('error', onError);
                        _dom.send(script);
                        return () => {
                            this.readyState = enums_1.ReadyStates.Cancelled;
                            script.removeEventListener('load', onLoad);
                            script.removeEventListener('error', onError);
                            if (lang_1.isPresent(script)) {
                                this._dom.cleanup(script);
                            }
                        };
                    });
                }
                finished(data) {
                    // Don't leak connections
                    this._finished = true;
                    this._dom.removeConnection(this._id);
                    if (this.readyState === enums_1.ReadyStates.Cancelled)
                        return;
                    this._responseData = data;
                }
            }
            JSONPConnection_ = JSONPConnection_;
            class JSONPBackend extends interfaces_1.ConnectionBackend {
            }
            JSONPBackend = JSONPBackend;
            let JSONPBackend_ = class extends JSONPBackend {
                constructor(_browserJSONP, _baseResponseOptions) {
                    super();
                    this._browserJSONP = _browserJSONP;
                    this._baseResponseOptions = _baseResponseOptions;
                }
                createConnection(request) {
                    return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
                }
            };
            JSONPBackend_ = __decorate([
                angular2_1.Injectable()
            ], JSONPBackend_);
            JSONPBackend_ = JSONPBackend_;
        }
    }
});
//# sourceMappingURL=jsonp_backend.js.map