var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Component, View, bootstrap } from 'angular2/angular2';
import { HTTP_PROVIDERS } from 'angular2/http';
import { VideoPlayer } from './search/YTLiveBackend';
import { PlaylistComponent } from './playlist/PlaylistComponents';
import { SearchComponent } from './search/SearchComponents';
let YTLiveComponent = class {
    constructor() {
        console.log('ytlive');
    }
};
YTLiveComponent = __decorate([
    Component({
        selector: 'yt-live',
        providers: [VideoPlayer],
    }),
    View({
        template: `
    <h1>YouTube live!</h1>
    <div class="container">
        <div class="row">
            <div class="col-md-4 column">
                <div class="row"></div>
                <div class="row"><h4>Stored concerts:</h4></div>
                <playlist></playlist>
            </div>
            <div class="col-md-8 column">
                <search></search>
            </div>
        </div>
    </div>
    `,
        directives: [SearchComponent, PlaylistComponent]
    })
], YTLiveComponent);
bootstrap(YTLiveComponent, [HTTP_PROVIDERS]);
//# sourceMappingURL=ytlive.js.map