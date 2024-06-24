import React, {useCallback} from 'react';
import GlobalView from '../../styles/GlobalStyle';
import NavigationBar from '../../components/navigation/NavigationBar';
import CameraButton from '../../components/button/CameraButton';
import Calendar from '../../components/calendar/Calendar';
import PrimaryButton from '../../components/button/PrimaryButton';
import {
  DietLogBox,
  DietLogContainer,
  DietLogContent,
  DietLogScroll,
  DietLogTitle,
} from './styles';

const mealRecords = {
  '2024-05-01': ['아침', '점심', '저녁', '간식'],
  '2024-05-02': ['점심'],
  '2024-05-03': ['아침', '저녁'],
  '2024-05-29': ['아침', '점심', '저녁', '간식'],
};

export default function DietLog() {
  const handleLog = useCallback(() => {}, []);

  return (
    <GlobalView>
      <DietLogContainer>
        <DietLogScroll>
          <DietLogBox>
            <DietLogTitle weight="bold">식단기록</DietLogTitle>
            <DietLogContent>
              <Calendar mealRecords={mealRecords} />
              <PrimaryButton size="l" onPress={handleLog}>
                기록하기
              </PrimaryButton>
            </DietLogContent>
          </DietLogBox>
        </DietLogScroll>
        <CameraButton />
      </DietLogContainer>
      <NavigationBar />
    </GlobalView>
  );
}
