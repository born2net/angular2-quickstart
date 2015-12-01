System.register(['../lifecycle_hooks', '../src/core/metadata', '../src/core/util', '../src/core/di', '../src/core/pipes', '../src/core/facade', '../src/core/application_ref', '../src/core/services', '../src/core/linker', '../src/core/lifecycle', '../src/core/zone', '../src/core/render/render', '../src/core/directives', '../src/core/forms', '../src/core/debug', '../src/core/change_detection', '../profile', '../src/web_workers/worker/application', '../src/web_workers/shared/client_message_broker', '../src/web_workers/shared/service_message_broker', '../src/web_workers/shared/serializer'], function(exports_1) {
    var exportedNames_1 = {
        'RenderEventDispatcher': true,
        'Renderer': true,
        'RenderElementRef': true,
        'RenderViewRef': true,
        'RenderProtoViewRef': true,
        'RenderFragmentRef': true,
        'RenderViewWithFragments': true,
        'RenderTemplateCmd': true,
        'RenderCommandVisitor': true,
        'RenderTextCmd': true,
        'RenderNgContentCmd': true,
        'RenderBeginElementCmd': true,
        'RenderBeginComponentCmd': true,
        'RenderEmbeddedTemplateCmd': true,
        'RenderBeginCmd': true,
        'ClientMessageBroker': true,
        'ClientMessageBrokerFactory': true,
        'FnArg': true,
        'UiArguments': true,
        'ReceivedMessage': true,
        'ServiceMessageBroker': true,
        'ServiceMessageBrokerFactory': true,
        'PRIMITIVE': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (lifecycle_hooks_1_1) {
                exportStar_1(lifecycle_hooks_1_1);
            },
            function (metadata_1_1) {
                exportStar_1(metadata_1_1);
            },
            function (util_1_1) {
                exportStar_1(util_1_1);
            },
            function (di_1_1) {
                exportStar_1(di_1_1);
            },
            function (pipes_1_1) {
                exportStar_1(pipes_1_1);
            },
            function (facade_1_1) {
                exportStar_1(facade_1_1);
            },
            function (application_ref_1_1) {
                exportStar_1(application_ref_1_1);
            },
            function (services_1_1) {
                exportStar_1(services_1_1);
            },
            function (linker_1_1) {
                exportStar_1(linker_1_1);
            },
            function (lifecycle_1_1) {
                exportStar_1(lifecycle_1_1);
            },
            function (zone_1_1) {
                exportStar_1(zone_1_1);
            },
            function (render_1_1) {
                exports_1({
                    "RenderEventDispatcher": render_1_1["RenderEventDispatcher"],
                    "Renderer": render_1_1["Renderer"],
                    "RenderElementRef": render_1_1["RenderElementRef"],
                    "RenderViewRef": render_1_1["RenderViewRef"],
                    "RenderProtoViewRef": render_1_1["RenderProtoViewRef"],
                    "RenderFragmentRef": render_1_1["RenderFragmentRef"],
                    "RenderViewWithFragments": render_1_1["RenderViewWithFragments"],
                    "RenderTemplateCmd": render_1_1["RenderTemplateCmd"],
                    "RenderCommandVisitor": render_1_1["RenderCommandVisitor"],
                    "RenderTextCmd": render_1_1["RenderTextCmd"],
                    "RenderNgContentCmd": render_1_1["RenderNgContentCmd"],
                    "RenderBeginElementCmd": render_1_1["RenderBeginElementCmd"],
                    "RenderBeginComponentCmd": render_1_1["RenderBeginComponentCmd"],
                    "RenderEmbeddedTemplateCmd": render_1_1["RenderEmbeddedTemplateCmd"],
                    "RenderBeginCmd": render_1_1["RenderBeginCmd"]
                });
            },
            function (directives_1_1) {
                exportStar_1(directives_1_1);
            },
            function (forms_1_1) {
                exportStar_1(forms_1_1);
            },
            function (debug_1_1) {
                exportStar_1(debug_1_1);
            },
            function (change_detection_1_1) {
                exportStar_1(change_detection_1_1);
            },
            function (profile_1_1) {
                exportStar_1(profile_1_1);
            },
            function (application_1_1) {
                exportStar_1(application_1_1);
            },
            function (client_message_broker_1_1) {
                exports_1({
                    "ClientMessageBroker": client_message_broker_1_1["ClientMessageBroker"],
                    "ClientMessageBrokerFactory": client_message_broker_1_1["ClientMessageBrokerFactory"],
                    "FnArg": client_message_broker_1_1["FnArg"],
                    "UiArguments": client_message_broker_1_1["UiArguments"]
                });
            },
            function (service_message_broker_1_1) {
                exports_1({
                    "ReceivedMessage": service_message_broker_1_1["ReceivedMessage"],
                    "ServiceMessageBroker": service_message_broker_1_1["ServiceMessageBroker"],
                    "ServiceMessageBrokerFactory": service_message_broker_1_1["ServiceMessageBrokerFactory"]
                });
            },
            function (serializer_1_1) {
                exports_1({
                    "PRIMITIVE": serializer_1_1["PRIMITIVE"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=worker.js.map