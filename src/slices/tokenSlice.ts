import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {resetUserId} from './userSlice';

interface TokenState {
  accessToken: string | null;
}

const initialState: TokenState = {
  accessToken: null,
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
  },
});

export const {login, logout} = tokenSlice.actions;
export default tokenSlice.reducer;
