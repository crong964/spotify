import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AudioRedux {
  stop: boolean;
  modplay: number;
  lsSong: Song[];
  mark: number;
  random: boolean;
  autoplay: boolean;
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
  random: false,
  lsSong: [],
  stop: true,
  modplay: 0,
  mark: 0,
  autoplay: false,
};

const audioSlice = createSlice({
  initialState,
  name: "audioroot",
  reducers: {
    SetStop: (state, pay: PayloadAction<boolean>) => {
      state.stop = pay.payload;
    },
    SetModPlay: (state) => {
      state.modplay = (state.modplay + 1) % 3;
    },
    SetSongs: (state, pay: PayloadAction<Song[]>) => {
      state.lsSong = pay.payload;
      state.lsSong = state.lsSong.map((v, i) => {
        v.oldindex = i;
        return v;
      });
      state.mark = 0;
      if (state.lsSong[state.mark]) {
        localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
      }
    },
    NextSong: (state, pay: PayloadAction<number>) => {
      state.mark = state.mark + pay.payload;
      if (state.lsSong[state.mark]) {
        localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
      }
    },
    RepeatPlaylist: (state) => {
      state.mark = state.mark + 1;
      if (state.mark == state.lsSong.length) {
        state.mark = 0;
      }
      if (state.lsSong[state.mark]) {
        localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
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
    },
    JumpingSong: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.lsSong.length; i++) {
        const element = state.lsSong[i];
        if (element.Id == action.payload) {
          state.mark = i;
          break;
        }
      }
    },
    SetAutoPlay: (state, action: PayloadAction<boolean>) => {
      state.autoplay = action.payload;
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
} = audioSlice.actions;
export default audioSlice;
