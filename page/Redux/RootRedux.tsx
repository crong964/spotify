import { configureStore } from "@reduxjs/toolkit";

import mobileRedux from "@/page/Redux/NaviRedux";
import audioSlice from "@/page/Redux/AudioRedux";
import authRedux from "@/page/Redux/AuthRedux";
import homeRedux from "@/page/Redux/HomeRedux";
import scrollRedux from "./ScrollRedux";

const rootHome = configureStore({
  reducer: {
    rootHome: homeRedux.reducer,
    audioroot: audioSlice.reducer,
    mobile: mobileRedux.reducer,
    rootauth: authRedux.reducer,
    scrollRedux: scrollRedux.reducer,
  },
});
export type RootTy = typeof rootHome;
export type RootHome = ReturnType<RootTy["getState"]>;
export type RootDispatch = RootTy["dispatch"];

export default rootHome;
