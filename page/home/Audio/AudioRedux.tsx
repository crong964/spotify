import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface AudioRedux {
  stop: boolean;
  typeloop: "infinity" | "onece" | "default";
}

const initialState: AudioRedux = {
  stop: true,
  typeloop: "default",
};

const audioSlice = createSlice({
  initialState,
  name: "audioroot",
  reducers: {
    SetStop: (state, pay: PayloadAction<boolean>) => {
      state.stop = pay.payload;
    },
  },
});

export const { SetStop } = audioSlice.actions;
export default audioSlice;
