import React from 'react';
import GlobalView from '../../styles/GlobalStyle';
import PrimaryButton from '../../components/button/PrimaryButton';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {
  KakaoLoginBox,
  KakaoLoginText,
  OnBoardingContainer,
  OnBoardingLoginBox,
  OnBoardingLogo,
  SignInBox,
  SignInText,
} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export default function OnBoarding() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <GlobalView>
      <OnBoardingContainer>
        <OnBoardingLogo />
        <OnBoardingLoginBox>
          <PrimaryButton size="l">이메일로 로그인</PrimaryButton>
          <KakaoLoginBox>
            <DesignIcon type="kakao" size="l" />
            <KakaoLoginText weight="bold" color={colors.TextNormal}>
              카카오로 로그인
            </KakaoLoginText>
          </KakaoLoginBox>
          <SignInBox
            activeOpacity={1}
            accessibilityRole="link"
            onPress={onPress}>
            <SignInText color={colors.TextNeutral} weight="bold">
              회원가입
            </SignInText>
          </SignInBox>
        </OnBoardingLoginBox>
      </OnBoardingContainer>
    </GlobalView>
  );
}
