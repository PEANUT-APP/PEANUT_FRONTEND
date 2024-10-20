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
import CameraButton from '../camera/CameraButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

export default function NavigationBar() {
  const [activeTab, setActiveTab] = useState<keyof NavigationList>('Home');
  const navigation = useNavigation<NavigationProp<NavigationList>>();
  const route = useRoute();

  const userState = useSelector((state: RootState) => state.user.userState);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setActiveTab(route.name as keyof NavigationList);
    });
    return unsubscribe;
  }, [navigation, route.name]);

  const handlePress = (screenName: keyof NavigationList) => {
    setActiveTab(screenName);
    navigation.navigate(screenName as string);
  };

  return (
    <NavigationBarContainer>
      {userState === 'Patient' && <CameraButton />}
      <NavigationBarBox role={userState}>
        <NavigationPair role={userState}>
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
            진료 노트
          </NavigationButton>
        </NavigationPair>
        <NavigationPair role={userState}>
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
