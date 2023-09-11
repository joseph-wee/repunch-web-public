import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/login/cartSlice";
import loginReducer from "../features/login/loginSlice";
import tempOrderReducer from "../features/login/tempOrderSlice";

export const store = configureStore({
  reducer: {
    isLogin: loginReducer,
    cartValue: cartReducer,
    tempOrderList: tempOrderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
