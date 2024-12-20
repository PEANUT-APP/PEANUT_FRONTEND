import React from 'react';
import GlobalView from '../../styles/GlobalStyle';
import {SignType} from './types';
import {colors} from '../../styles/colors';
import DesignIcon from '../../components/icon/DesignIcon';
import {TouchableOpacity} from 'react-native';
import {
  SignBox,
  SignButtonBox,
  SignContainer,
  SignFormBox,
  SignSubtitle,
  SignTitleBox,
  SignTitlePair,
  SignTitleText,
} from './styles';
import {useSign} from './hooks';

export default function Sign({
  title,
  subTitle,
  children,
  button,
  verification,
  setVerification,
  step,
  setStep,
  isComplete,
}: SignType) {
  const {handleBack} = useSign(verification, setVerification, step, setStep);

  return (
    <GlobalView>
      <SignContainer isComplete={isComplete}>
        <SignBox>
          <SignTitleBox>
            {!isComplete && (
              <TouchableOpacity activeOpacity={1} onPress={handleBack}>
                <DesignIcon type="back" size="l" color={colors.TextNeutral} />
              </TouchableOpacity>
            )}
            <SignTitlePair>
              <SignTitleText color={colors.TextNormal} weight="bold">
                {title}
              </SignTitleText>
              {isComplete && <SignSubtitle>{subTitle}</SignSubtitle>}
            </SignTitlePair>
          </SignTitleBox>
          <SignFormBox>{children}</SignFormBox>
        </SignBox>
        <SignButtonBox>{button}</SignButtonBox>
      </SignContainer>
    </GlobalView>
  );
}
