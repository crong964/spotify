import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface AudioRedux {
  stop: boolean;
  modplay: number;
  lsSong: Song[];
  mark: number;
}
interface Song {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: number;
  SongImage: string;
  filePath: string;
}
const initialState: AudioRedux = {
  lsSong: [],
  stop: true,
  modplay: 0,
  mark: 0,
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
    SetSong: (state, pay: PayloadAction<Song[]>) => {
      state.lsSong = pay.payload;
      state.mark = 0;
    },
    NextSong: (state, pay: PayloadAction<number>) => {
      state.mark = state.mark + pay.payload;
    },
  },
});

export const { SetStop, SetModPlay, SetSong, NextSong } = audioSlice.actions;
export default audioSlice;
