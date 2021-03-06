'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var interfaces_1 = require('../interfaces');
var enums_1 = require('../enums');
var static_response_1 = require('../static_response');
var base_response_options_1 = require('../base_response_options');
var angular2_1 = require('angular2/angular2');
var browser_jsonp_1 = require('./browser_jsonp');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var lang_1 = require('angular2/src/core/facade/lang');
// todo(robwormald): temporary until https://github.com/angular/angular/issues/4390 decided
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var Observable = Rx.Observable;
var JSONPConnection = (function () {
    function JSONPConnection() {
    }
    return JSONPConnection;
})();
exports.JSONPConnection = JSONPConnection;
var JSONPConnection_ = (function (_super) {
    __extends(JSONPConnection_, _super);
    function JSONPConnection_(req, _dom, baseResponseOptions) {
        var _this = this;
        _super.call(this);
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== enums_1.RequestMethods.Get) {
            throw exceptions_1.makeTypeError("JSONP requests must use GET request method.");
        }
        this.request = req;
        this.response = new Observable(function (responseObserver) {
            _this.readyState = enums_1.ReadyStates.Loading;
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url =
                    lang_1.StringWrapper.substring(url, 0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function (event) {
                if (_this.readyState === enums_1.ReadyStates.Cancelled)
                    return;
                _this.readyState = enums_1.ReadyStates.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    responseObserver.error(exceptions_1.makeTypeError('JSONP injected script did not invoke callback.'));
                    return;
                }
                var responseOptions = new base_response_options_1.ResponseOptions({ body: _this._responseData });
                if (lang_1.isPresent(_this.baseResponseOptions)) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new static_response_1.Response(responseOptions));
                responseObserver.complete();
            };
            var onError = function (error) {
                if (_this.readyState === enums_1.ReadyStates.Cancelled)
                    return;
                _this.readyState = enums_1.ReadyStates.Done;
                _dom.cleanup(script);
                responseObserver.error(error);
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = enums_1.ReadyStates.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                if (lang_1.isPresent(script)) {
                    _this._dom.cleanup(script);
                }
            };
        });
    }
    JSONPConnection_.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === enums_1.ReadyStates.Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection_;
})(JSONPConnection);
exports.JSONPConnection_ = JSONPConnection_;
var JSONPBackend = (function (_super) {
    __extends(JSONPBackend, _super);
    function JSONPBackend() {
        _super.apply(this, arguments);
    }
    return JSONPBackend;
})(interfaces_1.ConnectionBackend);
exports.JSONPBackend = JSONPBackend;
var JSONPBackend_ = (function (_super) {
    __extends(JSONPBackend_, _super);
    function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
        _super.call(this);
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    JSONPBackend_.prototype.createConnection = function (request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    };
    JSONPBackend_ = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [browser_jsonp_1.BrowserJsonp, base_response_options_1.ResponseOptions])
    ], JSONPBackend_);
    return JSONPBackend_;
})(JSONPBackend);
exports.JSONPBackend_ = JSONPBackend_;
//# sourceMappingURL=jsonp_backend.js.map