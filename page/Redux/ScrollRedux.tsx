import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iScrollRedux {
  height: number;
}

const initialState: iScrollRedux = {
  height: 0,
};

const scrollRedux = createSlice({
  initialState: initialState,
  name: "scrollRedux",
  reducers: {
    SetHeight: (state, pay: PayloadAction<number>) => {
      state.height = pay.payload;
    },
  },
});

export const { SetHeight } = scrollRedux.actions;
export default scrollRedux;
