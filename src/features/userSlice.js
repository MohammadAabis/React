import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      //action is function we are performing and inside payload a value will come
      //and we'll update the state of user
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { login, logout } = UserSlice.actions;
export const selectUser = (state) => state.user.user;
export default UserSlice.reducer;
