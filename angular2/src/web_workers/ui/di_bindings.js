'use strict';// TODO (jteplitz602): This whole file is nearly identical to core/application.ts.
// There should be a way to refactor application so that this file is unnecessary. See #3277
var di_1 = require("angular2/src/core/di");
var pipes_1 = require('angular2/src/core/pipes');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var browser_details_1 = require('angular2/src/animate/browser_details');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var event_manager_1 = require('angular2/src/core/render/dom/events/event_manager');
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var browser_adapter_1 = require('angular2/src/core/dom/browser_adapter');
var key_events_1 = require('angular2/src/core/render/dom/events/key_events');
var hammer_gestures_1 = require('angular2/src/core/render/dom/events/hammer_gestures');
var view_pool_1 = require('angular2/src/core/linker/view_pool');
var api_1 = require('angular2/src/core/render/api');
var app_root_url_1 = require('angular2/src/core/compiler/app_root_url');
var render_1 = require('angular2/src/core/render/render');
var application_tokens_1 = require('angular2/src/core/application_tokens');
var element_schema_registry_1 = require('angular2/src/core/compiler/schema/element_schema_registry');
var dom_element_schema_registry_1 = require('angular2/src/core/compiler/schema/dom_element_schema_registry');
var shared_styles_host_1 = require('angular2/src/core/render/dom/shared_styles_host');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
var view_manager_utils_1 = require('angular2/src/core/linker/view_manager_utils');
var view_listener_1 = require('angular2/src/core/linker/view_listener');
var view_resolver_1 = require('angular2/src/core/linker/view_resolver');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var dynamic_component_loader_1 = require('angular2/src/core/linker/dynamic_component_loader');
var url_resolver_1 = require('angular2/src/core/compiler/url_resolver');
var testability_1 = require('angular2/src/core/testability/testability');
var xhr_1 = require('angular2/src/core/compiler/xhr');
var xhr_impl_1 = require('angular2/src/core/compiler/xhr_impl');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_2 = require('angular2/src/web_workers/shared/api');
var render_proto_view_ref_store_1 = require('angular2/src/web_workers/shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('angular2/src/web_workers/shared/render_view_with_fragments_store');
var anchor_based_app_root_url_1 = require('angular2/src/core/compiler/anchor_based_app_root_url');
var impl_1 = require('angular2/src/web_workers/ui/impl');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var renderer_1 = require('angular2/src/web_workers/ui/renderer');
var xhr_impl_2 = require('angular2/src/web_workers/ui/xhr_impl');
var setup_1 = require('angular2/src/web_workers/ui/setup');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var _rootInjector;
// Contains everything that is safe to share between applications.
var _rootProviders = [di_1.provide(reflection_1.Reflector, { useValue: reflection_1.reflector })];
// TODO: This code is nearly identical to core/application. There should be a way to only write it
// once
function _injectorProviders() {
    return [
        di_1.provide(render_1.DOCUMENT, { useValue: dom_adapter_1.DOM.defaultDoc() }),
        event_manager_1.EventManager,
        new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: event_manager_1.DomEventsPlugin, multi: true }),
        new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
        new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
        di_1.provide(render_1.DomRenderer, { useClass: render_1.DomRenderer_ }),
        di_1.provide(api_1.Renderer, { useExisting: render_1.DomRenderer }),
        application_tokens_1.APP_ID_RANDOM_PROVIDER,
        shared_styles_host_1.DomSharedStylesHost,
        di_1.provide(shared_styles_host_1.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
        serializer_1.Serializer,
        di_1.provide(api_2.ON_WEB_WORKER, { useValue: false }),
        di_1.provide(element_schema_registry_1.ElementSchemaRegistry, { useValue: new dom_element_schema_registry_1.DomElementSchemaRegistry() }),
        render_view_with_fragments_store_1.RenderViewWithFragmentsStore,
        render_proto_view_ref_store_1.RenderProtoViewRefStore,
        view_pool_1.AppViewPool,
        di_1.provide(view_pool_1.APP_VIEW_POOL_CAPACITY, { useValue: 10000 }),
        di_1.provide(view_manager_1.AppViewManager, { useClass: view_manager_1.AppViewManager_ }),
        view_manager_utils_1.AppViewManagerUtils,
        view_listener_1.AppViewListener,
        proto_view_factory_1.ProtoViewFactory,
        view_resolver_1.ViewResolver,
        pipes_1.DEFAULT_PIPES,
        directive_resolver_1.DirectiveResolver,
        change_detection_1.Parser,
        change_detection_1.Lexer,
        di_1.provide(exceptions_1.ExceptionHandler, { useFactory: function () { return new exceptions_1.ExceptionHandler(dom_adapter_1.DOM); }, deps: [] }),
        di_1.provide(xhr_1.XHR, { useValue: new xhr_impl_1.XHRImpl() }),
        url_resolver_1.UrlResolver,
        di_1.provide(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_1.DynamicComponentLoader_ }),
        testability_1.Testability,
        anchor_based_app_root_url_1.AnchorBasedAppRootUrl,
        di_1.provide(app_root_url_1.AppRootUrl, { useExisting: anchor_based_app_root_url_1.AnchorBasedAppRootUrl }),
        impl_1.WebWorkerApplication,
        setup_1.WebWorkerSetup,
        xhr_impl_2.MessageBasedXHRImpl,
        renderer_1.MessageBasedRenderer,
        di_1.provide(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
        di_1.provide(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }),
        browser_details_1.BrowserDetails,
        animation_builder_1.AnimationBuilder
    ];
}
function createInjector(zone, bus) {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    _rootProviders.push(di_1.provide(ng_zone_1.NgZone, { useValue: zone }));
    _rootProviders.push(di_1.provide(message_bus_1.MessageBus, { useValue: bus }));
    var injector = di_1.Injector.resolveAndCreate(_rootProviders);
    return injector.resolveAndCreateChild(_injectorProviders());
}
exports.createInjector = createInjector;
//# sourceMappingURL=di_bindings.js.map