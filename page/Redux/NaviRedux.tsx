import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface iMobileRedux {
  type: "pc" | "mobile";
  pageMobie:
    | "genre"
    | "playlist"
    | "artist"
    | "likedsongs"
    | "home"
    | "search"
    | "profile"
    | "idgenre"
    | "mess";
}

const initialState: iMobileRedux = {
  type: "pc",
  pageMobie: "home",
};
const mobileRedux = createSlice({
  initialState,
  name: "mobile",
  reducers: {
    NaviPageMobile: (
      state,
      action: PayloadAction<
        | "genre"
        | "playlist"
        | "artist"
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
export const { NaviPageMobile } = mobileRedux.actions;
