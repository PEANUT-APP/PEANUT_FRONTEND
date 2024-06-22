import React from 'react';
import styled from 'styled-components/native';
import GlobalView from '../../styles/GlobalStyle';
import {colors} from '../../styles/colors';
import NavigationBar from '../../components/navigation/NavigationBar';
import CameraButton from '../../components/button/CameraButton';
import {Title} from '../../components/text/Text';
import Calendar from '../../components/calendar/Calendar';
import PrimaryButton from '../../components/button/PrimaryButton';

const DietLogContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const DietLogScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 99,
  },
})`
  flex: 1;
`;

const DietLogBox = styled.View`
  flex: 1;
  padding: 72px 20px 99px;
  gap: 16px;
  align-items: center;
`;

const DietLogTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  width: 350px;
  margin-left: 8px;
`;

const DietLogContent = styled.View`
  flex: 1;
  gap: 12px;
`;

const mealRecords = {
  '2024-05-01': ['아침', '점심', '저녁', '간식'],
  '2024-05-02': ['점심'],
  '2024-05-03': ['아침', '저녁'],
  '2024-05-29': ['아침', '점심', '저녁', '간식'],
};

export default function DietLog() {
  return (
    <GlobalView>
      <DietLogContainer>
        <DietLogScroll>
          <DietLogBox>
            <DietLogTitle weight="bold">식단기록</DietLogTitle>
            <DietLogContent>
              <Calendar mealRecords={mealRecords} />
              <PrimaryButton size="l">기록하기</PrimaryButton>
            </DietLogContent>
          </DietLogBox>
        </DietLogScroll>
        <CameraButton />
      </DietLogContainer>
      <NavigationBar />
    </GlobalView>
  );
}
