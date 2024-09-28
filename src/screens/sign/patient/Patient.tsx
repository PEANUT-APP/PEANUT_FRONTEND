import React from 'react';
import GlobalView from '../../../styles/GlobalStyle';
import {
  ConnectTitleBox,
  ConnectTitleText,
  SignBox,
  SignContainer,
  SignTitleBox,
  SignTitleText,
} from '../styles';
import {TouchableOpacity} from 'react-native';
import {useBackHandler} from '../../../modules/commonHooks';
import DesignIcon from '../../../components/icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {PatientType} from './types';

export default function Patient({
  title,
  subTitle,
  children,
  button,
  isComplete,
}: PatientType) {
  const {handleBack} = useBackHandler();

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
            <ConnectTitleBox>
              <SignTitleText color={colors.TextNormal} weight="bold">
                {title}
              </SignTitleText>
              <ConnectTitleText color={colors.TextNeutral}>
                {subTitle}
              </ConnectTitleText>
            </ConnectTitleBox>
          </SignTitleBox>
          {children}
        </SignBox>
        {button}
      </SignContainer>
    </GlobalView>
  );
}
