import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface iMobileRedux {
  type: "pc" | "mobile";
  pageMobie:
    | "genre"
    | "playlist"
    | "artise"
    | "likedsongs"
    | "home"
    | "search"
    | "profile"
    | "idgenre"|"mess";
}

const initialState: iMobileRedux = {
  type: "pc",
  pageMobie: "home",
};
const mobileRedux = createSlice({
  initialState,
  name: "mobile",
  reducers: {
    SetTypeMobile: (state, action: PayloadAction<"pc" | "mobile">) => {
      state.type = action.payload;
    },
    NaviPageMobile: (
      state,
      action: PayloadAction<
        | "genre"
        | "playlist"
        | "artise"
        | "likedsongs"
        | "home"
        | "search"
        | "profile"
        | "idgenre"
        | "mess"
      >
    ) => {
      state.pageMobie = action.payload;
    },
  },
});

export default mobileRedux;
export const { SetTypeMobile, NaviPageMobile } = mobileRedux.actions;
