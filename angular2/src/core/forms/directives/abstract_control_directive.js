'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var AbstractControlDirective = (function () {
    function AbstractControlDirective() {
    }
    Object.defineProperty(AbstractControlDirective.prototype, "control", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "value", {
        get: function () { return lang_1.isPresent(this.control) ? this.control.value : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "valid", {
        get: function () { return lang_1.isPresent(this.control) ? this.control.valid : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "errors", {
        get: function () {
            return lang_1.isPresent(this.control) ? this.control.errors : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
        get: function () { return lang_1.isPresent(this.control) ? this.control.pristine : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
        get: function () { return lang_1.isPresent(this.control) ? this.control.dirty : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "touched", {
        get: function () { return lang_1.isPresent(this.control) ? this.control.touched : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
        get: function () { return lang_1.isPresent(this.control) ? this.control.untouched : null; },
        enumerable: true,
        configurable: true
    });
    return AbstractControlDirective;
})();
exports.AbstractControlDirective = AbstractControlDirective;
//# sourceMappingURL=abstract_control_directive.js.map