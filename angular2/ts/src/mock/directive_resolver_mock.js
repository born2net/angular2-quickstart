System.register(['angular2/src/core/facade/collection', 'angular2/src/core/facade/lang', '../core/metadata', 'angular2/src/core/linker/directive_resolver'], function(exports_1) {
    var collection_1, lang_1, metadata_1, directive_resolver_1;
    var MockDirectiveResolver;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            }],
        execute: function() {
            class MockDirectiveResolver extends directive_resolver_1.DirectiveResolver {
                constructor(...args) {
                    super(...args);
                    this._providerOverrides = new collection_1.Map();
                    this.viewProviderOverrides = new collection_1.Map();
                }
                resolve(type) {
                    var dm = super.resolve(type);
                    var providerOverrides = this._providerOverrides.get(type);
                    var viewProviderOverrides = this.viewProviderOverrides.get(type);
                    var providers = dm.providers;
                    if (lang_1.isPresent(providerOverrides)) {
                        providers = dm.providers.concat(providerOverrides);
                    }
                    if (dm instanceof metadata_1.ComponentMetadata) {
                        var viewProviders = dm.viewProviders;
                        if (lang_1.isPresent(viewProviderOverrides)) {
                            viewProviders = dm.viewProviders.concat(viewProviderOverrides);
                        }
                        return new metadata_1.ComponentMetadata({
                            selector: dm.selector,
                            inputs: dm.inputs,
                            outputs: dm.outputs,
                            host: dm.host,
                            exportAs: dm.exportAs,
                            moduleId: dm.moduleId,
                            queries: dm.queries,
                            changeDetection: dm.changeDetection,
                            providers: providers,
                            viewProviders: viewProviders
                        });
                    }
                    return new metadata_1.DirectiveMetadata({
                        selector: dm.selector,
                        inputs: dm.inputs,
                        outputs: dm.outputs,
                        host: dm.host,
                        providers: providers,
                        exportAs: dm.exportAs,
                        moduleId: dm.moduleId,
                        queries: dm.queries
                    });
                }
                /**
                 * @deprecated
                 */
                setBindingsOverride(type, bindings) {
                    this._providerOverrides.set(type, bindings);
                }
                /**
                 * @deprecated
                 */
                setViewBindingsOverride(type, viewBindings) {
                    this.viewProviderOverrides.set(type, viewBindings);
                }
                setProvidersOverride(type, bindings) {
                    this._providerOverrides.set(type, bindings);
                }
                setViewProvidersOverride(type, viewBindings) {
                    this.viewProviderOverrides.set(type, viewBindings);
                }
            }
            MockDirectiveResolver = MockDirectiveResolver;
        }
    }
});
//# sourceMappingURL=directive_resolver_mock.js.map