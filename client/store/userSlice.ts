import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";

interface UserState {
  loading: boolean;
  isAuth: boolean;
  user: IUser | null;
  userError: string;
}

const initialState: UserState = {
  loading: false,
  isAuth: false,
  user: null,
  userError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state) {
      state.loading = true;
    },
    userLoginSuccess(state, action: PayloadAction<IUser>) {
      state.isAuth = true;
      state.loading = false;
      state.userError = "";
      state.user = action.payload;
    },
    fetchUserError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.userError = action.payload;
    },

    userLogout(state) {
      state.isAuth = false;
      state.user = null;
      state.userError = "";
    },
  },
});

export const { userLogin, userLoginSuccess, fetchUserError, userLogout } =
  userSlice.actions;
export default userSlice.reducer;
