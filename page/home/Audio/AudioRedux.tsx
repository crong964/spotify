import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { post } from "../../config/req";
import { useDispatch } from "react-redux";

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
    SetSongs: (state, pay: PayloadAction<Song[]>) => {
      state.lsSong = pay.payload;
      state.mark = 0;
      localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
    },
    NextSong: (state, pay: PayloadAction<number>) => {
      state.mark = state.mark + pay.payload;
      localStorage.setItem("song", JSON.stringify(state.lsSong[state.mark]));
    },
    RandomSong: (state, pay: PayloadAction<string>) => {},
    JumpingSong: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.lsSong.length; i++) {
        const element = state.lsSong[i];
        if (element.Id == action.payload) {
          state.mark = i;
          break;
        }
      }
    },
  },
  extraReducers(builder) {},
});

export const { SetStop, SetModPlay, SetSongs, NextSong, JumpingSong } =
  audioSlice.actions;
export default audioSlice;
