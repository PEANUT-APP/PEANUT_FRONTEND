import React from 'react';
import styled from 'styled-components/native';
import GlobalView from '../../styles/GlobalStyle';
import {SignType} from './types';
import {Title} from '../../components/text/Text';
import {colors} from '../../styles/colors';
import DesignIcon from '../icon/DesignIcon';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SignContainer = styled.View`
  flex: 1;
  padding: 61px 20px 111px;
  justify-content: space-between;
`;

const SignBox = styled.View`
  gap: 20px;
`;

const SignTitleBox = styled.View`
  gap: 24px;
`;

const SignTitleText = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
`;

const SignFormBox = styled.View`
  gap: 16px;
`;

const SignButtonBox = styled.View`
  gap: 8px;
`;

export default function Sign({
  title,
  children,
  button,
  verification,
  setVerification,
}: SignType) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (verification) {
      setVerification?.(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <GlobalView>
      <SignContainer>
        <SignBox>
          <SignTitleBox>
            <TouchableOpacity activeOpacity={1} onPress={handleBack}>
              <DesignIcon type="back" size="l" />
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
