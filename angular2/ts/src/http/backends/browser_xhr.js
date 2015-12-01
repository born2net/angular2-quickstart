System.register(['angular2/angular2'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var angular2_1;
    var BrowserXhr;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            // Make sure not to evaluate this in a non-browser environment!
            let BrowserXhr = class {
                constructor() {
                }
                build() { return (new XMLHttpRequest()); }
            };
            BrowserXhr = __decorate([
                angular2_1.Injectable()
            ], BrowserXhr);
            BrowserXhr = BrowserXhr;
        }
    }
});
//# sourceMappingURL=browser_xhr.js.map