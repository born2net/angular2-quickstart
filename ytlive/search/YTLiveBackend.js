var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Injectable } from 'angular2/angular2';
var API_KEY = 'AIzaSyC83IjzPJwZjYWWdfWXpzCJteyYIMDzgLY';
var yt_search = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=' +
    API_KEY + '&videoCategoryId=10&videoEmbeddable=true&type=video&videoDuration=';
var yt_embed = 'https://www.youtube.com/embed/';
export class ConcertSummary {
    constructor(id, previewImg, title, desc) {
        this.id = id;
        this.previewImg = previewImg;
        this.title = title;
        this.desc = desc;
    }
}
export var Duration;
(function (Duration) {
    Duration[Duration["SONG"] = 0] = "SONG";
    Duration[Duration["SET"] = 1] = "SET";
    Duration[Duration["FULLCONCERT"] = 2] = "FULLCONCERT";
})(Duration || (Duration = {}));
export class VideoPlayer {
    constructor() {
        this.isPlaying = false;
    }
    playConcert(id) {
        console.log('service play', id);
        this.isPlaying = true;
        this.currentVideoUrl = this.concertIdToEmbedUrl(id);
    }
    stop() {
        this.isPlaying = false;
        this.currentVideoUrl = undefined;
    }
    concertIdToEmbedUrl(id) {
        return yt_embed + id + '?showinfo=0&autoplay=1';
    }
}
export let ConcertService = class {
    constructor(http) {
        this.http = http;
    }
    findConcerts(artist, duration = Duration.FULLCONCERT) {
        var ytDuration;
        switch (duration) {
            case Duration.SONG:
                ytDuration = 'short';
                break;
            case Duration.SET:
                ytDuration = 'medium';
                break;
            case Duration.FULLCONCERT:
                ytDuration = 'long';
                break;
        }
        var searchString = yt_search + ytDuration + '&q=' + encodeURIComponent('live ' + artist);
        return this.http.get(searchString).map((res) => {
            var ytResults = res.json();
            var transformedResults = ytResults.items.map(this.toConcertSummary);
            this.concerts = transformedResults;
            return transformedResults;
        });
    }
    getConcert(id) {
        return this.concerts.filter(c => c.id === id)[0];
    }
    toConcertSummary(result) {
        var desc = result.snippet.description || "No description available";
        return new ConcertSummary(result.id.videoId, result.snippet.thumbnails.medium.url, result.snippet.title, desc);
    }
};
ConcertService = __decorate([
    Injectable()
], ConcertService);
//# sourceMappingURL=YTLiveBackend.js.map