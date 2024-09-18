import React, {useEffect, useState} from 'react';
import NavigationButton from '../button/NavigationButton';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NavigationList} from '../../navigation/types';
import {
  NavigationBarBox,
  NavigationBarContainer,
  NavigationPair,
} from './styles';
import {NavigationType} from './types';
import CameraButton from '../camera/CameraButton';

export default function NavigationBar({role = 'Patient'}: NavigationType) {
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
      {role === 'Patient' && <CameraButton />}
      <NavigationBarBox role={role}>
        <NavigationPair role={role}>
          <NavigationButton
            type="home"
            active={activeTab === 'Home' || activeTab === 'MealRecord'}
            onPress={() => handlePress('Home')}>
            홈
          </NavigationButton>
          <NavigationButton
            type="medical"
            active={activeTab === 'Medical'}
            onPress={() => handlePress('Medical')}>
            식단기록
          </NavigationButton>
        </NavigationPair>
        <NavigationPair role={role}>
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
        </NavigationPair>
      </NavigationBarBox>
    </NavigationBarContainer>
  );
}
