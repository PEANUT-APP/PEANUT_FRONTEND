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
  SignTitleBox,
  SignTitleText,
} from './styles';
import {useSign} from './hooks';

export default function Sign({
  title,
  children,
  button,
  verification,
  setVerification,
  step,
  setStep,
  type,
}: SignType) {
  const {handleBack} = useSign(verification, setVerification, step, setStep);

  return (
    <GlobalView>
      <SignContainer type={type}>
        <SignBox>
          <SignTitleBox>
            <TouchableOpacity activeOpacity={1} onPress={handleBack}>
              <DesignIcon type="back" size="l" color={colors.TextNeutral} />
            </TouchableOpacity>
            <SignTitleText color={colors.TextNormal} weight="bold">
              {title}
            </SignTitleText>
          </SignTitleBox>
          <SignFormBox>{children}</SignFormBox>
        </SignBox>
        <SignButtonBox>{button}</SignButtonBox>
      </SignContainer>
    </GlobalView>
  );
}
