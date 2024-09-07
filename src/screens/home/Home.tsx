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

const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(Math.random() * 200);
  }
  return data;
};
const data = generateHourlyData();

const profileImage = require('../../assets/images/mainProfile.png');
const userName = '박지혜';
const FirsBloodSugar = 87;
const nowBloodSugar = 100;

export default function Home() {
  const [searchFood, setSearchFood] = useState('');

  const handleSearch = useCallback(() => {
    if (searchFood.trim()) {
      Alert.alert('검색어', searchFood);
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood]);

  return (
    <Layout paddingBottom={107}>
      <HomeBox>
        <HomeTop source={require('../../assets/images/gradientBackground.png')}>
          <HomeIcons>
            <MyPageIcon />
            <NoticeIcon />
          </HomeIcons>
          <TopBox
            profileImage={profileImage}
            userName={userName}
            firstBloodSugar={FirsBloodSugar}
            nowBloodSugar={nowBloodSugar}
          />
        </HomeTop>
        <HomeContent>
          <Search onChangeText={setSearchFood} onSubmitEditing={handleSearch} />
          <WeeklyCalendar />
          <Graph graphData={data} />
          <ReportCardBox>
            <ReportCard navigate="Medicine" />
            <ReportCard navigate="Insulin" />
          </ReportCardBox>
        </HomeContent>
      </HomeBox>
    </Layout>
  );
}
