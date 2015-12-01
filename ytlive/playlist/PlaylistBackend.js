export class LocalStoragePlayList {
    addConcert(concert) {
        var playlist = this.getPlaylistInternal();
        if (!playlist.some(c => c.id === concert.id)) {
            playlist.unshift(concert);
        }
        localStorage.setItem(LocalStoragePlayList.PLAYLIST_KEY, JSON.stringify(playlist));
    }
    removeConcert(id) {
        var playlist = this.getPlaylistInternal();
        playlist = playlist.filter(c => c.id !== id);
        localStorage.setItem(LocalStoragePlayList.PLAYLIST_KEY, JSON.stringify(playlist));
    }
    getPlaylist() {
        return this.getPlaylistInternal();
    }
    getPlaylistInternal() {
        var playlistString = localStorage.getItem(LocalStoragePlayList.PLAYLIST_KEY);
        var playlist = playlistString ? JSON.parse(playlistString) : [];
        if (!playlistString) {
            localStorage.setItem(LocalStoragePlayList.PLAYLIST_KEY, JSON.stringify(playlist));
        }
        return playlist;
    }
}
LocalStoragePlayList.PLAYLIST_KEY = 'ytlive-playlist';
//# sourceMappingURL=PlaylistBackend.js.map