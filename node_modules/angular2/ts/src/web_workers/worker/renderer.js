System.register(['angular2/src/core/render/api', "angular2/src/web_workers/shared/client_message_broker", "angular2/src/core/facade/lang", "angular2/src/core/di", 'angular2/src/web_workers/shared/api', 'angular2/src/web_workers/shared/messaging_api'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var api_1, client_message_broker_1, lang_1, di_1, api_2, messaging_api_1;
    var WebWorkerRenderer;
    return {
        setters:[
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (api_2_1) {
                api_2 = api_2_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            }],
        execute: function() {
            let WebWorkerRenderer = class {
                constructor(messageBrokerFactory, _renderProtoViewRefStore, _renderViewStore, _eventDispatcher) {
                    this._renderProtoViewRefStore = _renderProtoViewRefStore;
                    this._renderViewStore = _renderViewStore;
                    this._eventDispatcher = _eventDispatcher;
                    this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
                }
                registerComponentTemplate(templateId, commands, styles, nativeShadow) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(templateId, null),
                        new client_message_broker_1.FnArg(commands, api_2.WebWorkerTemplateCmd),
                        new client_message_broker_1.FnArg(styles, null),
                        new client_message_broker_1.FnArg(nativeShadow, null)
                    ];
                    var args = new client_message_broker_1.UiArguments("registerComponentTemplate", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                createProtoView(cmds) {
                    var renderProtoViewRef = this._renderProtoViewRefStore.allocate();
                    var fnArgs = [new client_message_broker_1.FnArg(cmds, api_2.WebWorkerTemplateCmd), new client_message_broker_1.FnArg(renderProtoViewRef, api_1.RenderProtoViewRef)];
                    var args = new client_message_broker_1.UiArguments("createProtoView", fnArgs);
                    this._messageBroker.runOnService(args, null);
                    return renderProtoViewRef;
                }
                /**
                 * Creates a root host view that includes the given element.
                 * Note that the fragmentCount needs to be passed in so that we can create a result
                 * synchronously even when dealing with webworkers!
                 *
                 * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
                 * ProtoViewDto.HOST_VIEW_TYPE
                 * @param {any} hostElementSelector css selector for the host element (will be queried against the
                 * main document)
                 * @return {RenderViewRef} the created view
                 */
                createRootHostView(hostProtoViewRef, fragmentCount, hostElementSelector) {
                    return this._createViewHelper(hostProtoViewRef, fragmentCount, hostElementSelector);
                }
                /**
                 * Creates a regular view out of the given ProtoView
                 * Note that the fragmentCount needs to be passed in so that we can create a result
                 * synchronously even when dealing with webworkers!
                 */
                createView(protoViewRef, fragmentCount) {
                    return this._createViewHelper(protoViewRef, fragmentCount);
                }
                _createViewHelper(protoViewRef, fragmentCount, hostElementSelector) {
                    var renderViewWithFragments = this._renderViewStore.allocate(fragmentCount);
                    var startIndex = (renderViewWithFragments.viewRef).refNumber;
                    var fnArgs = [
                        new client_message_broker_1.FnArg(protoViewRef, api_1.RenderProtoViewRef),
                        new client_message_broker_1.FnArg(fragmentCount, null),
                    ];
                    var method = "createView";
                    if (lang_1.isPresent(hostElementSelector) && hostElementSelector != null) {
                        fnArgs.push(new client_message_broker_1.FnArg(hostElementSelector, null));
                        method = "createRootHostView";
                    }
                    fnArgs.push(new client_message_broker_1.FnArg(startIndex, null));
                    var args = new client_message_broker_1.UiArguments(method, fnArgs);
                    this._messageBroker.runOnService(args, null);
                    return renderViewWithFragments;
                }
                /**
                 * Destroys the given view after it has been dehydrated and detached
                 */
                destroyView(viewRef) {
                    var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
                    var args = new client_message_broker_1.UiArguments("destroyView", fnArgs);
                    this._messageBroker.runOnService(args, null);
                    this._renderViewStore.remove(viewRef);
                }
                /**
                 * Attaches a fragment after another fragment.
                 */
                attachFragmentAfterFragment(previousFragmentRef, fragmentRef) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(previousFragmentRef, api_1.RenderFragmentRef),
                        new client_message_broker_1.FnArg(fragmentRef, api_1.RenderFragmentRef)
                    ];
                    var args = new client_message_broker_1.UiArguments("attachFragmentAfterFragment", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Attaches a fragment after an element.
                 */
                attachFragmentAfterElement(elementRef, fragmentRef) {
                    var fnArgs = [new client_message_broker_1.FnArg(elementRef, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(fragmentRef, api_1.RenderFragmentRef)];
                    var args = new client_message_broker_1.UiArguments("attachFragmentAfterElement", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Detaches a fragment.
                 */
                detachFragment(fragmentRef) {
                    var fnArgs = [new client_message_broker_1.FnArg(fragmentRef, api_1.RenderFragmentRef)];
                    var args = new client_message_broker_1.UiArguments("detachFragment", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
                 * inside of the view pool.
                 */
                hydrateView(viewRef) {
                    var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
                    var args = new client_message_broker_1.UiArguments("hydrateView", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
                 * inside of the view pool.
                 */
                dehydrateView(viewRef) {
                    var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
                    var args = new client_message_broker_1.UiArguments("dehydrateView", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Returns the native element at the given location.
                 * Attention: In a WebWorker scenario, this should always return null!
                 */
                getNativeElementSync(location) { return null; }
                /**
                 * Sets a property on an element.
                 */
                setElementProperty(location, propertyName, propertyValue) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef),
                        new client_message_broker_1.FnArg(propertyName, null),
                        new client_message_broker_1.FnArg(propertyValue, null)
                    ];
                    var args = new client_message_broker_1.UiArguments("setElementProperty", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Sets an attribute on an element.
                 */
                setElementAttribute(location, attributeName, attributeValue) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef),
                        new client_message_broker_1.FnArg(attributeName, null),
                        new client_message_broker_1.FnArg(attributeValue, null)
                    ];
                    var args = new client_message_broker_1.UiArguments("setElementAttribute", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Sets a class on an element.
                 */
                setElementClass(location, className, isAdd) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef),
                        new client_message_broker_1.FnArg(className, null),
                        new client_message_broker_1.FnArg(isAdd, null)
                    ];
                    var args = new client_message_broker_1.UiArguments("setElementClass", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Sets a style on an element.
                 */
                setElementStyle(location, styleName, styleValue) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef),
                        new client_message_broker_1.FnArg(styleName, null),
                        new client_message_broker_1.FnArg(styleValue, null)
                    ];
                    var args = new client_message_broker_1.UiArguments("setElementStyle", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Calls a method on an element.
                 * Note: For now we're assuming that everything in the args list are primitive
                 */
                invokeElementMethod(location, methodName, args) {
                    var fnArgs = [
                        new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef),
                        new client_message_broker_1.FnArg(methodName, null),
                        new client_message_broker_1.FnArg(args, null)
                    ];
                    var uiArgs = new client_message_broker_1.UiArguments("invokeElementMethod", fnArgs);
                    this._messageBroker.runOnService(uiArgs, null);
                }
                /**
                 * Sets the value of a text node.
                 */
                setText(viewRef, textNodeIndex, text) {
                    var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef), new client_message_broker_1.FnArg(textNodeIndex, null), new client_message_broker_1.FnArg(text, null)];
                    var args = new client_message_broker_1.UiArguments("setText", fnArgs);
                    this._messageBroker.runOnService(args, null);
                }
                /**
                 * Sets the dispatcher for all events of the given view
                 */
                setEventDispatcher(viewRef, dispatcher) {
                    var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
                    var args = new client_message_broker_1.UiArguments("setEventDispatcher", fnArgs);
                    this._eventDispatcher.registerEventDispatcher(viewRef, dispatcher);
                    this._messageBroker.runOnService(args, null);
                }
            };
            WebWorkerRenderer = __decorate([
                di_1.Injectable()
            ], WebWorkerRenderer);
            WebWorkerRenderer = WebWorkerRenderer;
        }
    }
});
//# sourceMappingURL=renderer.js.map