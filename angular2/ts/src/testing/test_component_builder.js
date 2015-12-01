System.register(['angular2/src/core/di', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/collection', 'angular2/src/core/linker/directive_resolver', 'angular2/src/core/linker/view_resolver', 'angular2/src/core/linker/view_ref', 'angular2/src/core/linker/dynamic_component_loader', './utils', 'angular2/src/core/render/render', 'angular2/src/core/dom/dom_adapter', 'angular2/src/core/debug/debug_element'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, lang_1, collection_1, directive_resolver_1, view_resolver_1, view_ref_1, dynamic_component_loader_1, utils_1, render_1, dom_adapter_1, debug_element_1;
    var RootTestComponent, RootTestComponent_, _nextRootElementId, TestComponentBuilder;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            },
            function (dynamic_component_loader_1_1) {
                dynamic_component_loader_1 = dynamic_component_loader_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (render_1_1) {
                render_1 = render_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (debug_element_1_1) {
                debug_element_1 = debug_element_1_1;
            }],
        execute: function() {
            class RootTestComponent {
            }
            RootTestComponent = RootTestComponent;
            class RootTestComponent_ extends RootTestComponent {
                constructor(componentRef) {
                    super();
                    this.debugElement = new debug_element_1.DebugElement_(view_ref_1.internalView(componentRef.hostView), 0);
                    this._componentParentView = view_ref_1.internalView(componentRef.hostView);
                    this._componentRef = componentRef;
                }
                detectChanges() {
                    this._componentParentView.changeDetector.detectChanges();
                    this._componentParentView.changeDetector.checkNoChanges();
                }
                destroy() { this._componentRef.dispose(); }
            }
            RootTestComponent_ = RootTestComponent_;
            var _nextRootElementId = 0;
            /**
             * Builds a RootTestComponent for use in component level tests.
             */
            let TestComponentBuilder = class {
                constructor(_injector) {
                    this._injector = _injector;
                    /** @internal */
                    this._bindingsOverrides = new Map();
                    /** @internal */
                    this._directiveOverrides = new Map();
                    /** @internal */
                    this._templateOverrides = new Map();
                    /** @internal */
                    this._viewBindingsOverrides = new Map();
                    /** @internal */
                    this._viewOverrides = new Map();
                }
                /** @internal */
                _clone() {
                    var clone = new TestComponentBuilder(this._injector);
                    clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
                    clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
                    clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
                    return clone;
                }
                /**
                 * Overrides only the html of a {@link ComponentMetadata}.
                 * All the other properties of the component's {@link ViewMetadata} are preserved.
                 *
                 * @param {Type} component
                 * @param {string} html
                 *
                 * @return {TestComponentBuilder}
                 */
                overrideTemplate(componentType, template) {
                    var clone = this._clone();
                    clone._templateOverrides.set(componentType, template);
                    return clone;
                }
                /**
                 * Overrides a component's {@link ViewMetadata}.
                 *
                 * @param {Type} component
                 * @param {view} View
                 *
                 * @return {TestComponentBuilder}
                 */
                overrideView(componentType, view) {
                    var clone = this._clone();
                    clone._viewOverrides.set(componentType, view);
                    return clone;
                }
                /**
                 * Overrides the directives from the component {@link ViewMetadata}.
                 *
                 * @param {Type} component
                 * @param {Type} from
                 * @param {Type} to
                 *
                 * @return {TestComponentBuilder}
                 */
                overrideDirective(componentType, from, to) {
                    var clone = this._clone();
                    var overridesForComponent = clone._directiveOverrides.get(componentType);
                    if (!lang_1.isPresent(overridesForComponent)) {
                        clone._directiveOverrides.set(componentType, new Map());
                        overridesForComponent = clone._directiveOverrides.get(componentType);
                    }
                    overridesForComponent.set(from, to);
                    return clone;
                }
                /**
                 * Overrides one or more injectables configured via `providers` metadata property of a directive
                 * or
                 * component.
                 * Very useful when certain providers need to be mocked out.
                 *
                 * The providers specified via this method are appended to the existing `providers` causing the
                 * duplicated providers to
                 * be overridden.
                 *
                 * @param {Type} component
                 * @param {any[]} providers
                 *
                 * @return {TestComponentBuilder}
                 */
                overrideProviders(type, providers) {
                    var clone = this._clone();
                    clone._bindingsOverrides.set(type, providers);
                    return clone;
                }
                /**
                 * @deprecated
                 */
                overrideBindings(type, providers) {
                    return this.overrideProviders(type, providers);
                }
                /**
                 * Overrides one or more injectables configured via `providers` metadata property of a directive
                 * or
                 * component.
                 * Very useful when certain providers need to be mocked out.
                 *
                 * The providers specified via this method are appended to the existing `providers` causing the
                 * duplicated providers to
                 * be overridden.
                 *
                 * @param {Type} component
                 * @param {any[]} providers
                 *
                 * @return {TestComponentBuilder}
                 */
                overrideViewProviders(type, providers) {
                    var clone = this._clone();
                    clone._viewBindingsOverrides.set(type, providers);
                    return clone;
                }
                /**
                 * @deprecated
                 */
                overrideViewBindings(type, providers) {
                    return this.overrideViewProviders(type, providers);
                }
                /**
                 * Builds and returns a RootTestComponent.
                 *
                 * @return {Promise<RootTestComponent>}
                 */
                createAsync(rootComponentType) {
                    var mockDirectiveResolver = this._injector.get(directive_resolver_1.DirectiveResolver);
                    var mockViewResolver = this._injector.get(view_resolver_1.ViewResolver);
                    this._viewOverrides.forEach((view, type) => mockViewResolver.setView(type, view));
                    this._templateOverrides.forEach((template, type) => mockViewResolver.setInlineTemplate(type, template));
                    this._directiveOverrides.forEach((overrides, component) => {
                        overrides.forEach((to, from) => { mockViewResolver.overrideViewDirective(component, from, to); });
                    });
                    this._bindingsOverrides.forEach((bindings, type) => mockDirectiveResolver.setBindingsOverride(type, bindings));
                    this._viewBindingsOverrides.forEach((bindings, type) => mockDirectiveResolver.setViewBindingsOverride(type, bindings));
                    var rootElId = `root${_nextRootElementId++}`;
                    var rootEl = utils_1.el(`<div id="${rootElId}"></div>`);
                    var doc = this._injector.get(render_1.DOCUMENT);
                    // TODO(juliemr): can/should this be optional?
                    var oldRoots = dom_adapter_1.DOM.querySelectorAll(doc, '[id^=root]');
                    for (var i = 0; i < oldRoots.length; i++) {
                        dom_adapter_1.DOM.remove(oldRoots[i]);
                    }
                    dom_adapter_1.DOM.appendChild(doc.body, rootEl);
                    return this._injector.get(dynamic_component_loader_1.DynamicComponentLoader)
                        .loadAsRoot(rootComponentType, `#${rootElId}`, this._injector)
                        .then((componentRef) => { return new RootTestComponent_(componentRef); });
                }
            };
            TestComponentBuilder = __decorate([
                di_1.Injectable()
            ], TestComponentBuilder);
            TestComponentBuilder = TestComponentBuilder;
        }
    }
});
//# sourceMappingURL=test_component_builder.js.map