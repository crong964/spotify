import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface iLeftRedux {
  extend: boolean;
}

const initialState: iLeftRedux = {
  extend: false,
};
const leftRedux = createSlice({
  initialState,
  name: "leftRedux",
  reducers: {
    SetExtend: (state) => {
      state.extend = !state.extend;
    },
  },
});

export default leftRedux;
export const { SetExtend } = leftRedux.actions;
