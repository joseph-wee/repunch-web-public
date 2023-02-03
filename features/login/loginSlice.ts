import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  value: boolean;
}

const initialState: LoginState = {
  value: false,
};

const loginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

const { actions, reducer: loginReducer } = loginSlice;

export const { login, logout } = actions;

export default loginReducer;
