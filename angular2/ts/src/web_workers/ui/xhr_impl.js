var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Injectable } from 'angular2/src/core/di';
import { PRIMITIVE } from 'angular2/src/web_workers/shared/serializer';
import { XHR_CHANNEL } from 'angular2/src/web_workers/shared/messaging_api';
import { bind } from './bind';
export let MessageBasedXHRImpl = class {
    constructor(_brokerFactory, _xhr) {
        this._brokerFactory = _brokerFactory;
        this._xhr = _xhr;
    }
    start() {
        var broker = this._brokerFactory.createMessageBroker(XHR_CHANNEL);
        broker.registerMethod("get", [PRIMITIVE], bind(this._xhr.get, this._xhr), PRIMITIVE);
    }
};
MessageBasedXHRImpl = __decorate([
    Injectable()
], MessageBasedXHRImpl);
//# sourceMappingURL=xhr_impl.js.map