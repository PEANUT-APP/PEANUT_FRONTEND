import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body2} from '../text/Text';
import {MyListType} from './types';
import NullIcon from '../icon/NullIcon';

export const MyListContainer = styled.View`
  width: 350px;
  height: 48px;
  background-color: ${colors.white};
  border-radius: 6px;
  justify-content: center;
  padding: 0 24px;
`;

export const MyListBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const MyListText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export default function MyList({text}: MyListType) {
  return (
    <MyListContainer>
      <MyListBox>
        <NullIcon size="xl" />
        <MyListText color={colors.TextNeutral}>{text}</MyListText>
      </MyListBox>
    </MyListContainer>
  );
}
