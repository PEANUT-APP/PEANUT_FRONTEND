// src/slices/todaySlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// 초기 상태
interface TodayState {
  today: string;
  time: string;
}

const initialState: TodayState = {
  today: dayjs().toISOString(),
  time: '아침',
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
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    resetTime: state => {
      state.time = '아침';
    },
  },
});

export const {setToday, resetToday, setTime, resetTime} = todaySlice.actions;
export default todaySlice.reducer;
