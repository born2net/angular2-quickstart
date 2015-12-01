System.register(["angular2/src/core/facade/lang", "angular2/src/core/facade/async", "angular2/src/core/facade/collection", "angular2/src/core/di"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var lang_1, async_1, collection_1, di_1, lang_2;
    var ClientMessageBrokerFactory, ClientMessageBrokerFactory_, ClientMessageBroker, ClientMessageBroker_, MessageData, FnArg, UiArguments;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
                exports_1({
                    "Type": lang_1_1["Type"]
                });
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            class ClientMessageBrokerFactory {
            }
            ClientMessageBrokerFactory = ClientMessageBrokerFactory;
            let ClientMessageBrokerFactory_ = class extends ClientMessageBrokerFactory {
                constructor(_messageBus, _serializer) {
                    super();
                    this._messageBus = _messageBus;
                    this._serializer = _serializer;
                }
                /**
                 * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
                 */
                createMessageBroker(channel, runInZone = true) {
                    this._messageBus.initChannel(channel, runInZone);
                    return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
                }
            };
            ClientMessageBrokerFactory_ = __decorate([
                di_1.Injectable()
            ], ClientMessageBrokerFactory_);
            ClientMessageBrokerFactory_ = ClientMessageBrokerFactory_;
            class ClientMessageBroker {
            }
            ClientMessageBroker = ClientMessageBroker;
            class ClientMessageBroker_ extends ClientMessageBroker {
                constructor(messageBus, _serializer, channel) {
                    super();
                    this.channel = channel;
                    this._pending = new Map();
                    this._sink = messageBus.to(channel);
                    this._serializer = _serializer;
                    var source = messageBus.from(channel);
                    async_1.ObservableWrapper.subscribe(source, (message) => this._handleMessage(message));
                }
                _generateMessageId(name) {
                    var time = lang_1.stringify(lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now()));
                    var iteration = 0;
                    var id = name + time + lang_1.stringify(iteration);
                    while (lang_1.isPresent(this._pending[id])) {
                        id = `${name}${time}${iteration}`;
                        iteration++;
                    }
                    return id;
                }
                runOnService(args, returnType) {
                    var fnArgs = [];
                    if (lang_1.isPresent(args.args)) {
                        args.args.forEach(argument => {
                            if (argument.type != null) {
                                fnArgs.push(this._serializer.serialize(argument.value, argument.type));
                            }
                            else {
                                fnArgs.push(argument.value);
                            }
                        });
                    }
                    var promise;
                    var id = null;
                    if (returnType != null) {
                        var completer = async_1.PromiseWrapper.completer();
                        id = this._generateMessageId(args.method);
                        this._pending.set(id, completer);
                        async_1.PromiseWrapper.catchError(completer.promise, (err, stack) => {
                            lang_1.print(err);
                            completer.reject(err, stack);
                        });
                        promise = async_1.PromiseWrapper.then(completer.promise, (value) => {
                            if (this._serializer == null) {
                                return value;
                            }
                            else {
                                return this._serializer.deserialize(value, returnType);
                            }
                        });
                    }
                    else {
                        promise = null;
                    }
                    // TODO(jteplitz602): Create a class for these messages so we don't keep using StringMap #3685
                    var message = { 'method': args.method, 'args': fnArgs };
                    if (id != null) {
                        message['id'] = id;
                    }
                    async_1.ObservableWrapper.callNext(this._sink, message);
                    return promise;
                }
                _handleMessage(message) {
                    var data = new MessageData(message);
                    // TODO(jteplitz602): replace these strings with messaging constants #3685
                    if (lang_2.StringWrapper.equals(data.type, "result") || lang_2.StringWrapper.equals(data.type, "error")) {
                        var id = data.id;
                        if (this._pending.has(id)) {
                            if (lang_2.StringWrapper.equals(data.type, "result")) {
                                this._pending.get(id).resolve(data.value);
                            }
                            else {
                                this._pending.get(id).reject(data.value, null);
                            }
                            this._pending.delete(id);
                        }
                    }
                }
            }
            ClientMessageBroker_ = ClientMessageBroker_;
            class MessageData {
                constructor(data) {
                    this.type = collection_1.StringMapWrapper.get(data, "type");
                    this.id = this._getValueIfPresent(data, "id");
                    this.value = this._getValueIfPresent(data, "value");
                }
                /**
                 * Returns the value from the StringMap if present. Otherwise returns null
                 */
                _getValueIfPresent(data, key) {
                    if (collection_1.StringMapWrapper.contains(data, key)) {
                        return collection_1.StringMapWrapper.get(data, key);
                    }
                    else {
                        return null;
                    }
                }
            }
            class FnArg {
                constructor(value, type) {
                    this.value = value;
                    this.type = type;
                }
            }
            FnArg = FnArg;
            class UiArguments {
                constructor(method, args) {
                    this.method = method;
                    this.args = args;
                }
            }
            UiArguments = UiArguments;
        }
    }
});
//# sourceMappingURL=client_message_broker.js.map