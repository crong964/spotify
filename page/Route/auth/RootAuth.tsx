import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface initialState {
  page: "signin" | "signup" | "createAccount" | "fotgot" | "changePassword";
  Account: string;
  pathImage: string;
  Name: string;
  Sign: string;
  login: Login;
}
interface Login {
  IsLogin: boolean;
  idUser: string;
}
interface Infor {
  Account: string;
  pathImage: string;
  Name: string;
  Sign: string;
}
var initialState: initialState = {
  page: "signin",
  Account: "",
  pathImage: "",
  Name: "",
  Sign: "",
  login: { idUser: "", IsLogin: false },
};

export const authRedux = createSlice({
  name: "rootauth",
  initialState,
  reducers: {
    Page: (
      state,
      action: PayloadAction<
        "signin" | "signup" | "createAccount" | "fotgot" | "changePassword"
      >
    ) => {
      state.page = action.payload;
    },
    Infor: (state, action: PayloadAction<Infor>) => {
      state.Account = action.payload.Account;
      state.pathImage = action.payload.pathImage;
      state.Name = action.payload.Name;
      state.Sign = action.payload.Sign;
    },
    IsLogin: (state, action: PayloadAction<Login>) => {
      state.login = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Page, Infor, IsLogin } = authRedux.actions;
