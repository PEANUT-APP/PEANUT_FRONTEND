import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {
  HomeBox,
  HomeContent,
  HomeIcons,
  HomeTop,
  ReportCardBox,
} from './styles';
import Graph from '../../components/graph/Graph';
import Layout from '../layout/Layout';
import Search from './search/Search';
import TopBox from './topBox/TopBox';
import MyPageIcon from '../../assets/images/main_mypage.svg';
import NoticeIcon from '../../assets/images/main_notice.svg';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import ReportCard from './reportCard/ReportCard';
import useMain from './hooks';

const profileImage = require('../../assets/images/mainProfile.png');

export default function Home() {
  const [searchFood, setSearchFood] = useState('');

  const handleSearch = useCallback(() => {
    if (searchFood.trim()) {
      Alert.alert('검색어', searchFood);
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood]);

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
  } = useMain();

  return (
    <Layout paddingBottom={107}>
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
        {isAdditionalInfoSuccess && (
          <HomeContent>
            <Search
              onChangeText={setSearchFood}
              onSubmitEditing={handleSearch}
            />
            <WeeklyCalendar today={today} setToday={setToday} />
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
          </HomeContent>
        )}
      </HomeBox>
    </Layout>
  );
}
