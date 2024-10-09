// ProtectorHome.tsx
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  HomeBox,
  HomeContent,
  HomeIcons,
  HomeTop,
  ReportCardBox,
} from './styles';
import Graph from '../../components/graph/Graph';
import MyPageIcon from '../../assets/images/main_mypage.svg';
import NoticeIcon from '../../assets/images/main_notice.svg';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import ReportCard from './reportCard/ReportCard';
import {useMain, useProtectorMain} from './hooks';
import MealCard from '../../components/card/MealCard';
import ScrollLayout from '../layout/ScrollLayout';
import TopBox from './topBox/TopBox';

const profileImage = require('../../assets/images/default_character.png');

export default function ProtectorHome() {
  const {handleMyPagePress, handleNotifyPress} = useMain();
  const {
    fastingBloodSugar,
    currentBloodSugar,
    patientName,
    isPatientInfoSuccess,
    bloodSugarList,
    medicineName,
    insulinName,
    isPushedMedicine,
    isPushedInsulin,
    pushMedicine,
    pushInsulin,
    isPatientAdditionalInfoSuccess,
  } = useProtectorMain();

  // 사용자 정보를 표시하는 함수
  const renderUserInfo = () => {
    if (!isPatientInfoSuccess) {
      return null;
    }
    return (
      <TopBox
        profileImage={profileImage}
        userName={patientName} // 보호자 이름 표시
        fastingBloodSugar={fastingBloodSugar}
        currentBloodSugar={currentBloodSugar}
      />
    );
  };

  // 추가 정보를 표시하는 함수
  const renderAdditionalInfo = () => {
    if (!isPatientAdditionalInfoSuccess) {
      return null;
    }
    return (
      <>
        <Graph graphData={bloodSugarList} size="m" />
        <ReportCardBox>
          <ReportCard
            navigate="MedicineDocument"
            isPushed={isPushedMedicine}
            onPush={pushMedicine}
            name={medicineName}
          />
          <ReportCard
            navigate="InsulinDocument"
            isPushed={isPushedInsulin}
            onPush={pushInsulin}
            name={insulinName}
          />
        </ReportCardBox>
      </>
    );
  };

  return (
    <ScrollLayout paddingBottom={101}>
      <HomeBox>
        <HomeTop
          source={require('../../assets/images/gradientBackgroundDark.png')}>
          <HomeIcons>
            <TouchableOpacity activeOpacity={1} onPress={handleMyPagePress}>
              <MyPageIcon />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={handleNotifyPress}>
              <NoticeIcon />
            </TouchableOpacity>
          </HomeIcons>
          {renderUserInfo()}
        </HomeTop>
        <HomeContent>
          <WeeklyCalendar />
          {renderAdditionalInfo()}
          <MealCard size="m" />
        </HomeContent>
      </HomeBox>
    </ScrollLayout>
  );
}
