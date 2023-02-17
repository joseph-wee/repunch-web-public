import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  value: number;
}

const initialState: CartState = {
  value: 0,
};

const cartSlice = createSlice({
  name: "cartValue",
  initialState,
  reducers: {
    setMeterage: (state) => {
      state.value = 0;
    },
    setSample: (state) => {
      state.value = 1;
    },
  },
});

const { actions, reducer: cartReducer } = cartSlice;

export const { setMeterage, setSample } = actions;

export default cartReducer;
