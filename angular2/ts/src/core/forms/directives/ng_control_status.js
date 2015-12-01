var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive } from 'angular2/src/core/metadata';
import { Self } from 'angular2/src/core/di';
import { isPresent } from 'angular2/src/core/facade/lang';
export let NgControlStatus = class {
    constructor(cd) {
        this._cd = cd;
    }
    get ngClassUntouched() {
        return isPresent(this._cd.control) ? this._cd.control.untouched : false;
    }
    get ngClassTouched() {
        return isPresent(this._cd.control) ? this._cd.control.touched : false;
    }
    get ngClassPristine() {
        return isPresent(this._cd.control) ? this._cd.control.pristine : false;
    }
    get ngClassDirty() {
        return isPresent(this._cd.control) ? this._cd.control.dirty : false;
    }
    get ngClassValid() {
        return isPresent(this._cd.control) ? this._cd.control.valid : false;
    }
    get ngClassInvalid() {
        return isPresent(this._cd.control) ? !this._cd.control.valid : false;
    }
};
NgControlStatus = __decorate([
    Directive({
        selector: '[ng-control],[ng-model],[ng-form-control]',
        host: {
            '[class.ng-untouched]': 'ngClassUntouched',
            '[class.ng-touched]': 'ngClassTouched',
            '[class.ng-pristine]': 'ngClassPristine',
            '[class.ng-dirty]': 'ngClassDirty',
            '[class.ng-valid]': 'ngClassValid',
            '[class.ng-invalid]': 'ngClassInvalid'
        }
    }),
    __param(0, Self())
], NgControlStatus);
//# sourceMappingURL=ng_control_status.js.map