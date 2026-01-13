import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iScrollRedux {
  scrollTop: number;
  maxHeight: number;
  scrollBottom: number;
}

const initialState: iScrollRedux = {
  scrollTop: 0,
  maxHeight: 0,
  scrollBottom: 30,
};

const scrollRedux = createSlice({
  initialState: initialState,
  name: "scrollRedux",
  reducers: {
    setHeight: (state, pay: PayloadAction<number>) => {
      state.scrollTop = pay.payload;
    },
    setMaxheight: (state, pay: PayloadAction<number>) => {
      state.maxHeight = pay.payload;
    },
    setScrollBottom: (state, pay: PayloadAction<number>) => {
      state.scrollBottom = pay.payload;
    },
  },
});

export const { setHeight, setMaxheight, setScrollBottom } = scrollRedux.actions;
export default scrollRedux;
