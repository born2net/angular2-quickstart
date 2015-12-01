var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Component, View, NgFor } from 'angular2/angular2';
import { LocalStoragePlayList } from './PlaylistBackend';
let PlaylistEntryComponent = class {
    constructor(playlistService, videoPlayer) {
        this.playlistService = playlistService;
        this.videoPlayer = videoPlayer;
    }
    removeEntry(concert) {
        this.playlistService.removeConcert(concert.id);
    }
    playConcert(id) {
        this.videoPlayer.playConcert(id);
    }
};
PlaylistEntryComponent = __decorate([
    Component({
        selector: 'playlist-entry',
        properties: ["entry"]
    }),
    View({
        templateUrl: "ytlive/playlist/playlistentry.html"
    })
], PlaylistEntryComponent);
export let PlaylistComponent = class {
    constructor(playlistService) {
        this.playlistService = playlistService;
    }
    get entries() {
        return this.playlistService.getPlaylist();
    }
};
PlaylistComponent = __decorate([
    Component({
        selector: 'playlist',
        providers: [LocalStoragePlayList]
    }),
    View({
        templateUrl: "ytlive/playlist/playlist.html",
        directives: [NgFor, PlaylistEntryComponent]
    })
], PlaylistComponent);
//# sourceMappingURL=PlaylistComponents.js.map