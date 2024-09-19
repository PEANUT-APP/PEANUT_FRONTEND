// src/slices/todaySlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// 초기 상태
interface TodayState {
  today: string;
}

const initialState: TodayState = {
  today: dayjs().toISOString(),
};

const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    setToday: (state, action: PayloadAction<string>) => {
      state.today = action.payload;
    },
    resetToday: state => {
      state.today = dayjs().toISOString();
    },
  },
});

export const {setToday, resetToday} = todaySlice.actions;
export default todaySlice.reducer;
