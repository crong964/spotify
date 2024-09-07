import { iHelp } from "@/page/socket/Socket";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AudioRedux {
  stop: boolean;
  modplay: number;
  lsSong: Song[];
  mark: number;
  random: boolean;
  autoplay: boolean;
  playlistmobile: boolean;
}
interface Song {
  oldindex: number;
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: number;
  SongImage: string;
  filePath: string;
}
const initialState: AudioRedux = {
  playlistmobile: false,
  random: false,
  lsSong: JSON.parse(localStorage.getItem("songs") || "[]"),
  stop: true,
  modplay: parseInt(localStorage.getItem("moplay") || "0"),
  mark: parseInt(localStorage.getItem("mark") || "0"),
  autoplay: false,
};

const audioSlice = createSlice({
  initialState,
  name: "audioroot",
  reducers: {
    SetStop: (state, pay: PayloadAction<boolean>) => {
      state.stop = pay.payload;
      state.autoplay = true;
    },
    SetModPlay: (state) => {
      state.modplay = (state.modplay + 1) % 3;
      localStorage.setItem("moplay", state.modplay + "");
    },
    SetSongs: (state, pay: PayloadAction<Song[]>) => {
      state.lsSong = pay.payload;
      state.lsSong = state.lsSong.map((v, i) => {
        v.oldindex = i;
        return v;
      });
      state.mark = 0;
      localStorage.setItem("songs", JSON.stringify(state.lsSong));
      localStorage.setItem("mark", "0");
      if (state.lsSong[state.mark]) {
        localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
        let s = state.lsSong[state.mark];
        iHelp.Title(`${s.SongName} • ${s.Singer}`);
      }
    },
    NextSong: (state, pay: PayloadAction<number>) => {
      state.mark = state.mark + pay.payload;
      if (state.lsSong[state.mark]) {
        localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
        localStorage.setItem("mark", JSON.stringify(state.mark));
        let s = state.lsSong[state.mark];
        iHelp.Title(`${s.SongName} • ${s.Singer}`);
      }
    },
    RepeatPlaylist: (state) => {
      state.mark = state.mark + 1;
      if (state.mark == state.lsSong.length) {
        state.mark = 0;
        localStorage.setItem("mark", JSON.stringify(state.mark));
      }
      if (state.lsSong[state.mark]) {
        localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
        let s = state.lsSong[state.mark];
        iHelp.Title(`${s.SongName} • ${s.Singer}`);
      }
    },
    RandomSong: (state) => {
      state.random = !state.random;
      let newSongList: any[] = [];

      newSongList.push(state.lsSong[state.mark]);
      state.lsSong.splice(state.mark, 1);

      state.mark = 0;
      while (state.lsSong.length > 0) {
        let i = parseInt(`${(Math.random() * 100) % state.lsSong.length}`);

        newSongList.push(state.lsSong[i]);
        state.lsSong.splice(i, 1);
      }

      state.lsSong = newSongList;
      localStorage.setItem("songs", JSON.stringify(state.lsSong));
    },
    JumpingSong: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.lsSong.length; i++) {
        const element = state.lsSong[i];
        if (element.Id == action.payload) {
          state.mark = i;
          let s = state.lsSong[state.mark];
          iHelp.Title(`${s.SongName} • ${s.Singer}`);
          localStorage.setItem(
            "song",
            JSON.stringify(state.lsSong[state.mark])
          );
          localStorage.setItem("mark", JSON.stringify(state.mark));
          break;
        }
      }
    },
    SetAutoPlay: (state, action: PayloadAction<boolean>) => {
      state.autoplay = action.payload;
    },
    SetPlaylistmobile: (state, action: PayloadAction<boolean>) => {
      state.playlistmobile = !state.playlistmobile;
    },
  },
  extraReducers(builder) {},
});

export const {
  SetStop,
  SetModPlay,
  SetSongs,
  NextSong,
  JumpingSong,
  RepeatPlaylist,
  RandomSong,
  SetAutoPlay,
  SetPlaylistmobile,
} = audioSlice.actions;
export default audioSlice;
