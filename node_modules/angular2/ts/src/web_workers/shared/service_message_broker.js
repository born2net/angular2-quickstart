System.register(['angular2/src/core/di', 'angular2/src/core/facade/collection', "angular2/src/core/facade/lang", 'angular2/src/core/facade/async'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, collection_1, lang_1, async_1;
    var ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_, ServiceMessageBroker, ServiceMessageBroker_, ReceivedMessage;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            class ServiceMessageBrokerFactory {
            }
            ServiceMessageBrokerFactory = ServiceMessageBrokerFactory;
            let ServiceMessageBrokerFactory_ = class extends ServiceMessageBrokerFactory {
                constructor(_messageBus, _serializer) {
                    super();
                    this._messageBus = _messageBus;
                    this._serializer = _serializer;
                }
                createMessageBroker(channel, runInZone = true) {
                    this._messageBus.initChannel(channel, runInZone);
                    return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
                }
            };
            ServiceMessageBrokerFactory_ = __decorate([
                di_1.Injectable()
            ], ServiceMessageBrokerFactory_);
            ServiceMessageBrokerFactory_ = ServiceMessageBrokerFactory_;
            class ServiceMessageBroker {
            }
            ServiceMessageBroker = ServiceMessageBroker;
            /**
             * Helper class for UIComponents that allows components to register methods.
             * If a registered method message is received from the broker on the worker,
             * the UIMessageBroker deserializes its arguments and calls the registered method.
             * If that method returns a promise, the UIMessageBroker returns the result to the worker.
             */
            class ServiceMessageBroker_ extends ServiceMessageBroker {
                constructor(messageBus, _serializer, channel) {
                    super();
                    this._serializer = _serializer;
                    this.channel = channel;
                    this._methods = new collection_1.Map();
                    this._sink = messageBus.to(channel);
                    var source = messageBus.from(channel);
                    async_1.ObservableWrapper.subscribe(source, (message) => this._handleMessage(message));
                }
                registerMethod(methodName, signature, method, returnType) {
                    this._methods.set(methodName, (message) => {
                        var serializedArgs = message.args;
                        var deserializedArgs = collection_1.ListWrapper.createFixedSize(signature.length);
                        for (var i = 0; i < signature.length; i++) {
                            var serializedArg = serializedArgs[i];
                            deserializedArgs[i] = this._serializer.deserialize(serializedArg, signature[i]);
                        }
                        var promise = lang_1.FunctionWrapper.apply(method, deserializedArgs);
                        if (lang_1.isPresent(returnType) && lang_1.isPresent(promise)) {
                            this._wrapWebWorkerPromise(message.id, promise, returnType);
                        }
                    });
                }
                _handleMessage(map) {
                    var message = new ReceivedMessage(map);
                    if (this._methods.has(message.method)) {
                        this._methods.get(message.method)(message);
                    }
                }
                _wrapWebWorkerPromise(id, promise, type) {
                    async_1.PromiseWrapper.then(promise, (result) => {
                        async_1.ObservableWrapper.callNext(this._sink, { 'type': 'result', 'value': this._serializer.serialize(result, type), 'id': id });
                    });
                }
            }
            ServiceMessageBroker_ = ServiceMessageBroker_;
            class ReceivedMessage {
                constructor(data) {
                    this.method = data['method'];
                    this.args = data['args'];
                    this.id = data['id'];
                    this.type = data['type'];
                }
            }
            ReceivedMessage = ReceivedMessage;
        }
    }
});
//# sourceMappingURL=service_message_broker.js.map