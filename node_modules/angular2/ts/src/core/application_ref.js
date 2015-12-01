System.register(['angular2/src/core/zone/ng_zone', 'angular2/src/core/facade/lang', 'angular2/src/core/di', './application_tokens', 'angular2/src/core/facade/async', 'angular2/src/core/facade/collection', 'angular2/src/core/reflection/reflection', 'angular2/src/core/testability/testability', 'angular2/src/core/linker/dynamic_component_loader', 'angular2/src/core/facade/exceptions', 'angular2/src/core/dom/dom_adapter', 'angular2/src/core/linker/view_ref', 'angular2/src/core/life_cycle/life_cycle', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/linker/view_pool', 'angular2/src/core/linker/view_manager', 'angular2/src/core/linker/view_manager_utils', 'angular2/src/core/linker/view_listener', './linker/proto_view_factory', 'angular2/src/core/pipes', './linker/view_resolver', './linker/directive_resolver', './linker/pipe_resolver', 'angular2/src/core/linker/compiler', "./linker/dynamic_component_loader", "./linker/view_manager", "./linker/compiler"], function(exports_1) {
    var ng_zone_1, lang_1, di_1, application_tokens_1, async_1, collection_1, reflection_1, testability_1, dynamic_component_loader_1, exceptions_1, dom_adapter_1, view_ref_1, life_cycle_1, change_detection_1, view_pool_1, view_manager_1, view_manager_utils_1, view_listener_1, proto_view_factory_1, pipes_1, view_resolver_1, directive_resolver_1, pipe_resolver_1, compiler_1, dynamic_component_loader_2, view_manager_2, compiler_2;
    var _platform, PlatformRef, PlatformRef_, ApplicationRef, ApplicationRef_;
    /**
     * Constructs the set of providers meant for use at the platform level.
     *
     * These are providers that should be singletons shared among all Angular applications
     * running on the page.
     */
    function platformBindings() {
        return [di_1.provide(reflection_1.Reflector, { useValue: reflection_1.reflector }), testability_1.TestabilityRegistry];
    }
    exports_1("platformBindings", platformBindings);
    /**
     * Construct providers specific to an individual root component.
     */
    function _componentProviders(appComponentType) {
        return [
            di_1.provide(application_tokens_1.APP_COMPONENT, { useValue: appComponentType }),
            di_1.provide(application_tokens_1.APP_COMPONENT_REF_PROMISE, {
                useFactory: (dynamicComponentLoader, injector) => {
                    // TODO(rado): investigate whether to support bindings on root component.
                    return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector)
                        .then((componentRef) => {
                        if (lang_1.isPresent(componentRef.location.nativeElement)) {
                            injector.get(testability_1.TestabilityRegistry)
                                .registerApplication(componentRef.location.nativeElement, injector.get(testability_1.Testability));
                        }
                        return componentRef;
                    });
                },
                deps: [dynamic_component_loader_1.DynamicComponentLoader, di_1.Injector]
            }),
            di_1.provide(appComponentType, {
                useFactory: (p) => p.then(ref => ref.instance),
                deps: [application_tokens_1.APP_COMPONENT_REF_PROMISE]
            }),
        ];
    }
    /**
     * Construct a default set of providers which should be included in any Angular
     * application, regardless of whether it runs on the UI thread or in a web worker.
     */
    function applicationCommonBindings() {
        return [
            di_1.provide(compiler_1.Compiler, { useClass: compiler_2.Compiler_ }),
            application_tokens_1.APP_ID_RANDOM_PROVIDER,
            view_pool_1.AppViewPool,
            di_1.provide(view_pool_1.APP_VIEW_POOL_CAPACITY, { useValue: 10000 }),
            di_1.provide(view_manager_1.AppViewManager, { useClass: view_manager_2.AppViewManager_ }),
            view_manager_utils_1.AppViewManagerUtils,
            view_listener_1.AppViewListener,
            proto_view_factory_1.ProtoViewFactory,
            view_resolver_1.ViewResolver,
            pipes_1.DEFAULT_PIPES,
            di_1.provide(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
            di_1.provide(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
            directive_resolver_1.DirectiveResolver,
            pipe_resolver_1.PipeResolver,
            di_1.provide(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_2.DynamicComponentLoader_ }),
            di_1.provide(life_cycle_1.LifeCycle, {
                useFactory: (exceptionHandler) => new life_cycle_1.LifeCycle_(null, lang_1.assertionsEnabled()),
                deps: [exceptions_1.ExceptionHandler]
            })
        ];
    }
    exports_1("applicationCommonBindings", applicationCommonBindings);
    /**
     * Create an Angular zone.
     */
    function createNgZone() {
        return new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
    }
    exports_1("createNgZone", createNgZone);
    function platformCommon(bindings, initializer) {
        if (lang_1.isPresent(_platform)) {
            if (lang_1.isBlank(bindings)) {
                return _platform;
            }
            throw "platform() can only be called once per page";
        }
        if (lang_1.isPresent(initializer)) {
            initializer();
        }
        if (lang_1.isBlank(bindings)) {
            bindings = platformBindings();
        }
        _platform = new PlatformRef_(di_1.Injector.resolveAndCreate(bindings), () => { _platform = null; });
        return _platform;
    }
    exports_1("platformCommon", platformCommon);
    return {
        setters:[
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (application_tokens_1_1) {
                application_tokens_1 = application_tokens_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
            },
            function (dynamic_component_loader_1_1) {
                dynamic_component_loader_1 = dynamic_component_loader_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            },
            function (life_cycle_1_1) {
                life_cycle_1 = life_cycle_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
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
            function (view_listener_1_1) {
                view_listener_1 = view_listener_1_1;
            },
            function (proto_view_factory_1_1) {
                proto_view_factory_1 = proto_view_factory_1_1;
            },
            function (pipes_1_1) {
                pipes_1 = pipes_1_1;
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
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (dynamic_component_loader_2_1) {
                dynamic_component_loader_2 = dynamic_component_loader_2_1;
            },
            function (view_manager_2_1) {
                view_manager_2 = view_manager_2_1;
            },
            function (compiler_2_1) {
                compiler_2 = compiler_2_1;
            }],
        execute: function() {
            var _platform;
            /**
             * The Angular platform is the entry point for Angular on a web page. Each page
             * has exactly one platform, and services (such as reflection) which are common
             * to every Angular application running on the page are bound in its scope.
             *
             * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
             * explicitly by calling {@link platform}().
             */
            class PlatformRef {
                /**
                 * Retrieve the platform {@link Injector}, which is the parent injector for
                 * every Angular application on the page and provides singleton providers.
                 */
                get injector() { return exceptions_1.unimplemented(); }
                ;
            }
            PlatformRef = PlatformRef;
            class PlatformRef_ extends PlatformRef {
                constructor(_injector, _dispose) {
                    super();
                    this._injector = _injector;
                    this._dispose = _dispose;
                    /** @internal */
                    this._applications = [];
                }
                get injector() { return this._injector; }
                application(bindings) {
                    var app = this._initApp(createNgZone(), bindings);
                    return app;
                }
                asyncApplication(bindingFn) {
                    var zone = createNgZone();
                    var completer = async_1.PromiseWrapper.completer();
                    zone.run(() => {
                        async_1.PromiseWrapper.then(bindingFn(zone), (bindings) => {
                            completer.resolve(this._initApp(zone, bindings));
                        });
                    });
                    return completer.promise;
                }
                _initApp(zone, providers) {
                    var injector;
                    var app;
                    zone.run(() => {
                        providers.push(di_1.provide(ng_zone_1.NgZone, { useValue: zone }));
                        providers.push(di_1.provide(ApplicationRef, { useFactory: () => app, deps: [] }));
                        var exceptionHandler;
                        try {
                            injector = this.injector.resolveAndCreateChild(providers);
                            exceptionHandler = injector.get(exceptions_1.ExceptionHandler);
                            zone.overrideOnErrorHandler((e, s) => exceptionHandler.call(e, s));
                        }
                        catch (e) {
                            if (lang_1.isPresent(exceptionHandler)) {
                                exceptionHandler.call(e, e.stack);
                            }
                            else {
                                dom_adapter_1.DOM.logError(e);
                            }
                        }
                    });
                    app = new ApplicationRef_(this, zone, injector);
                    this._applications.push(app);
                    return app;
                }
                dispose() {
                    this._applications.forEach((app) => app.dispose());
                    this._dispose();
                }
                /** @internal */
                _applicationDisposed(app) { collection_1.ListWrapper.remove(this._applications, app); }
            }
            PlatformRef_ = PlatformRef_;
            /**
             * A reference to an Angular application running on a page.
             *
             * For more about Angular applications, see the documentation for {@link bootstrap}.
             */
            class ApplicationRef {
                /**
                 * Retrieve the application {@link Injector}.
                 */
                get injector() { return exceptions_1.unimplemented(); }
                ;
                /**
                 * Retrieve the application {@link NgZone}.
                 */
                get zone() { return exceptions_1.unimplemented(); }
                ;
                /**
                 * Get a list of component types registered to this application.
                 */
                get componentTypes() { return exceptions_1.unimplemented(); }
                ;
            }
            ApplicationRef = ApplicationRef;
            class ApplicationRef_ extends ApplicationRef {
                constructor(_platform, _zone, _injector) {
                    super();
                    this._platform = _platform;
                    this._zone = _zone;
                    this._injector = _injector;
                    this._bootstrapListeners = [];
                    this._rootComponents = [];
                    this._rootComponentTypes = [];
                }
                registerBootstrapListener(listener) {
                    this._bootstrapListeners.push(listener);
                }
                bootstrap(componentType, providers) {
                    var completer = async_1.PromiseWrapper.completer();
                    this._zone.run(() => {
                        var componentProviders = _componentProviders(componentType);
                        if (lang_1.isPresent(providers)) {
                            componentProviders.push(providers);
                        }
                        var exceptionHandler = this._injector.get(exceptions_1.ExceptionHandler);
                        this._rootComponentTypes.push(componentType);
                        try {
                            var injector = this._injector.resolveAndCreateChild(componentProviders);
                            var compRefToken = injector.get(application_tokens_1.APP_COMPONENT_REF_PROMISE);
                            var tick = (componentRef) => {
                                var appChangeDetector = view_ref_1.internalView(componentRef.hostView).changeDetector;
                                var lc = injector.get(life_cycle_1.LifeCycle);
                                lc.registerWith(this._zone, appChangeDetector);
                                lc.tick();
                                completer.resolve(componentRef);
                                this._rootComponents.push(componentRef);
                                this._bootstrapListeners.forEach((listener) => listener(componentRef));
                            };
                            var tickResult = async_1.PromiseWrapper.then(compRefToken, tick);
                            async_1.PromiseWrapper.then(tickResult, (_) => { });
                            async_1.PromiseWrapper.then(tickResult, null, (err, stackTrace) => completer.reject(err, stackTrace));
                        }
                        catch (e) {
                            exceptionHandler.call(e, e.stack);
                            completer.reject(e, e.stack);
                        }
                    });
                    return completer.promise;
                }
                get injector() { return this._injector; }
                get zone() { return this._zone; }
                dispose() {
                    // TODO(alxhub): Dispose of the NgZone.
                    this._rootComponents.forEach((ref) => ref.dispose());
                    this._platform._applicationDisposed(this);
                }
                get componentTypes() { return this._rootComponentTypes; }
            }
            ApplicationRef_ = ApplicationRef_;
        }
    }
});
//# sourceMappingURL=application_ref.js.map