import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {resetUserId} from './userSlice';

interface TokenState {
  accessToken: string | null;
  fcmToken: string | null;
}

const initialState: TokenState = {
  accessToken: null,
  fcmToken: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: state => {
      state.accessToken = null;
      resetUserId();
    },
    setFcmToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
  },
});

export const {login, logout, setFcmToken} = tokenSlice.actions;
export default tokenSlice.reducer;
