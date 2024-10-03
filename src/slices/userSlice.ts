import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  userId: number | null;
  userState: 'Protector' | 'Patient';
}

const initialState: UserState = {
  userId: null,
  userState: 'Patient',
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
    setUserState: (state, action: PayloadAction<'Protector' | 'Patient'>) => {
      state.userState = action.payload;
    },
  },
});

export const {setUserId, resetUserId, setUserState} = userSlice.actions;
export default userSlice.reducer;
