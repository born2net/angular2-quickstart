System.register(['angular2/src/web_workers/shared/post_message_bus', 'angular2/src/web_workers/ui/impl', 'angular2/src/web_workers/shared/message_bus'], function(exports_1) {
    var post_message_bus_1, impl_1;
    var WebWorkerInstance;
    /**
     * Bootstrapping a WebWorker
     *
     * You instantiate a WebWorker application by calling bootstrap with the URI of your worker's index
     * script
     * Note: The WebWorker script must call bootstrapWebworker once it is set up to complete the
     * bootstrapping process
     */
    function bootstrap(uri) {
        var instance = spawnWebWorker(uri);
        instance.app = impl_1.bootstrapUICommon(instance.bus);
        return instance;
    }
    exports_1("bootstrap", bootstrap);
    function spawnWebWorker(uri) {
        var webWorker = new Worker(uri);
        var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
        var source = new post_message_bus_1.PostMessageBusSource(webWorker);
        var bus = new post_message_bus_1.PostMessageBus(sink, source);
        return new WebWorkerInstance(null, webWorker, bus);
    }
    exports_1("spawnWebWorker", spawnWebWorker);
    var exportedNames_1 = {
        'WebWorkerInstance': true,
        'bootstrap': true,
        'spawnWebWorker': true,
        'WebWorkerApplication': true
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
            function (impl_1_1) {
                impl_1 = impl_1_1;
                exports_1({
                    "WebWorkerApplication": impl_1_1["WebWorkerApplication"]
                });
            },
            function (message_bus_1_1) {
                exportStar_1(message_bus_1_1);
            }],
        execute: function() {
            /**
             * Wrapper class that exposes the {@link WebWorkerApplication}
             * Isolate instance and underlying {@link MessageBus} for lower level message passing.
             */
            class WebWorkerInstance {
                constructor(app, worker, bus) {
                    this.app = app;
                    this.worker = worker;
                    this.bus = bus;
                }
            }
            WebWorkerInstance = WebWorkerInstance;
        }
    }
});
//# sourceMappingURL=application.js.map