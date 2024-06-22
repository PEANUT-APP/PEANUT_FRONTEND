import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import NavigationButton from '../button/NavigationButton';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NavigationList} from '../../navigation/types';

const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 13px 35px 37px;
  background-color: ${colors.white};
  align-items: center;
`;

const NavigationBarBox = styled.View`
  flex-direction: row;
  gap: 40px;
`;

export default function NavigationBar() {
  const [activeTab, setActiveTab] = useState<String>('Home');
  const navigation = useNavigation<NavigationProp<NavigationList>>();
  const route = useRoute();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setActiveTab(route.name as keyof NavigationList);
    });
    return unsubscribe;
  }, [navigation, route.name]);

  const handlePress = (screenName: keyof NavigationList) => {
    setActiveTab(screenName);
    navigation.navigate(screenName);
  };

  return (
    <NavigationBarContainer>
      <NavigationBarBox>
        <NavigationButton
          type="home"
          active={activeTab === 'Home'}
          onPress={() => handlePress('Home')}>
          홈
        </NavigationButton>
        <NavigationButton
          type="dietLog"
          active={activeTab === 'DietLog'}
          onPress={() => handlePress('DietLog')}>
          식단기록
        </NavigationButton>
        <NavigationButton
          type="community"
          active={activeTab === 'Community'}
          onPress={() => handlePress('Community')}>
          커뮤니티
        </NavigationButton>
        <NavigationButton
          type="my"
          active={activeTab === 'My'}
          onPress={() => handlePress('My')}>
          마이
        </NavigationButton>
      </NavigationBarBox>
    </NavigationBarContainer>
  );
}
