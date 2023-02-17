import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/login/cartSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    isLogin: loginReducer,
    cartValue: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
