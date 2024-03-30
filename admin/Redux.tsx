import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  slectGenre: any;
  floor: number;
  load: boolean;
  page: string;
  SelectList: any;
}
interface FloorAndID {
  Floor: number;
  Id: string;
  name: string;
}
interface Song {
  SongName: string;
  Id: string;
  imagePath: string;
}
var initialState: CounterState = {
  floor: 1,
  slectGenre: { 0: 0 },
  value: 0,
  load: false,
  page: "",
  SelectList: {},
};

export const counterSlice = createSlice({
  name: "navi",
  initialState,
  reducers: {
    addGenre: (state, action: PayloadAction<FloorAndID>) => {
      state.slectGenre[action.payload.Floor + 1] = action.payload.Id;
    },
    SetFloor: (state, action: PayloadAction<number>) => {
      state.floor = action.payload + 1;
    },
    SetLoad: (state) => {
      state.load = !state.load;
    },
    Page: (state, action: PayloadAction<"genre" | "songlist"|"playlist">) => {
      state.page = action.payload;
    },
    SelectSong: (state, action: PayloadAction<Song>) => {
      console.log("das");

      if (!state.SelectList[action.payload.Id]) {
        state.SelectList[action.payload.Id] = action.payload;
      } else {
        state.SelectList[action.payload.Id] = undefined;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGenre, SetFloor, SetLoad, SelectSong, Page } =
  counterSlice.actions;

const store = configureStore({
  reducer: {
    navi: counterSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
