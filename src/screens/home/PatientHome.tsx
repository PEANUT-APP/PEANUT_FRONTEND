// PatientHome.tsx
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  HomeBox,
  HomeContent,
  HomeIcons,
  HomeLoadingScreen,
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
import {BlurView} from '@react-native-community/blur';

const profileImage = require('../../assets/images/default_character.png');

export default function PatientHome() {
  const {handleMyPagePress, handleNotifyPress, handleGotoSearch} = useMain();
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
    checkMedicine,
    checkInsulin,
    isAdditionalInfoSuccess,
    isUserInfoLoading,
    isAdditionalInfoLoading,
    refreshing,
    onRefresh,
  } = usePatientMain();

  return (
    <>
      <ScrollLayout
        paddingBottom={101}
        refreshing={refreshing}
        onRefresh={onRefresh}>
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
            {isUserInfoSuccess && (
              <TopBox
                profileImage={profileImage}
                userName={userName}
                fastingBloodSugar={fastingBloodSugar}
                currentBloodSugar={currentBloodSugar}
              />
            )}
          </HomeTop>
          <HomeContent>
            <TouchableOpacity activeOpacity={1} onPress={handleGotoSearch}>
              <Search
                disabled
                placeholder="정보가 궁금한 음식명을 입력해보세요"
              />
            </TouchableOpacity>
            <WeeklyCalendar />
            {isAdditionalInfoSuccess && (
              <>
                <Graph graphData={bloodSugarList} size="m" />
                <ReportCardBox>
                  <ReportCard
                    navigate="MedicineDocument"
                    isChecked={isCheckedMedicine}
                    onPress={checkMedicine}
                    name={medicineName}
                    time={medicineTime}
                  />
                  <ReportCard
                    navigate="InsulinDocument"
                    isChecked={isCheckedInsulin}
                    onPress={checkInsulin}
                    name={insulinName}
                    time={insulinTime}
                  />
                </ReportCardBox>
              </>
            )}
            <MealCard size="m" />
          </HomeContent>
        </HomeBox>
      </ScrollLayout>
      {(isAdditionalInfoLoading || isUserInfoLoading || refreshing) && (
        <>
          <BlurView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 100,
            }}
            blurAmount={1}
            blurType="extraDark"
          />
          <HomeLoadingScreen />
        </>
      )}
    </>
  );
}
