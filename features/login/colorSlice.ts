import { createSlice } from "@reduxjs/toolkit";

interface colorsState {
  value: any;
}

const initialState: colorsState = {
  value: [],
};

const colors = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setColors: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

const { actions, reducer: colorsReducer } = colors;

export const { setColors } = actions;

export default colorsReducer;
