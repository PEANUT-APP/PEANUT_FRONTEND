import React, {useCallback, useState} from 'react';
import {colors} from '../../styles/colors';
import {Alert, View} from 'react-native';
import ProfileImage from '../../components/profile/ProfileImage';
import {MainValue} from '../../components/value/MainValue';
import {
  HomeBox,
  HomeContent,
  HomeTop,
  HomeWelcomeContainer,
  HomeWelcomeText,
} from './styles';
import Graph from '../../components/graph/Graph';
import Layout from '../layout/Layout';
import SelectButtonGroup from '../../modules/renderSelectButton';
import Search from './search/Search';

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
  profile: require('../../assets/images/profile.png'),
};

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
        <HomeTop
          colors={['#ff7b74', '#ffbead']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <HomeWelcomeContainer>
            <ProfileImage source={userData.profile} />
            <View>
              <HomeWelcomeText color={colors.white}>
                <HomeWelcomeText color={colors.white} weight="bold">
                  {userData.name || '사용자'}님,
                </HomeWelcomeText>
                좋은 아침이에요!
              </HomeWelcomeText>
              <HomeWelcomeText color={colors.white}>
                오늘도 건강한 하루 보내봐요.
              </HomeWelcomeText>
            </View>
          </HomeWelcomeContainer>
        </HomeTop>
        <HomeContent>
          <Search onChangeText={setSearchFood} onSubmitEditing={handleSearch} />
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
