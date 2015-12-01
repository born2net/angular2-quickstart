System.register(['angular2/src/core/facade/lang', './enums', 'angular2/src/core/facade/exceptions'], function(exports_1) {
    var lang_1, enums_1, exceptions_1;
    function normalizeMethodName(method) {
        if (lang_1.isString(method)) {
            var originalMethod = method;
            method = method.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
            method = enums_1.RequestMethods[method];
            if (typeof method !== 'number')
                throw exceptions_1.makeTypeError(`Invalid request method. The method "${originalMethod}" is not supported.`);
        }
        return method;
    }
    exports_1("normalizeMethodName", normalizeMethodName);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                exports_1({
                    "isJsObject": lang_1_1["isJsObject"]
                });
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=http_utils.js.map