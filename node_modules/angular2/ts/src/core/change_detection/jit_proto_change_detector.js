System.register(['./change_detection_jit_generator'], function(exports_1) {
    var change_detection_jit_generator_1;
    var JitProtoChangeDetector;
    return {
        setters:[
            function (change_detection_jit_generator_1_1) {
                change_detection_jit_generator_1 = change_detection_jit_generator_1_1;
            }],
        execute: function() {
            class JitProtoChangeDetector {
                constructor(definition) {
                    this.definition = definition;
                    this._factory = this._createFactory(definition);
                }
                static isSupported() { return true; }
                instantiate(dispatcher) { return this._factory(dispatcher); }
                /** @internal */
                _createFactory(definition) {
                    return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, 'util', 'AbstractChangeDetector').generate();
                }
            }
            JitProtoChangeDetector = JitProtoChangeDetector;
        }
    }
});
//# sourceMappingURL=jit_proto_change_detector.js.map