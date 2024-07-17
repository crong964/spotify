import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface initialState {
  page: "signin" | "signup" | "createAccount" | "fotgot" | "changePassword";
  Account: string;
  pathImage: string;
  Name: string;
  Sign: string;
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
  },
});

// Action creators are generated for each case reducer function
export const { Page, Infor } = authRedux.actions;

