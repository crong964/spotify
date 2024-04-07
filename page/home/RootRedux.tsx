import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface Commamd {
  page:
    | "genre"
    | "playlist"
    | "artise"
    | "likedsongs"
    | "home"
    | "search"
    | "profile"
    | "idgenre";
  param: string;
}
interface Root {
  command: Commamd;
  idSong: string;
  recentList: boolean;
  isLogin: boolean;
  update: boolean;
  Right: string;
  DeleteDiscuss: string;
  NotificationPage: string;
  NotificationPageIdSong: string;
  stack: Commamd[];
  position: number;
}
const initialState: Root = {
  command: {
    page: "home",
    param: "",
  },
  NotificationPageIdSong: "",
  NotificationPage: "list",
  idSong: JSON.parse(localStorage.getItem("song") as any).Id || "",
  recentList: false,
  isLogin: false,
  update: true,
  Right: "Discuss",
  DeleteDiscuss: "",
  stack: [{ page: "home", param: "" }],
  position: 0,
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
    NaviPage: (state, action: PayloadAction<Commamd>) => {
      state.command.page = action.payload.page;
      state.command.param = action.payload.param;
      state.stack = [...state.stack, action.payload];
      state.position = state.stack.length - 1;
    },
    IsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    Update: (state) => {
      state.update = !state.update;
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
    SetPosition: (state, action: PayloadAction<number>) => {
      state.position += action.payload;
      if (state.position < 0) {
        state.position = 0;
      }
      if (state.position >= state.stack.length) {
        state.position = state.stack.length - 1;
      }
      state.command = state.stack[state.position];
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
  ShowRecentList,
  PlaySong,
  NaviPage,
  IsLogin,
  Update,
  NaviRight,
  SetdeleteDiscuss,
  SetNotificationPage,
  SetNotificationPageIdSong,
  SetPosition,
} = rootslice.actions;

export default rootHome;

export function Check() {
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  return page == "artise" || page == "playlist";
}
