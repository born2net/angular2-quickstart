System.register(['angular2/src/web_workers/shared/post_message_bus', "angular2/src/web_workers/worker/application_common", "angular2/src/web_workers/shared/message_bus", 'angular2/src/core/dom/parse5_adapter'], function(exports_1) {
    var post_message_bus_1, application_common_1, parse5_adapter_1;
    var _postMessage;
    /**
     * Bootstrapping a Webworker Application
     *
     * You instantiate the application side by calling bootstrapWebworker from your webworker index
     * script.
     * You can call bootstrapWebworker() exactly as you would call bootstrap() in a regular Angular
     * application
     * See the bootstrap() docs for more details.
     */
    function bootstrapWebWorker(appComponentType, componentInjectableProviders = null) {
        parse5_adapter_1.Parse5DomAdapter.makeCurrent();
        var sink = new post_message_bus_1.PostMessageBusSink({
            postMessage: (message, transferrables) => {
                console.log("Sending", message);
                _postMessage(message, transferrables);
            }
        });
        var source = new post_message_bus_1.PostMessageBusSource();
        var bus = new post_message_bus_1.PostMessageBus(sink, source);
        return application_common_1.bootstrapWebWorkerCommon(appComponentType, bus, componentInjectableProviders);
    }
    exports_1("bootstrapWebWorker", bootstrapWebWorker);
    var exportedNames_1 = {
        'bootstrapWebWorker': true
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
            function (post_message_bus_1_1) {
                post_message_bus_1 = post_message_bus_1_1;
            },
            function (application_common_1_1) {
                application_common_1 = application_common_1_1;
            },
            function (message_bus_1_1) {
                exportStar_1(message_bus_1_1);
            },
            function (parse5_adapter_1_1) {
                parse5_adapter_1 = parse5_adapter_1_1;
            }],
        execute: function() {
            var _postMessage = postMessage;
        }
    }
});
//# sourceMappingURL=application.js.map