System.register(['angular2/src/core/di', 'angular2/src/core/compiler/xhr', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/messaging_api'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, xhr_1, client_message_broker_1, messaging_api_1;
    var WebWorkerXHRImpl;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            }],
        execute: function() {
            /**
             * Implementation of compiler/xhr that relays XHR requests to the UI side where they are sent
             * and the result is proxied back to the worker
             */
            let WebWorkerXHRImpl = class extends xhr_1.XHR {
                constructor(messageBrokerFactory) {
                    super();
                    this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.XHR_CHANNEL);
                }
                get(url) {
                    var fnArgs = [new client_message_broker_1.FnArg(url, null)];
                    var args = new client_message_broker_1.UiArguments("get", fnArgs);
                    return this._messageBroker.runOnService(args, String);
                }
            };
            WebWorkerXHRImpl = __decorate([
                di_1.Injectable()
            ], WebWorkerXHRImpl);
            WebWorkerXHRImpl = WebWorkerXHRImpl;
        }
    }
});
//# sourceMappingURL=xhr_impl.js.map