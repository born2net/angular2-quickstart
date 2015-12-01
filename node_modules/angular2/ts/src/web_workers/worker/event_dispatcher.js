System.register(['angular2/src/core/di', 'angular2/src/core/facade/collection', 'angular2/src/core/render/api', 'angular2/src/web_workers/shared/messaging_api', 'angular2/src/core/facade/async', './event_deserializer'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, collection_1, api_1, messaging_api_1, async_1, event_deserializer_1;
    var WebWorkerEventDispatcher, RenderEventData;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (event_deserializer_1_1) {
                event_deserializer_1 = event_deserializer_1_1;
            }],
        execute: function() {
            let WebWorkerEventDispatcher = class {
                constructor(bus, _serializer) {
                    this._serializer = _serializer;
                    this._eventDispatchRegistry = new collection_1.Map();
                    bus.initChannel(messaging_api_1.EVENT_CHANNEL);
                    var source = bus.from(messaging_api_1.EVENT_CHANNEL);
                    async_1.ObservableWrapper.subscribe(source, (message) => this._dispatchEvent(new RenderEventData(message, _serializer)));
                }
                _dispatchEvent(eventData) {
                    var dispatcher = this._eventDispatchRegistry.get(eventData.viewRef);
                    eventData.locals['$event'] = event_deserializer_1.deserializeGenericEvent(eventData.locals['$event']);
                    dispatcher.dispatchRenderEvent(eventData.elementIndex, eventData.eventName, eventData.locals);
                }
                registerEventDispatcher(viewRef, dispatcher) {
                    this._eventDispatchRegistry.set(viewRef, dispatcher);
                }
            };
            WebWorkerEventDispatcher = __decorate([
                di_1.Injectable()
            ], WebWorkerEventDispatcher);
            WebWorkerEventDispatcher = WebWorkerEventDispatcher;
            class RenderEventData {
                constructor(message, serializer) {
                    this.viewRef = serializer.deserialize(message['viewRef'], api_1.RenderViewRef);
                    this.elementIndex = message['elementIndex'];
                    this.eventName = message['eventName'];
                    this.locals = collection_1.MapWrapper.createFromStringMap(message['locals']);
                }
            }
        }
    }
});
//# sourceMappingURL=event_dispatcher.js.map