var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Injectable } from 'angular2/src/core/di';
/**
 * Listener for view creation / destruction.
 */
export let AppViewListener = class {
    viewCreated(view) { }
    viewDestroyed(view) { }
};
AppViewListener = __decorate([
    Injectable()
], AppViewListener);
//# sourceMappingURL=view_listener.js.map