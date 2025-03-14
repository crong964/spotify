import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

import mobileRedux from "./NaviHome/NaviRedux";
import { ParseJson } from "@/page/socket/Socket";
import audioSlice from "@/page/component/Audio/AudioRedux";
import { authRedux } from "../auth/RootAuth";


interface mess {
  idMess: string;
  content: string;
  idBox: string;
  idUser: string;
  ngay: string;
  type: string;
}

export interface Playing {
  page: string;
  id: string;
}

interface Commamd {
  page:
    | "genre"
    | "playlist"
    | "artist"
    | "likedsongs"
    | "home"
    | "search"
    | "profile"
    | "idgenre"
    | "";
  param: string;
}
interface PlayList {
  id: string;
  ImagePath: string;
  PlayListName: string;
  Likes: number;
  Songs: number;
  Duration: string;
  User_id: string;
}
interface Root {
  playing: Playing;
  update: boolean;
  topbarcontent: boolean;
  curName: string;
  devicetype: "pc" | "mobile";
  side: "left" | "center" | "right";
  mess: mess;
  BoxList: string[];
  command: Commamd;
  idSong: string;
  playlist: PlayList;
  Right: string;
  DeleteDiscuss: string;
  NotificationPage: string;
  NotificationPageIdSong: string;
  stack: Commamd[];
  position: number;
  SearchName: string;
  playlists: { idplaylist: string; PlayListName: string }[];
  Notification: string;
}
const initialState: Root = {
  playlist: {
    Duration: "",
    id: "",
    ImagePath: "",
    Likes: 0,
    PlayListName: "",
    Songs: 0,
    User_id: "",
  },
  Notification: "",
  playlists: [],
  update: false,
  playing: { id: "", page: "" },
  topbarcontent: false,
  curName: "",
  devicetype: "pc",
  side: "center",
  SearchName: "",
  BoxList: [],
  command: {
    page: "home",
    param: "",
  },
  NotificationPageIdSong: "",
  NotificationPage: "list",
  idSong: ParseJson(localStorage.getItem("song") || "{}").Id || "",

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
const rootslice = createSlice({
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

      if (state.devicetype == "mobile") {
        state.Right = "";
        return;
      }

      // if (action.payload.page == state.stack[state.position].page) {
      //   return;
      // }

      if (state.stack[state.position + 1]) {
        state.stack[state.position + 1] = action.payload;
        state.position = state.position + 1;
      } else {
        state.stack = [...state.stack, action.payload];
        state.position = state.stack.length - 1;
      }
    },

    NaviRight: (
      state,
      action: PayloadAction<"Discuss" | "Queue" | "Mess" | "">
    ) => {
      if (state.Right == action.payload && state.devicetype == "mobile") {
        return;
      }
      if (state.devicetype == "mobile") {
        state.command.page = "";
      }
      if (state.Right == action.payload) {
        state.Right = "";
        return;
      }
      state.Right = action.payload;
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
    SetDeviceType: (state, action: PayloadAction<"pc" | "mobile">) => {
      state.devicetype = action.payload;
    },
    SetCurName: (state, action: PayloadAction<string>) => {
      state.curName = action.payload;
    },
    ShowTopbarContent: (state, action: PayloadAction<boolean>) => {
      state.topbarcontent = action.payload;
    },
    SetPlaying: (state, action: PayloadAction<Playing>) => {
      localStorage.setItem("queue", JSON.stringify(action.payload));
      state.playing = action.payload;
    },
    SetPlaylistRedux: (state, action) => {
      state.playlists = action.payload;
    },
    SetNotification: (state, action: PayloadAction<string>) => {
      state.Notification = action.payload;
    },
    SetPlaylist: (state, action: PayloadAction<PlayList>) => {
      state.playlist = action.payload;
    },
  },
});

const rootHome = configureStore({
  reducer: {
    rootHome: rootslice.reducer,
    audioroot: audioSlice.reducer,
    mobile: mobileRedux.reducer,
    rootauth: authRedux.reducer,
    
  },
});
export type RootTy = typeof rootHome;
export type RootHome = ReturnType<RootTy["getState"]>;
export type RootDispatch = RootTy["dispatch"];
export const {
  ShowTopbarContent,
  SetCurName,
  PlaySong,
  NaviPage,
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
  SetDeviceType,
  SetPlaying,
  SetPlaylistRedux,
  SetNotification,
  SetPlaylist,
} = rootslice.actions;

export default rootHome;
