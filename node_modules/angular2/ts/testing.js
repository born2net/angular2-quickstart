System.register(['./src/testing/testing', './src/testing/test_component_builder', './src/testing/test_injector', './src/testing/fake_async'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (testing_1_1) {
                exportStar_1(testing_1_1);
            },
            function (test_component_builder_1_1) {
                exportStar_1(test_component_builder_1_1);
            },
            function (test_injector_1_1) {
                exportStar_1(test_injector_1_1);
            },
            function (fake_async_1_1) {
                exportStar_1(fake_async_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=testing.js.map