import React from 'react';
import Calendar from '../../components/calendar/Calendar';

const mealRecords = {
  '2024-05-01': ['아침', '점심', '저녁', '간식'],
  '2024-05-02': ['점심'],
  '2024-05-03': ['아침', '저녁'],
  '2024-05-29': ['아침', '점심', '저녁', '간식'],
};

export default function CalendarTest() {
  return <Calendar mealRecords={mealRecords} />;
}
