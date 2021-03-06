'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/core/facade/lang');
var di_1 = require('angular2/src/core/di');
var metadata_1 = require('angular2/src/core/metadata');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
/**
 * Implements lowercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text lowercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp",
 *   template: "Username: {{ user | lowercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 */
var LowerCasePipe = (function () {
    function LowerCasePipe() {
    }
    LowerCasePipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        if (lang_1.isBlank(value))
            return value;
        if (!lang_1.isString(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LowerCasePipe, value);
        }
        return lang_1.StringWrapper.toLowerCase(value);
    };
    LowerCasePipe = __decorate([
        lang_1.CONST(),
        metadata_1.Pipe({ name: 'lowercase' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LowerCasePipe);
    return LowerCasePipe;
})();
exports.LowerCasePipe = LowerCasePipe;
//# sourceMappingURL=lowercase_pipe.js.map