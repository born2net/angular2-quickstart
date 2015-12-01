System.register(['./debug/debug_element', './debug/debug_element_view_listener'], function(exports_1) {
    return {
        setters:[
            function (debug_element_1_1) {
                exports_1({
                    "DebugElement": debug_element_1_1["DebugElement"],
                    "asNativeElements": debug_element_1_1["asNativeElements"],
                    "By": debug_element_1_1["By"],
                    "Scope": debug_element_1_1["Scope"],
                    "inspectElement": debug_element_1_1["inspectElement"]
                });
            },
            function (debug_element_view_listener_1_1) {
                exports_1({
                    "inspectNativeElement": debug_element_view_listener_1_1["inspectNativeElement"],
                    "ELEMENT_PROBE_PROVIDERS": debug_element_view_listener_1_1["ELEMENT_PROBE_PROVIDERS"],
                    "ELEMENT_PROBE_BINDINGS": debug_element_view_listener_1_1["ELEMENT_PROBE_BINDINGS"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=debug.js.map