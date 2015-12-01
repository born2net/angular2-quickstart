System.register(['./facade/lang', './facade/async', './facade/exceptions'], function(exports_1) {
    return {
        setters:[
            function (lang_1_1) {
                exports_1({
                    "ConcreteType": lang_1_1["ConcreteType"],
                    "Type": lang_1_1["Type"]
                });
            },
            function (async_1_1) {
                exports_1({
                    "Observable": async_1_1["Observable"],
                    "EventEmitter": async_1_1["EventEmitter"]
                });
            },
            function (exceptions_1_1) {
                exports_1({
                    "WrappedException": exceptions_1_1["WrappedException"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=facade.js.map