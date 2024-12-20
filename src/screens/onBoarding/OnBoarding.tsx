import React from 'react';
import GlobalView from '../../styles/GlobalStyle';
import PrimaryButton from '../../components/button/PrimaryButton';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {
  KakaoLoginBox,
  KakaoLoginText,
  OnBoardingBox,
  OnBoardingContainer,
  OnBoardingLoginBox,
  OnBoardingLogo,
} from './styles';
import {PrimaryTextButton} from '../../components/button/TextButton';
import {useOnBoarding} from './hooks';
import Logo from '../../assets/images/Logo.svg';

export default function OnBoarding() {
  const {onPress, handleKakaoLogin} = useOnBoarding();

  return (
    <GlobalView>
      <OnBoardingContainer>
        <OnBoardingLogo>
          <Logo />
        </OnBoardingLogo>
        <OnBoardingBox>
          <OnBoardingLoginBox>
            <PrimaryButton size="l" onPress={() => onPress('SignIn')}>
              이메일로 로그인
            </PrimaryButton>
            <KakaoLoginBox onPress={handleKakaoLogin}>
              <DesignIcon type="kakao" size="m" />
              <KakaoLoginText weight="bold" color={colors.TextNormal}>
                카카오로 로그인
              </KakaoLoginText>
            </KakaoLoginBox>
          </OnBoardingLoginBox>
          <PrimaryTextButton size="m" onPress={() => onPress('SignUp')}>
            회원가입
          </PrimaryTextButton>
        </OnBoardingBox>
      </OnBoardingContainer>
    </GlobalView>
  );
}
