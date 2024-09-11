import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import PlusIcon from '../icon/PlusIcon';
import {PlusButtonType} from './types';

const PlusButtonContainer = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background-color: ${colors.primaryNormal};
  justify-content: center;
  align-items: center;
`;

export default function PlusButton({onPress}: PlusButtonType) {
  return (
    <PlusButtonContainer
      accessibilityRole="button"
      activeOpacity={1}
      onPress={onPress}>
      <PlusIcon size="m" color={colors.white} />
    </PlusButtonContainer>
  );
}
