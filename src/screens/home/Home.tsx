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
import useMain from './hooks';
import MealCard from '../../components/card/MealCard';
import ScrollLayout from '../layout/ScrollLayout';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const profileImage = require('../../assets/images/default_character.png');

export default function Home() {
  const userState = useSelector((state: RootState) => state.user.userState);

  const {
    fastingBloodSugarLevel,
    currentBloodSugarLevel,
    userName,
    isUserInfoSuccess,
    medicineName,
    insulinName,
    bloodSugarList,
    isAdditionalInfoSuccess,
    isCheckedMedicine,
    isCheckedInsulin,
    toggleMedicine,
    toggleInsulin,
    handleMyPagePress,
    handleNotifyPress,
    handleGotoSearch,
  } = useMain();

  // 사용자 정보를 표시하는 함수
  const renderUserInfo = () => {
    if (!isUserInfoSuccess) {
      return null;
    }
    return (
      <TopBox
        profileImage={profileImage}
        userName={userName}
        fastingBloodSugar={fastingBloodSugarLevel}
        currentBloodSugar={currentBloodSugarLevel}
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
          />
          <ReportCard
            navigate="InsulinDocument"
            isChecked={isCheckedInsulin}
            onPress={toggleInsulin}
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
          <TouchableOpacity onPress={handleGotoSearch} activeOpacity={1}>
            {userState === 'Patient' && (
              <Search
                disabled
                placeholder="정보가 궁금한 음식명을 입력해보세요"
              />
            )}
          </TouchableOpacity>
          <WeeklyCalendar />
          {renderAdditionalInfo()}
          <MealCard size="m" />
        </HomeContent>
      </HomeBox>
    </ScrollLayout>
  );
}
