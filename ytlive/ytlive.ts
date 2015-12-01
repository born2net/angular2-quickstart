import { Component, View, bootstrap } from 'angular2/angular2';
import { HTTP_PROVIDERS } from 'angular2/http'
import { VideoPlayer } from './search/YTLiveBackend';
import { PlaylistComponent } from './playlist/PlaylistComponents'
import { SearchComponent } from './search/SearchComponents';

@Component({
    selector: 'yt-live',
    providers: [VideoPlayer],

})
@View({
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

class YTLiveComponent {
    constructor(){
        console.log('ytlive')
    }
}
bootstrap(YTLiveComponent, [HTTP_PROVIDERS]);