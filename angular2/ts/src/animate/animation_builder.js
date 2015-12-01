var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Injectable } from 'angular2/src/core/di';
import { CssAnimationBuilder } from './css_animation_builder';
export let AnimationBuilder = class {
    /**
     * Used for DI
     * @param browserDetails
     */
    constructor(browserDetails) {
        this.browserDetails = browserDetails;
    }
    /**
     * Creates a new CSS Animation
     * @returns {CssAnimationBuilder}
     */
    css() { return new CssAnimationBuilder(this.browserDetails); }
};
AnimationBuilder = __decorate([
    Injectable()
], AnimationBuilder);
//# sourceMappingURL=animation_builder.js.map