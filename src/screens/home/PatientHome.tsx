// PatientHome.tsx
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
import Search from '../../components/search/Search';
import TopBox from './topBox/TopBox';
import MyPageIcon from '../../assets/images/main_mypage.svg';
import NoticeIcon from '../../assets/images/main_notice.svg';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import ReportCard from './reportCard/ReportCard';
import {useMain, usePatientMain} from './hooks';
import MealCard from '../../components/card/MealCard';
import ScrollLayout from '../layout/ScrollLayout';

const profileImage = require('../../assets/images/default_character.png');

export default function PatientHome() {
  const {handleMyPagePress, handleNotifyPress} = useMain();
  const {
    fastingBloodSugar,
    currentBloodSugar,
    bloodSugarList,
    userName,
    isUserInfoSuccess,
    medicineName,
    insulinName,
    medicineTime,
    insulinTime,
    isCheckedMedicine,
    isCheckedInsulin,
    toggleMedicine,
    toggleInsulin,
    isAdditionalInfoSuccess,
  } = usePatientMain();

  // 사용자 정보를 표시하는 함수
  const renderUserInfo = () => {
    if (!isUserInfoSuccess) {
      return null;
    }
    return (
      <TopBox
        profileImage={profileImage}
        userName={userName}
        fastingBloodSugar={fastingBloodSugar}
        currentBloodSugar={currentBloodSugar}
      />
    );
  };

  // 추가 정보를 표시하는 함수
  const renderAdditionalInfo = () => {
    if (!isAdditionalInfoSuccess) {
      return null;
    }
    return (
      <>
        <Graph graphData={bloodSugarList} size="m" />
        <ReportCardBox>
          <ReportCard
            navigate="MedicineDocument"
            isChecked={isCheckedMedicine}
            onPress={toggleMedicine}
            name={medicineName}
            time={medicineTime}
          />
          <ReportCard
            navigate="InsulinDocument"
            isChecked={isCheckedInsulin}
            onPress={toggleInsulin}
            name={insulinName}
            time={insulinTime}
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
          <TouchableOpacity
            onPress={() => {
              /* 검색 이동 */
            }}
            activeOpacity={1}>
            <Search
              disabled
              placeholder="정보가 궁금한 음식명을 입력해보세요"
            />
          </TouchableOpacity>
          <WeeklyCalendar />
          {renderAdditionalInfo()}
          <MealCard size="m" />
        </HomeContent>
      </HomeBox>
    </ScrollLayout>
  );
}
