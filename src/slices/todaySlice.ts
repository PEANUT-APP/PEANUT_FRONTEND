// src/slices/todaySlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

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
  const now = dayjs();
  // 새벽 6시 이전이면 어제 날짜로 설정, 아니면 오늘 날짜로 설정
  return now.hour() < 6
    ? now.subtract(1, 'day').format('YYYY-MM-DD')
    : now.format('YYYY-MM-DD');
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
