import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  userId: number | null;
}

const initialState: UserState = {
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    resetUserId: state => {
      state.userId = null;
    },
  },
});

export const {setUserId, resetUserId} = userSlice.actions;
export default userSlice.reducer;
