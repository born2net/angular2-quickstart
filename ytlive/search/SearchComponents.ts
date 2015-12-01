import { Component, View, NgFor, NgIf, FORM_DIRECTIVES, Inject } from 'angular2/angular2';
import { LocalStoragePlayList } from '../playlist/PlaylistBackend';
import * as ytbackend from './YTLiveBackend';

@Component({
  selector: 'search-result',
  properties: ["concert"],
  providers: [LocalStoragePlayList]
})
@View({
  templateUrl: "ytlive/search/searchresult.html",
  directives: []
})
class SearchResultComponent {
  concert: ytbackend.ConcertSummary

  constructor(@Inject(LocalStoragePlayList) private playlistService: LocalStoragePlayList,
     @Inject(ytbackend.VideoPlayer) private videoPlayer: ytbackend.VideoPlayer) {}

  addToPlaylist(concert: ytbackend.ConcertSummary) {
    this.playlistService.addConcert(concert);
  }

  playConcert(id: string) {
    this.videoPlayer.playConcert(id);
  }
}

@Component({
  selector: 'search',
  providers: [ytbackend.ConcertService]
})
@View({
  templateUrl: "ytlive/search/search.html",
  directives: [NgFor, NgIf, SearchResultComponent, FORM_DIRECTIVES]
})
export class SearchComponent {
  searchTerm: string;
  duration: string;

  concerts: ytbackend.ConcertSummary[] = [];

  //constructor(private concertService: ytbackend.ConcertService,
  //    private videoPlayer: ytbackend.VideoPlayer) { }

    private concertService: ytbackend.ConcertService;
    private videoPlayer: ytbackend.VideoPlayer;

    constructor(@Inject(ytbackend.ConcertService) i_concertService: ytbackend.ConcertService, @Inject(ytbackend.VideoPlayer) i_videoPlayer: ytbackend.VideoPlayer) {
        this.concertService = i_concertService;
        this.videoPlayer = i_videoPlayer;
    }

  get playing() {
    return this.videoPlayer.isPlaying;
  }

  get embedUrl() {
    return this.videoPlayer.currentVideoUrl;
  }

  searchConcerts(): void {
    this.videoPlayer.stop();
    this.concertService
      .findConcerts(this.searchTerm)
      .subscribe((results: ytbackend.ConcertSummary[]) => this.concerts = results);
  }

}
