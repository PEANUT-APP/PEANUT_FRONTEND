// formSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SignUpFormType} from '../services/sign/types';

const initialState: SignUpFormType = {
  birth: '',
  gender: '',
  height: '',
  name: '',
  nickname: '',
  password: '',
  phoneNumber: '',
  weight: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<SignUpFormType>>) {
      return {...state, ...action.payload};
    },
    resetForm() {
      return initialState;
    },
  },
});

export const {updateForm, resetForm} = formSlice.actions;
export default formSlice.reducer;
