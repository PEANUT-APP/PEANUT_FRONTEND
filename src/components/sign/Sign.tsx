import React from 'react';
import styled from 'styled-components/native';
import GlobalView from '../../styles/GlobalStyle';
import {SignType} from './types';
import {Title} from '../../components/text/Text';
import NullIcon from '../../components/icon/NullIcon';
import {colors} from '../../styles/colors';

const SignContainer = styled.View`
  flex: 1;
  padding: 61px 20px 111px;
  justify-content: space-between;
`;

const SignBox = styled.View`
  gap: 20px;
`;

const SignTitleBox = styled.View`
  gap: 12px;
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

export default function Sign({title, children, button}: SignType) {
  return (
    <GlobalView>
      <SignContainer>
        <SignBox>
          <SignTitleBox>
            <NullIcon size="xl" />
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
