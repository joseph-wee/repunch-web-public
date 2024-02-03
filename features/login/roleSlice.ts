import { createSlice } from "@reduxjs/toolkit";

interface RoleState {
  value: string;
}

const initialState: RoleState = {
  value: "",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state) => {
      state.value = "SELLER";
    },
    clearRole: (state) => {
      state.value = "";
    },
  },
});

const { actions, reducer: roleReducer } = roleSlice;

export const { setRole, clearRole } = actions;

export default roleReducer;
