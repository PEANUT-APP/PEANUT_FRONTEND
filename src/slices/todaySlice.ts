// src/slices/todaySlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// 초기 상태
interface TodayState {
  today: string;
  time: string;
}

const initialState: TodayState = {
  today: getInitialToday(),
  time: '아침',
};

function getInitialToday(): string {
  const now = dayjs().tz('Asia/Seoul').add(9, 'hour');
  return now.format('YYYY-MM-DD');
}

const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    setToday: (state, action: PayloadAction<string>) => {
      state.today = action.payload;
    },
    resetToday: state => {
      state.today = getInitialToday();
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
