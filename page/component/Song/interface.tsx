export interface Song {
  image: string;
  name: string;
  singer: string;
  Id: string;
  user_id: string;
  onClick(): void;
}
export interface SongList {
  data: SongInPlayList[];
  type: string;
}
export interface SongInPlayList {
    Id: string;
    user_id: string;
    SongName: string;
    Singer: string;
    Duration: string;
    Viewer: number;
    SongImage: string;
    filePath: string;
    liked: string;
    stt: number;
    type: string;
  }