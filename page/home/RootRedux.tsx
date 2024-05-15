import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import audioSlice from "./Audio/AudioRedux";
import mobileRedux from "./NaviHome/NaviRedux";

interface mess {
  idMess: string;
  content: string;
  idBox: string;
  idUser: string;
  ngay: string;
  type: string;
}

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
  watchbox: string;
  center: boolean;
  mess: mess;
  BoxList: string[];
  command: Commamd;
  idSong: string;
  isLogin: boolean;
  update: boolean;
  Right: string;
  DeleteDiscuss: string;
  NotificationPage: string;
  NotificationPageIdSong: string;
  stack: Commamd[];
  position: number;
  SearchName: string;
}
const initialState: Root = {
  center: true,
  watchbox: "",
  SearchName: "",
  BoxList: [],
  command: {
    page: "home",
    param: "",
  },
  NotificationPageIdSong: "",
  NotificationPage: "list",
  idSong: JSON.parse(localStorage.getItem("song") || "{}").Id || "",
  isLogin: false,
  update: true,
  Right: "",
  DeleteDiscuss: "",
  stack: [{ page: "home", param: "" }],
  position: 0,
  mess: {
    content: "",
    idBox: "",
    idMess: "",
    idUser: "",
    ngay: "",
    type: "",
  },
};
var rootslice = createSlice({
  name: "rootHome",
  initialState: initialState,
  reducers: {
    RemoveRight: (state) => {
      state.Right = "";
    },
    PlaySong: (state, action: PayloadAction<string>) => {
      state.idSong = action.payload;
    },
    NaviPage: (state, action: PayloadAction<Commamd>) => {
      state.command.page = action.payload.page;
      state.command.param = action.payload.param;

      state.center = true;
      if (action.payload.page == state.stack[state.position].page) {
        return;
      }
      if (state.stack[state.position + 1]) {
        state.stack[state.position + 1] = action.payload;
        state.position = state.position + 1;
      } else {
        state.stack = [...state.stack, action.payload];
        state.position = state.stack.length - 1;
      }
    },
    IsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    Update: (state) => {
      state.update = !state.update;
    },
    NaviRight: (
      state,
      action: PayloadAction<"Discuss" | "Queue" | "Mess" | "">
    ) => {
      if (state.Right == action.payload) {
        state.Right = "";
        state.center = true;
        return;
      }
      state.Right = action.payload;
      state.center = false;
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
    SetBoxList: (state, action: PayloadAction<string>) => {
      var coincide = false;
      for (let i = 0; i < state.BoxList.length; i++) {
        const element = state.BoxList[i];
        if (element == action.payload) {
          coincide = true;
        }
      }
      if (coincide) {
        state.BoxList = state.BoxList;
      } else {
        state.BoxList.push(action.payload);
      }
    },
    RemoveBoxList: (state, action: PayloadAction<string>) => {
      state.BoxList = state.BoxList.filter((v) => v !== action.payload);
    },
    SetSearchName: (state, action: PayloadAction<string>) => {
      state.SearchName = action.payload;
    },
    SetMess: (state, action: PayloadAction<mess>) => {
      state.mess = action.payload;
    },
  },
});

const rootHome = configureStore({
  reducer: {
    rootHome: rootslice.reducer,
    audioroot: audioSlice.reducer,
    mobile: mobileRedux.reducer,
  },
});
export type RootTy = typeof rootHome;
export type RootHome = ReturnType<RootTy["getState"]>;
export type RootDispatch = RootTy["dispatch"];
export const {
  PlaySong,
  NaviPage,
  IsLogin,
  Update,
  NaviRight,
  SetdeleteDiscuss,
  SetNotificationPage,
  SetNotificationPageIdSong,
  SetPosition,
  SetBoxList,
  RemoveBoxList,
  SetSearchName,
  SetMess,
  RemoveRight,
} = rootslice.actions;

export default rootHome;

export function Check() {
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  return page == "artise" || page == "playlist";
}
