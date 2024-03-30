import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  slectGenre: any;
  floor: number;
  load: boolean;
}
interface FloorAndID {
  Floor: number;
  Id: string;
}

var initialState: CounterState = {
  floor: 0,
  slectGenre: { 0: 0 },
  value: 0,
  load: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addGenre: (state, action: PayloadAction<FloorAndID>) => {
      state.slectGenre[action.payload.Floor + ""] = action.payload.Id;
    },
    SetFloor: (state, action: PayloadAction<number>) => {
      state.floor = action.payload + 1;
    },
    SetLoad: (state) => {
      state.load = !state.load;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGenre, SetFloor, SetLoad } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
