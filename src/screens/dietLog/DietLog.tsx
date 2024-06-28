import React, {useCallback} from 'react';
import Calendar from '../../components/calendar/Calendar';
import PrimaryButton from '../../components/button/PrimaryButton';
import {DietLogBox, DietLogContent, DietLogTitle} from './styles';
import Layout from '../layout/Layout';

const mealRecords = {
  '2024-05-01': ['아침', '점심', '저녁', '간식'],
  '2024-05-02': ['점심'],
  '2024-05-03': ['아침', '저녁'],
  '2024-05-29': ['아침', '점심', '저녁', '간식'],
};

export default function DietLog() {
  const handleLog = useCallback(() => {}, []);

  return (
    <Layout paddingBottom={99}>
      <DietLogBox>
        <DietLogTitle weight="bold">식단기록</DietLogTitle>
        <DietLogContent>
          <Calendar mealRecords={mealRecords} />
          <PrimaryButton size="l" onPress={handleLog}>
            기록하기
          </PrimaryButton>
        </DietLogContent>
      </DietLogBox>
    </Layout>
  );
}
