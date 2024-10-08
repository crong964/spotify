export type iSong = {
    Id: string;
    user_id: string;
    SongName: string;
    Singer: string;
    Duration: string;
    Viewer: number;
    SongImage: string;
    filePath: string;
    stt: number;
    status: number;
};
export type iSongList = {
    data: iSong[];
};