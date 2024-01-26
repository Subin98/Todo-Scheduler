import { createSlice } from '@reduxjs/toolkit';
import { EMPTY } from '../config/constants';
const userSlice = createSlice({
  name: 'authentication',
  initialState: {
    userName: EMPTY,
    email: EMPTY,
    token: EMPTY
  },
  reducers: {
    login: (state, action) => {
      let newState = {
        userName: action.payload.userName,
        email: action.payload.email,
        token: action.payload.token
      };
      return newState;
    },
    logout: (state, action) => {
      console.log('logout', state, action);
    },
    resetAuthenticationState() {
      return {
        userName: EMPTY,
        email: EMPTY,
        token: EMPTY
      };
    },
    showAuthentication(state, action) {
      console.log('authentication state', state, action);
    }
  }
});
export const { login, logout, resetAuthenticationState, showAuthentication } = userSlice.actions;
export default userSlice.reducer;
