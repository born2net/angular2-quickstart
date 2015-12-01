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
import { Component, View, NgFor, NgIf, FORM_DIRECTIVES, Inject } from 'angular2/angular2';
import { LocalStoragePlayList } from '../playlist/PlaylistBackend';
import * as ytbackend from './YTLiveBackend';
let SearchResultComponent = class {
    constructor(playlistService, videoPlayer) {
        this.playlistService = playlistService;
        this.videoPlayer = videoPlayer;
    }
    addToPlaylist(concert) {
        this.playlistService.addConcert(concert);
    }
    playConcert(id) {
        this.videoPlayer.playConcert(id);
    }
};
SearchResultComponent = __decorate([
    Component({
        selector: 'search-result',
        properties: ["concert"],
        providers: [LocalStoragePlayList]
    }),
    View({
        templateUrl: "ytlive/search/searchresult.html",
        directives: []
    }),
    __param(0, Inject(LocalStoragePlayList)),
    __param(1, Inject(ytbackend.VideoPlayer))
], SearchResultComponent);
export let SearchComponent = class {
    constructor(i_concertService, i_videoPlayer) {
        this.concerts = [];
        this.concertService = i_concertService;
        this.videoPlayer = i_videoPlayer;
    }
    get playing() {
        return this.videoPlayer.isPlaying;
    }
    get embedUrl() {
        return this.videoPlayer.currentVideoUrl;
    }
    searchConcerts() {
        this.videoPlayer.stop();
        this.concertService
            .findConcerts(this.searchTerm)
            .subscribe((results) => this.concerts = results);
    }
};
SearchComponent = __decorate([
    Component({
        selector: 'search',
        providers: [ytbackend.ConcertService]
    }),
    View({
        templateUrl: "ytlive/search/search.html",
        directives: [NgFor, NgIf, SearchResultComponent, FORM_DIRECTIVES]
    }),
    __param(0, Inject(ytbackend.ConcertService)),
    __param(1, Inject(ytbackend.VideoPlayer))
], SearchComponent);
//# sourceMappingURL=SearchComponents.js.map