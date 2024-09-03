import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {MainValue} from '../../components/value/MainValue';
import {HomeBox, HomeContent, HomeIcons, HomeTop} from './styles';
import Graph from '../../components/graph/Graph';
import Layout from '../layout/Layout';
import SelectButtonGroup from '../../modules/renderSelectButton';
import Search from './search/Search';
import TopBox from './topBox/TopBox';
import MyPageIcon from '../../assets/images/main_mypage.svg';
import NoticeIcon from '../../assets/images/main_notice.svg';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';

const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(Math.random() * 100);
  }
  return data;
};
const data = generateHourlyData();

const userData = {
  name: '김유성',
  bloodSugar: 87,
  profile: require('../../assets/images/mainProfile.png'),
};

const profileImage = require('../../assets/images/mainProfile.png');
const userName = '박지혜';
const FirsBloodSugar = 87;
const nowBloodSugar = 100;

const mealList = ['아침', '점심', '저녁', '간식'];
const medicineList = ['타이레놀', '항생제', '유산균'];

export default function Home() {
  const [searchFood, setSearchFood] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<number | null>(null);

  const handleSearch = useCallback(() => {
    if (searchFood.trim()) {
      Alert.alert('검색어', searchFood);
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood]);

  const handleBloodSugar = useCallback(() => {}, []);

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
          <MainValue title="공복 혈당 지수" value={userData.bloodSugar} />
          <MainValue title="현재 혈당 지수" onPress={handleBloodSugar} />
          <SelectButtonGroup
            title="식단 기록"
            itemList={mealList}
            selectedItem={selectedMenu}
            setSelectedItem={setSelectedMenu}
          />
          <SelectButtonGroup
            title="복약 기록"
            itemList={medicineList}
            selectedItem={selectedMedicine}
            setSelectedItem={setSelectedMedicine}
          />
          <Graph graphData={data} />
        </HomeContent>
      </HomeBox>
    </Layout>
  );
}
