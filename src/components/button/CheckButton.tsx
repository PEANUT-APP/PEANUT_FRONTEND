import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {CheckButtonType} from './types';
import DesignIcon from '../icon/DesignIcon';

const CheckButtonContainer = styled.TouchableOpacity<{isChecked: boolean}>`
  width: 39px;
  height: 39px;
  border-width: 1px;
  border-radius: 100px;
  border-color: ${({isChecked}) =>
    isChecked ? colors.primaryNormal : colors.LineDisabled};
  background-color: ${({isChecked}) =>
    isChecked ? colors.SolidSecondaryActive : colors.SolidTertiaryActive};
  align-items: center;
  justify-content: center;
`;

export default function CheckButton({isChecked, onPress}: CheckButtonType) {
  return (
    <CheckButtonContainer
      onPress={onPress}
      isChecked={isChecked}
      activeOpacity={1}>
      {isChecked && (
        <DesignIcon type="check" color={colors.primaryNormal} size="s" />
      )}
    </CheckButtonContainer>
  );
}
