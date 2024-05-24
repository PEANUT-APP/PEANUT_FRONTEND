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

export default function OnBoarding() {
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
          <SignInBox>
            <SignInText color={colors.TextNeutral} weight="bold">
              회원가입
            </SignInText>
          </SignInBox>
        </OnBoardingLoginBox>
      </OnBoardingContainer>
    </GlobalView>
  );
}
