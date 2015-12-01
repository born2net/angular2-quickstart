var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { bootstrap, Component } from 'angular2/angular2';
let AppComponent = class {
    constructor() {
        console.log('my-app');
    }
};
AppComponent = __decorate([
    Component({
        selector: 'my-app',
        template: '<h1>My First Angular 2 App</h1>'
    })
], AppComponent);
bootstrap(AppComponent);
//# sourceMappingURL=App.js.map