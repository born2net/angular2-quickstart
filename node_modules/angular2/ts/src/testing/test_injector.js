System.register(['angular2/src/core/di', 'angular2/src/core/pipes', 'angular2/src/animate/animation_builder', 'angular2/src/mock/animation_builder_mock', 'angular2/src/core/linker/proto_view_factory', 'angular2/src/core/reflection/reflection', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/facade/exceptions', 'angular2/src/core/linker/view_resolver', 'angular2/src/core/linker/directive_resolver', 'angular2/src/core/linker/pipe_resolver', 'angular2/src/core/linker/dynamic_component_loader', 'angular2/src/core/compiler/xhr', 'angular2/src/core/zone/ng_zone', 'angular2/src/core/dom/dom_adapter', 'angular2/src/core/render/dom/events/event_manager', 'angular2/src/mock/directive_resolver_mock', 'angular2/src/mock/view_resolver_mock', 'angular2/src/mock/mock_location_strategy', 'angular2/src/router/location_strategy', 'angular2/src/mock/ng_zone_mock', './test_component_builder', 'angular2/src/core/debug', 'angular2/src/core/facade/collection', 'angular2/src/core/facade/lang', 'angular2/src/core/linker/view_pool', 'angular2/src/core/linker/view_manager', 'angular2/src/core/linker/view_manager_utils', 'angular2/src/core/render/api', 'angular2/src/core/render/render', 'angular2/src/core/application_tokens', "angular2/src/web_workers/shared/serializer", './utils', 'angular2/src/core/compiler/compiler', "angular2/src/core/render/dom/dom_renderer", "angular2/src/core/linker/dynamic_component_loader", "angular2/src/core/linker/view_manager"], function(exports_1) {
    var di_1, pipes_1, animation_builder_1, animation_builder_mock_1, proto_view_factory_1, reflection_1, change_detection_1, exceptions_1, view_resolver_1, directive_resolver_1, pipe_resolver_1, dynamic_component_loader_1, xhr_1, ng_zone_1, dom_adapter_1, event_manager_1, directive_resolver_mock_1, view_resolver_mock_1, mock_location_strategy_1, location_strategy_1, ng_zone_mock_1, test_component_builder_1, di_2, debug_1, collection_1, lang_1, view_pool_1, view_manager_1, view_manager_utils_1, api_1, render_1, application_tokens_1, serializer_1, utils_1, compiler_1, dom_renderer_1, dynamic_component_loader_2, view_manager_2;
    var FunctionWithParamTokens;
    /**
     * Returns the root injector providers.
     *
     * This must be kept in sync with the _rootBindings in application.js
     *
     * @returns {any[]}
     */
    function _getRootProviders() {
        return [di_1.provide(reflection_1.Reflector, { useValue: reflection_1.reflector })];
    }
    /**
     * Returns the application injector providers.
     *
     * This must be kept in sync with _injectorBindings() in application.js
     *
     * @returns {any[]}
     */
    function _getAppBindings() {
        var appDoc;
        // The document is only available in browser environment
        try {
            appDoc = dom_adapter_1.DOM.defaultDoc();
        }
        catch (e) {
            appDoc = null;
        }
        return [
            compiler_1.compilerProviders(),
            di_1.provide(change_detection_1.ChangeDetectorGenConfig, { useValue: new change_detection_1.ChangeDetectorGenConfig(true, true, false, true) }),
            di_1.provide(render_1.DOCUMENT, { useValue: appDoc }),
            di_1.provide(render_1.DomRenderer, { useClass: dom_renderer_1.DomRenderer_ }),
            di_1.provide(api_1.Renderer, { useExisting: render_1.DomRenderer }),
            di_1.provide(application_tokens_1.APP_ID, { useValue: 'a' }),
            render_1.DomSharedStylesHost,
            di_1.provide(render_1.SharedStylesHost, { useExisting: render_1.DomSharedStylesHost }),
            view_pool_1.AppViewPool,
            di_1.provide(view_manager_1.AppViewManager, { useClass: view_manager_2.AppViewManager_ }),
            view_manager_utils_1.AppViewManagerUtils,
            serializer_1.Serializer,
            debug_1.ELEMENT_PROBE_PROVIDERS,
            di_1.provide(view_pool_1.APP_VIEW_POOL_CAPACITY, { useValue: 500 }),
            proto_view_factory_1.ProtoViewFactory,
            di_1.provide(directive_resolver_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
            di_1.provide(view_resolver_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
            pipes_1.DEFAULT_PIPES,
            di_1.provide(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
            di_1.provide(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
            utils_1.Log,
            di_1.provide(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_2.DynamicComponentLoader_ }),
            pipe_resolver_1.PipeResolver,
            di_1.provide(exceptions_1.ExceptionHandler, { useValue: new exceptions_1.ExceptionHandler(dom_adapter_1.DOM) }),
            di_1.provide(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
            di_1.provide(xhr_1.XHR, { useClass: dom_adapter_1.DOM.getXHR() }),
            test_component_builder_1.TestComponentBuilder,
            di_1.provide(ng_zone_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
            di_1.provide(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
            event_manager_1.EventManager,
            new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: event_manager_1.DomEventsPlugin, multi: true })
        ];
    }
    function createTestInjector(providers) {
        var rootInjector = di_2.Injector.resolveAndCreate(_getRootProviders());
        return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), providers));
    }
    exports_1("createTestInjector", createTestInjector);
    /**
     * Allows injecting dependencies in `beforeEach()` and `it()`.
     *
     * Example:
     *
     * ```
     * beforeEach(inject([Dependency, AClass], (dep, object) => {
     *   // some code that uses `dep` and `object`
     *   // ...
     * }));
     *
     * it('...', inject([AClass, AsyncTestCompleter], (object, async) => {
     *   object.doSomething().then(() => {
     *     expect(...);
     *     async.done();
     *   });
     * })
     * ```
     *
     * Notes:
     * - injecting an `AsyncTestCompleter` allow completing async tests - this is the equivalent of
     *   adding a `done` parameter in Jasmine,
     * - inject is currently a function because of some Traceur limitation the syntax should eventually
     *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
     *
     * @param {Array} tokens
     * @param {Function} fn
     * @return {FunctionWithParamTokens}
     */
    function inject(tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, false);
    }
    exports_1("inject", inject);
    function injectAsync(tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, true);
    }
    exports_1("injectAsync", injectAsync);
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (pipes_1_1) {
                pipes_1 = pipes_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (animation_builder_mock_1_1) {
                animation_builder_mock_1 = animation_builder_mock_1_1;
            },
            function (proto_view_factory_1_1) {
                proto_view_factory_1 = proto_view_factory_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            },
            function (dynamic_component_loader_1_1) {
                dynamic_component_loader_1 = dynamic_component_loader_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (directive_resolver_mock_1_1) {
                directive_resolver_mock_1 = directive_resolver_mock_1_1;
            },
            function (view_resolver_mock_1_1) {
                view_resolver_mock_1 = view_resolver_mock_1_1;
            },
            function (mock_location_strategy_1_1) {
                mock_location_strategy_1 = mock_location_strategy_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (ng_zone_mock_1_1) {
                ng_zone_mock_1 = ng_zone_mock_1_1;
            },
            function (test_component_builder_1_1) {
                test_component_builder_1 = test_component_builder_1_1;
            },
            function (debug_1_1) {
                debug_1 = debug_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (view_pool_1_1) {
                view_pool_1 = view_pool_1_1;
            },
            function (view_manager_1_1) {
                view_manager_1 = view_manager_1_1;
            },
            function (view_manager_utils_1_1) {
                view_manager_utils_1 = view_manager_utils_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (render_1_1) {
                render_1 = render_1_1;
            },
            function (application_tokens_1_1) {
                application_tokens_1 = application_tokens_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (dynamic_component_loader_2_1) {
                dynamic_component_loader_2 = dynamic_component_loader_2_1;
            },
            function (view_manager_2_1) {
                view_manager_2 = view_manager_2_1;
            }],
        execute: function() {
            class FunctionWithParamTokens {
                constructor(_tokens, _fn, isAsync) {
                    this._tokens = _tokens;
                    this._fn = _fn;
                    this.isAsync = isAsync;
                }
                /**
                 * Returns the value of the executed function.
                 */
                execute(injector) {
                    var params = this._tokens.map(t => injector.get(t));
                    return lang_1.FunctionWrapper.apply(this._fn, params);
                }
                hasToken(token) { return this._tokens.indexOf(token) > -1; }
            }
            FunctionWithParamTokens = FunctionWithParamTokens;
        }
    }
});
//# sourceMappingURL=test_injector.js.map