System.register(['../src/core/facade', '../src/core/zone', "../src/web_workers/ui/application", "../src/web_workers/shared/client_message_broker", "../src/web_workers/shared/service_message_broker", '../src/web_workers/shared/serializer'], function(exports_1) {
    var exportedNames_1 = {
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
            function (facade_1_1) {
                exportStar_1(facade_1_1);
            },
            function (zone_1_1) {
                exportStar_1(zone_1_1);
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
//# sourceMappingURL=ui.js.map