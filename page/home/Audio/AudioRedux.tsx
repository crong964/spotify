import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface AudioRedux {
  stop: boolean;
  modplay: number;
}

const initialState: AudioRedux = {
  stop: true,
  modplay: 0,
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
  },
});

export const { SetStop, SetModPlay } = audioSlice.actions;
export default audioSlice;
