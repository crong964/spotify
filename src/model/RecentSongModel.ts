import SongModel from "./SongModel";

export default class RecentSongModel extends SongModel {
    liked: number;
    personal_View: number;
    constructor() {
        super()
        this.personal_View = 0
        this.liked = 0;
    }
}

