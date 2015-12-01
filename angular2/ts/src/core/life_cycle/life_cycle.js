System.register(['angular2/src/core/di', 'angular2/src/core/facade/lang', 'angular2/src/core/facade/exceptions', '../profile/profile'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var di_1, lang_1, exceptions_1, profile_1;
    var LifeCycle, LifeCycle_;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            }],
        execute: function() {
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
            class LifeCycle {
            }
            LifeCycle = LifeCycle;
            let LifeCycle_ = class extends LifeCycle {
                constructor(changeDetector = null, enforceNoNewChanges = false) {
                    super();
                    /** @internal */
                    this._runningTick = false;
                    this._changeDetectors = [];
                    if (lang_1.isPresent(changeDetector)) {
                        this._changeDetectors.push(changeDetector);
                    }
                    this._enforceNoNewChanges = enforceNoNewChanges;
                }
                registerWith(zone, changeDetector = null) {
                    if (lang_1.isPresent(changeDetector)) {
                        this._changeDetectors.push(changeDetector);
                    }
                    zone.overrideOnTurnDone(() => this.tick());
                }
                tick() {
                    if (this._runningTick) {
                        throw new exceptions_1.BaseException("LifeCycle.tick is called recursively");
                    }
                    var s = LifeCycle_._tickScope();
                    try {
                        this._runningTick = true;
                        this._changeDetectors.forEach((detector) => detector.detectChanges());
                        if (this._enforceNoNewChanges) {
                            this._changeDetectors.forEach((detector) => detector.checkNoChanges());
                        }
                    }
                    finally {
                        this._runningTick = false;
                        profile_1.wtfLeave(s);
                    }
                }
            };
            LifeCycle_._tickScope = profile_1.wtfCreateScope('LifeCycle#tick()');
            LifeCycle_ = __decorate([
                di_1.Injectable()
            ], LifeCycle_);
            LifeCycle_ = LifeCycle_;
        }
    }
});
//# sourceMappingURL=life_cycle.js.map