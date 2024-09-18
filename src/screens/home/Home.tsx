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
import Layout from '../layout/Layout';
import Search from '../../components/search/Search';
import TopBox from './topBox/TopBox';
import MyPageIcon from '../../assets/images/main_mypage.svg';
import NoticeIcon from '../../assets/images/main_notice.svg';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import ReportCard from './reportCard/ReportCard';
import useMain from './hooks';
import MealCard from '../../components/card/MealCard';

const profileImage = require('../../assets/images/mainProfile.png');

export default function Home() {
  const {
    fastingBloodSugarLevel,
    currentBloodSugarLevel,
    userName,
    isUserInfoSuccess,
    today,
    setToday,
    medicineName,
    insulinName,
    bloodSugarList,
    isAdditionalInfoSuccess,
    isCheckedMedicine,
    isCheckedInsulin,
    toggleMedicine,
    toggleInsulin,
    handleGotoSearch,
  } = useMain();

  return (
    <Layout paddingBottom={101}>
      <HomeBox>
        <HomeTop source={require('../../assets/images/gradientBackground.png')}>
          <HomeIcons>
            <MyPageIcon />
            <NoticeIcon />
          </HomeIcons>
          {isUserInfoSuccess && (
            <TopBox
              profileImage={profileImage}
              userName={userName}
              fastingBloodSugar={fastingBloodSugarLevel}
              currentBloodSugar={currentBloodSugarLevel}
            />
          )}
        </HomeTop>
        <HomeContent>
          <TouchableOpacity onPress={handleGotoSearch} activeOpacity={1}>
            <Search
              disabled
              placeholder="정보가 궁금한 음식명을 입력해보세요"
            />
          </TouchableOpacity>
          <WeeklyCalendar today={today} setToday={setToday} />
          {isAdditionalInfoSuccess && (
            <>
              <Graph graphData={bloodSugarList} />
              <ReportCardBox>
                <ReportCard
                  navigate="Medicine"
                  isChecked={isCheckedMedicine}
                  onPress={toggleMedicine}
                  name={medicineName}
                />
                <ReportCard
                  navigate="Insulin"
                  isChecked={isCheckedInsulin}
                  onPress={toggleInsulin}
                  name={insulinName}
                />
              </ReportCardBox>
            </>
          )}
          <MealCard size="m" today={today} />
        </HomeContent>
      </HomeBox>
    </Layout>
  );
}
