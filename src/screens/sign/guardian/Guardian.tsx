import React from 'react';
import GlobalView from '../../../styles/GlobalStyle';
import {
  ConnectTitleBox,
  ConnectTitleText,
  SignBox,
  SignTitleBox,
  SignTitleText,
} from '../styles';
import {TouchableOpacity} from 'react-native';
import {useBackHandler} from '../../../modules/commonHooks';
import DesignIcon from '../../../components/icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {GuardianType} from './types';
import {GuardianContainer} from './styles';

export default function Guardian({
  title,
  subTitle,
  children,
  button,
  isComplete,
}: GuardianType) {
  const {handleBack} = useBackHandler();

  return (
    <GlobalView>
      <GuardianContainer>
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
      </GuardianContainer>
    </GlobalView>
  );
}
