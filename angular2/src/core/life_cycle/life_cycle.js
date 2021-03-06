'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var profile_1 = require('../profile/profile');
/**
 * Provides access to explicitly trigger change detection in an application.
 *
 * By default, `Zone` triggers change detection in Angular on each virtual machine (VM) turn. When
 * testing, or in some
 * limited application use cases, a developer can also trigger change detection with the
 * `lifecycle.tick()` method.
 *
 * Each Angular application has a single `LifeCycle` instance.
 *
 * # Example
 *
 * This is a contrived example, since the bootstrap automatically runs inside of the `Zone`, which
 * invokes
 * `lifecycle.tick()` on your behalf.
 *
 * ```javascript
 * bootstrap(MyApp).then((ref:ComponentRef) => {
 *   var lifeCycle = ref.injector.get(LifeCycle);
 *   var myApp = ref.instance;
 *
 *   ref.doSomething();
 *   lifecycle.tick();
 * });
 * ```
 */
var LifeCycle = (function () {
    function LifeCycle() {
    }
    return LifeCycle;
})();
exports.LifeCycle = LifeCycle;
var LifeCycle_ = (function (_super) {
    __extends(LifeCycle_, _super);
    function LifeCycle_(changeDetector, enforceNoNewChanges) {
        if (changeDetector === void 0) { changeDetector = null; }
        if (enforceNoNewChanges === void 0) { enforceNoNewChanges = false; }
        _super.call(this);
        /** @internal */
        this._runningTick = false;
        this._changeDetectors = [];
        if (lang_1.isPresent(changeDetector)) {
            this._changeDetectors.push(changeDetector);
        }
        this._enforceNoNewChanges = enforceNoNewChanges;
    }
    LifeCycle_.prototype.registerWith = function (zone, changeDetector) {
        var _this = this;
        if (changeDetector === void 0) { changeDetector = null; }
        if (lang_1.isPresent(changeDetector)) {
            this._changeDetectors.push(changeDetector);
        }
        zone.overrideOnTurnDone(function () { return _this.tick(); });
    };
    LifeCycle_.prototype.tick = function () {
        if (this._runningTick) {
            throw new exceptions_1.BaseException("LifeCycle.tick is called recursively");
        }
        var s = LifeCycle_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectors.forEach(function (detector) { return detector.detectChanges(); });
            if (this._enforceNoNewChanges) {
                this._changeDetectors.forEach(function (detector) { return detector.checkNoChanges(); });
            }
        }
        finally {
            this._runningTick = false;
            profile_1.wtfLeave(s);
        }
    };
    LifeCycle_._tickScope = profile_1.wtfCreateScope('LifeCycle#tick()');
    LifeCycle_ = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [Object, Boolean])
    ], LifeCycle_);
    return LifeCycle_;
})(LifeCycle);
exports.LifeCycle_ = LifeCycle_;
//# sourceMappingURL=life_cycle.js.map