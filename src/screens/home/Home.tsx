import React, {useCallback, useState} from 'react';
import GlobalView from '../../styles/GlobalStyle';
import {colors} from '../../styles/colors';
import NavigationBar from '../../components/navigation/NavigationBar';
import {Alert, View} from 'react-native';
import SearchIcon from '../../assets/images/Search.svg';
import ProfileImage from '../../components/profile/ProfileImage';
import {LargeMainValue, MainValue} from '../../components/value/MainValue';
import SelectButton from '../../components/button/SelectButton';
import {
  HomeBox,
  HomeContainer,
  HomeContent,
  HomeScroll,
  HomeSearchBox,
  HomeSearchContainer,
  HomeSearchInput,
  HomeTop,
  HomeWelcomeContainer,
  HomeWelcomeText,
} from './style';
import Graph from '../../components/graph/Graph';
import CameraButton from '../../components/button/CameraButton';

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

  const handleMenu = useCallback((id: number) => {
    setSelectedMenu(prevId => (prevId === id ? null : id));
  }, []);

  const handleMedicine = useCallback((id: number) => {
    setSelectedMedicine(prevId => (prevId === id ? null : id));
  }, []);

  const handleBloodSugar = useCallback(() => {}, []);

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

  return (
    <GlobalView>
      <HomeContainer>
        <HomeScroll>
          <HomeBox>
            <HomeTop>
              <HomeSearchContainer>
                <View
                  style={{
                    backgroundColor: '#d9d9d9',
                    width: 50,
                    height: 48,
                  }}
                />
                <HomeSearchBox>
                  <HomeSearchInput
                    placeholder="음식명을 입력해보세요"
                    placeholderTextColor={colors.TextDisabled}
                    returnKeyType="search"
                    onChangeText={setSearchFood}
                    onSubmitEditing={handleSearch}
                  />
                  <SearchIcon onPress={handleSearch} />
                </HomeSearchBox>
              </HomeSearchContainer>
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
              <MainValue title="공복 혈당 지수" value={userData.bloodSugar} />
              <MainValue title="현재 혈당 지수" onPress={handleBloodSugar} />
              <LargeMainValue title="식단 기록">
                <SelectButton
                  isSelected={selectedMenu === 1}
                  onPress={() => handleMenu(1)}>
                  아침
                </SelectButton>
                <SelectButton
                  isSelected={selectedMenu === 2}
                  onPress={() => handleMenu(2)}>
                  점심
                </SelectButton>
                <SelectButton
                  isSelected={selectedMenu === 3}
                  onPress={() => handleMenu(3)}>
                  저녁
                </SelectButton>
                <SelectButton
                  isSelected={selectedMenu === 4}
                  onPress={() => handleMenu(4)}>
                  간식
                </SelectButton>
              </LargeMainValue>
              <LargeMainValue title="복약 기록">
                <SelectButton
                  isSelected={selectedMedicine === 1}
                  onPress={() => handleMedicine(1)}>
                  타이레놀
                </SelectButton>
                <SelectButton
                  isSelected={selectedMedicine === 2}
                  onPress={() => handleMedicine(2)}>
                  항생제
                </SelectButton>
                <SelectButton
                  isSelected={selectedMedicine === 3}
                  onPress={() => handleMedicine(3)}>
                  유산균
                </SelectButton>
              </LargeMainValue>
              <Graph graphData={data} />
            </HomeContent>
          </HomeBox>
        </HomeScroll>
        <CameraButton />
      </HomeContainer>
      <NavigationBar />
    </GlobalView>
  );
}
