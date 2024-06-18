import React, {useState} from 'react';
import GlobalView from '../../styles/GlobalStyle';
import {colors} from '../../styles/colors';
import NavigationBar from '../../components/navigation/NavigationBar';
import {View} from 'react-native';
import SearchIcon from '../../assets/images/Search.svg';
import ProfileImage from '../../components/profile/ProfileImage';
import {LargeMainValue, MainValue} from '../../components/value/MainValue';
import SelectButton from '../../components/button/SelectButton';
import {
  HomeContainer,
  HomeContent,
  HomeScrollContent,
  HomeSearchBox,
  HomeSearchContainer,
  HomeSearchInput,
  HomeTop,
  HomeWelcomeContainer,
  HomeWelcomeText,
} from './style';
import Graph from '../../components/graph/Graph';

const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(Math.random() * 100);
  }
  return data;
};

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<number | null>(null);

  const handleMenu = (id: number) => {
    setSelectedMenu(prevId => (prevId === id ? null : id));
  };
  const handleMedicine = (id: number) => {
    setSelectedMedicine(prevId => (prevId === id ? null : id));
  };

  const data = generateHourlyData();

  return (
    <GlobalView>
      <HomeContainer>
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
              />
              <SearchIcon />
            </HomeSearchBox>
          </HomeSearchContainer>
          <HomeWelcomeContainer>
            <ProfileImage source={require('../../assets/images/profile.png')} />
            <View>
              <HomeWelcomeText color={colors.white}>
                <HomeWelcomeText color={colors.white} weight="bold">
                  김유성님,
                </HomeWelcomeText>
                좋은 아침이에요!
              </HomeWelcomeText>
              <HomeWelcomeText color={colors.white}>
                오늘도 건강한 하루 보내봐요.
              </HomeWelcomeText>
            </View>
          </HomeWelcomeContainer>
        </HomeTop>
        <HomeScrollContent>
          <HomeContent>
            <MainValue title="공복 혈당 지수" value={87} />
            <MainValue title="현재 혈당 지수" />
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
        </HomeScrollContent>
      </HomeContainer>
      <NavigationBar />
    </GlobalView>
  );
}
