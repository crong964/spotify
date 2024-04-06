import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface Root {
  idSong: string;
  recentList: boolean;
  page: string;
  idpage: string;
  isLogin: boolean;
  search: string;
  update: boolean;
  idGenre: string;
  idPlayList: string;
  Right: string;
  DeleteDiscuss: string;
  NotificationPage: string;
  NotificationPageIdSong: string;
}
const initialState: Root = {
  NotificationPageIdSong: "",
  NotificationPage: "list",
  idSong: JSON.parse(localStorage.getItem("song") as any).Id || "",
  recentList: false,
  page: "home",
  idpage: "",
  isLogin: false,
  search: "",
  update: true,
  idGenre: "",
  idPlayList: "",
  Right: "Discuss",
  DeleteDiscuss: "",
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
        | "genre"
        | "playlist"
        | "artise"
        | "likedsongs"
        | "home"
        | "search"
        | "profile"
        | "idgenre"
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
    Update: (state) => {
      state.update = !state.update;
    },
    SetIdGenre: (state, action) => {
      state.idGenre = action.payload;
    },
    SetIdPlayList: (state, action) => {
      state.idPlayList = action.payload;
    },
    NaviRight: (state, action: PayloadAction<"Discuss" | "Queue">) => {
      state.Right = action.payload;
      state.recentList = !state.recentList;
    },
    SetdeleteDiscuss: (state, action) => {
      state.DeleteDiscuss = action.payload;
    },
    SetNotificationPage: (state, action: PayloadAction<"list" | "discuss">) => {
      state.NotificationPage = action.payload;
    },
    SetNotificationPageIdSong: (state, action) => {
      state.NotificationPageIdSong = action.payload;
    },
  },
});

const rootHome = configureStore({
  reducer: {
    rootHome: rootslice.reducer,
  },
});

export type RootHome = ReturnType<typeof rootHome.getState>;

export const {
  SetIdGenre,
  ShowRecentList,
  PlaySong,
  NaviPage,
  IdPage,
  IsLogin,
  Search,
  Update,
  SetIdPlayList,
  NaviRight,
  SetdeleteDiscuss,
  SetNotificationPage,
  SetNotificationPageIdSong,
} = rootslice.actions;

export default rootHome;

export function Check() {
  const page = useSelector((state: RootHome) => state.rootHome.page);
  return page == "artise" || page == "playlist";
}
