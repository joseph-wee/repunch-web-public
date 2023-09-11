import { createSlice } from "@reduxjs/toolkit";

interface TempOrderState {
  value: any;
}

const initialState: TempOrderState = {
  value: [],
};

const tempOrderSlice = createSlice({
  name: "tempOrderList",
  initialState,
  reducers: {
    setTempOrderList: (state, action) => {
      state.value = [...action.payload];
      console.log(action.payload);
    },
  },
});

const { actions, reducer: tempOrderReducer } = tempOrderSlice;

export const { setTempOrderList } = actions;

export default tempOrderReducer;
