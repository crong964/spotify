import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface Root {
  idSong: string;
  recentList: boolean;
  page: string;
  idpage: string;
  isLogin: boolean;
  search: string;
}
const initialState: Root = {
  idSong: "",
  recentList: false,
  page: "home",
  idpage: "",
  isLogin: false,
  search: "",
};
var rootslice = createSlice({
  name: "rootHome",
  initialState: initialState,
  reducers: {
    ShowRecentList: (state, action) => {
      state.recentList = !state.recentList;
    },
    PlaySong: (state, action: PayloadAction<string>) => {
      state.idSong = action.payload;
    },
    NaviPage: (
      state,
      action: PayloadAction<
        "genre" | "playlist" | "artise" | "likedsongs" | "home" | "search"
      >
    ) => {
      state.page = action.payload;
    },
    IdPage: (state, action: PayloadAction<string>) => {
      state.idpage = action.payload;
    },
    IsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    Search: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

const rootHome = configureStore({
  reducer: {
    rootHome: rootslice.reducer,
  },
});

export type RootHome = ReturnType<typeof rootHome.getState>;

export const { ShowRecentList, PlaySong, NaviPage, IdPage, IsLogin, Search } =
  rootslice.actions;

export default rootHome;
