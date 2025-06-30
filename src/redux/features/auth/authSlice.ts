 
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Cookies from "js-cookie"; 

export type TUser = {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null, 
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      
      // Set token for cookies
      Cookies.set("expire-deals-token", token, {path:"/"})
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      
      // Remove token for cookies
      Cookies.remove("expire-deals-token", { path: "/" });
     
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
