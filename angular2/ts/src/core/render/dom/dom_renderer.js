System.register(['angular2/src/core/di', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', 'angular2/src/core/dom/dom_adapter', '../../profile/profile', '../api', './dom_tokens', '../view_factory', '../view', './util'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, lang_1, exceptions_1, dom_adapter_1, profile_1, api_1, dom_tokens_1, view_factory_1, view_1, util_1;
    var DomRenderer, DomRenderer_;
    function resolveInternalDomView(viewRef) {
        return viewRef;
    }
    function resolveInternalDomFragment(fragmentRef) {
        return fragmentRef.nodes;
    }
    function moveNodesAfterSibling(sibling, nodes) {
        if (nodes.length > 0 && lang_1.isPresent(dom_adapter_1.DOM.parentElement(sibling))) {
            for (var i = 0; i < nodes.length; i++) {
                dom_adapter_1.DOM.insertBefore(sibling, nodes[i]);
            }
            dom_adapter_1.DOM.insertBefore(nodes[0], sibling);
        }
    }
    function moveChildNodes(source, target) {
        var currChild = dom_adapter_1.DOM.firstChild(source);
        while (lang_1.isPresent(currChild)) {
            var nextChild = dom_adapter_1.DOM.nextSibling(currChild);
            dom_adapter_1.DOM.appendChild(target, currChild);
            currChild = nextChild;
        }
    }
    function decoratePreventDefault(eventHandler) {
        return (event) => {
            var allowDefaultBehavior = eventHandler(event);
            if (!allowDefaultBehavior) {
                // TODO(tbosch): move preventDefault into event plugins...
                dom_adapter_1.DOM.preventDefault(event);
            }
        };
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (view_factory_1_1) {
                view_factory_1 = view_factory_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            class DomRenderer extends api_1.Renderer {
                createProtoView(cmds) {
                    return new view_1.DefaultProtoViewRef(cmds);
                }
                getNativeElementSync(location) {
                    return resolveInternalDomView(location.renderView).boundElements[location.boundElementIndex];
                }
                getRootNodes(fragment) { return resolveInternalDomFragment(fragment); }
                attachFragmentAfterFragment(previousFragmentRef, fragmentRef) {
                    var previousFragmentNodes = resolveInternalDomFragment(previousFragmentRef);
                    if (previousFragmentNodes.length > 0) {
                        var sibling = previousFragmentNodes[previousFragmentNodes.length - 1];
                        let nodes = resolveInternalDomFragment(fragmentRef);
                        moveNodesAfterSibling(sibling, nodes);
                        this.animateNodesEnter(nodes);
                    }
                }
                /**
                 * Iterates through all nodes being added to the DOM and animates them if necessary
                 * @param nodes
                 */
                animateNodesEnter(nodes) {
                    for (let i = 0; i < nodes.length; i++)
                        this.animateNodeEnter(nodes[i]);
                }
                attachFragmentAfterElement(elementRef, fragmentRef) {
                    var parentView = resolveInternalDomView(elementRef.renderView);
                    var element = parentView.boundElements[elementRef.boundElementIndex];
                    var nodes = resolveInternalDomFragment(fragmentRef);
                    moveNodesAfterSibling(element, nodes);
                    this.animateNodesEnter(nodes);
                }
                hydrateView(viewRef) { resolveInternalDomView(viewRef).hydrate(); }
                dehydrateView(viewRef) { resolveInternalDomView(viewRef).dehydrate(); }
                createTemplateAnchor(attrNameAndValues) {
                    return this.createElement('script', attrNameAndValues);
                }
                createText(value) { return dom_adapter_1.DOM.createTextNode(lang_1.isPresent(value) ? value : ''); }
                appendChild(parent, child) { dom_adapter_1.DOM.appendChild(parent, child); }
                setElementProperty(location, propertyName, propertyValue) {
                    var view = resolveInternalDomView(location.renderView);
                    dom_adapter_1.DOM.setProperty(view.boundElements[location.boundElementIndex], propertyName, propertyValue);
                }
                setElementAttribute(location, attributeName, attributeValue) {
                    var view = resolveInternalDomView(location.renderView);
                    var element = view.boundElements[location.boundElementIndex];
                    var dashCasedAttributeName = util_1.camelCaseToDashCase(attributeName);
                    if (lang_1.isPresent(attributeValue)) {
                        dom_adapter_1.DOM.setAttribute(element, dashCasedAttributeName, lang_1.stringify(attributeValue));
                    }
                    else {
                        dom_adapter_1.DOM.removeAttribute(element, dashCasedAttributeName);
                    }
                }
                setElementClass(location, className, isAdd) {
                    var view = resolveInternalDomView(location.renderView);
                    var element = view.boundElements[location.boundElementIndex];
                    if (isAdd) {
                        dom_adapter_1.DOM.addClass(element, className);
                    }
                    else {
                        dom_adapter_1.DOM.removeClass(element, className);
                    }
                }
                setElementStyle(location, styleName, styleValue) {
                    var view = resolveInternalDomView(location.renderView);
                    var element = view.boundElements[location.boundElementIndex];
                    var dashCasedStyleName = util_1.camelCaseToDashCase(styleName);
                    if (lang_1.isPresent(styleValue)) {
                        dom_adapter_1.DOM.setStyle(element, dashCasedStyleName, lang_1.stringify(styleValue));
                    }
                    else {
                        dom_adapter_1.DOM.removeStyle(element, dashCasedStyleName);
                    }
                }
                invokeElementMethod(location, methodName, args) {
                    var view = resolveInternalDomView(location.renderView);
                    var element = view.boundElements[location.boundElementIndex];
                    dom_adapter_1.DOM.invoke(element, methodName, args);
                }
                setText(viewRef, textNodeIndex, text) {
                    var view = resolveInternalDomView(viewRef);
                    dom_adapter_1.DOM.setText(view.boundTextNodes[textNodeIndex], text);
                }
                setEventDispatcher(viewRef, dispatcher) {
                    resolveInternalDomView(viewRef).setEventDispatcher(dispatcher);
                }
            }
            DomRenderer = DomRenderer;
            let DomRenderer_ = class extends DomRenderer {
                constructor(_eventManager, _domSharedStylesHost, _animate, document) {
                    super();
                    this._eventManager = _eventManager;
                    this._domSharedStylesHost = _domSharedStylesHost;
                    this._animate = _animate;
                    this._componentCmds = new Map();
                    this._nativeShadowStyles = new Map();
                    /** @internal */
                    this._createRootHostViewScope = profile_1.wtfCreateScope('DomRenderer#createRootHostView()');
                    /** @internal */
                    this._createViewScope = profile_1.wtfCreateScope('DomRenderer#createView()');
                    /** @internal */
                    this._detachFragmentScope = profile_1.wtfCreateScope('DomRenderer#detachFragment()');
                    this._document = document;
                }
                registerComponentTemplate(templateId, commands, styles, nativeShadow) {
                    this._componentCmds.set(templateId, commands);
                    if (nativeShadow) {
                        this._nativeShadowStyles.set(templateId, styles);
                    }
                    else {
                        this._domSharedStylesHost.addStyles(styles);
                    }
                }
                resolveComponentTemplate(templateId) {
                    return this._componentCmds.get(templateId);
                }
                createRootHostView(hostProtoViewRef, fragmentCount, hostElementSelector) {
                    var s = this._createRootHostViewScope();
                    var element = dom_adapter_1.DOM.querySelector(this._document, hostElementSelector);
                    if (lang_1.isBlank(element)) {
                        profile_1.wtfLeave(s);
                        throw new exceptions_1.BaseException(`The selector "${hostElementSelector}" did not match any elements`);
                    }
                    return profile_1.wtfLeave(s, this._createView(hostProtoViewRef, element));
                }
                createView(protoViewRef, fragmentCount) {
                    var s = this._createViewScope();
                    return profile_1.wtfLeave(s, this._createView(protoViewRef, null));
                }
                _createView(protoViewRef, inplaceElement) {
                    var view = view_factory_1.createRenderView(protoViewRef.cmds, inplaceElement, this);
                    var sdRoots = view.nativeShadowRoots;
                    for (var i = 0; i < sdRoots.length; i++) {
                        this._domSharedStylesHost.addHost(sdRoots[i]);
                    }
                    return new api_1.RenderViewWithFragments(view, view.fragments);
                }
                destroyView(viewRef) {
                    var view = viewRef;
                    var sdRoots = view.nativeShadowRoots;
                    for (var i = 0; i < sdRoots.length; i++) {
                        this._domSharedStylesHost.removeHost(sdRoots[i]);
                    }
                }
                animateNodeEnter(node) {
                    if (dom_adapter_1.DOM.isElementNode(node) && dom_adapter_1.DOM.hasClass(node, 'ng-animate')) {
                        dom_adapter_1.DOM.addClass(node, 'ng-enter');
                        this._animate.css()
                            .addAnimationClass('ng-enter-active')
                            .start(node)
                            .onComplete(() => { dom_adapter_1.DOM.removeClass(node, 'ng-enter'); });
                    }
                }
                animateNodeLeave(node) {
                    if (dom_adapter_1.DOM.isElementNode(node) && dom_adapter_1.DOM.hasClass(node, 'ng-animate')) {
                        dom_adapter_1.DOM.addClass(node, 'ng-leave');
                        this._animate.css()
                            .addAnimationClass('ng-leave-active')
                            .start(node)
                            .onComplete(() => {
                            dom_adapter_1.DOM.removeClass(node, 'ng-leave');
                            dom_adapter_1.DOM.remove(node);
                        });
                    }
                    else {
                        dom_adapter_1.DOM.remove(node);
                    }
                }
                detachFragment(fragmentRef) {
                    var s = this._detachFragmentScope();
                    var fragmentNodes = resolveInternalDomFragment(fragmentRef);
                    for (var i = 0; i < fragmentNodes.length; i++) {
                        this.animateNodeLeave(fragmentNodes[i]);
                    }
                    profile_1.wtfLeave(s);
                }
                createElement(name, attrNameAndValues) {
                    var el = dom_adapter_1.DOM.createElement(name);
                    this._setAttributes(el, attrNameAndValues);
                    return el;
                }
                mergeElement(existing, attrNameAndValues) {
                    dom_adapter_1.DOM.clearNodes(existing);
                    this._setAttributes(existing, attrNameAndValues);
                }
                _setAttributes(node, attrNameAndValues) {
                    for (var attrIdx = 0; attrIdx < attrNameAndValues.length; attrIdx += 2) {
                        dom_adapter_1.DOM.setAttribute(node, attrNameAndValues[attrIdx], attrNameAndValues[attrIdx + 1]);
                    }
                }
                createRootContentInsertionPoint() {
                    return dom_adapter_1.DOM.createComment('root-content-insertion-point');
                }
                createShadowRoot(host, templateId) {
                    var sr = dom_adapter_1.DOM.createShadowRoot(host);
                    var styles = this._nativeShadowStyles.get(templateId);
                    for (var i = 0; i < styles.length; i++) {
                        dom_adapter_1.DOM.appendChild(sr, dom_adapter_1.DOM.createStyleElement(styles[i]));
                    }
                    return sr;
                }
                on(element, eventName, callback) {
                    this._eventManager.addEventListener(element, eventName, decoratePreventDefault(callback));
                }
                globalOn(target, eventName, callback) {
                    return this._eventManager.addGlobalEventListener(target, eventName, decoratePreventDefault(callback));
                }
            };
            DomRenderer_ = __decorate([
                di_1.Injectable(),
                __param(3, di_1.Inject(dom_tokens_1.DOCUMENT))
            ], DomRenderer_);
            DomRenderer_ = DomRenderer_;
        }
    }
});
//# sourceMappingURL=dom_renderer.js.map