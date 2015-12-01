/**
 * @module
 * @description
 * This module provides advanced support for extending dom strategy.
 */
System.register(['./dom/shared_styles_host', './dom/dom_renderer', './dom/dom_tokens', './api'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (shared_styles_host_1_1) {
                exportStar_1(shared_styles_host_1_1);
            },
            function (dom_renderer_1_1) {
                exportStar_1(dom_renderer_1_1);
            },
            function (dom_tokens_1_1) {
                exportStar_1(dom_tokens_1_1);
            },
            function (api_1_1) {
                exportStar_1(api_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=render.js.map