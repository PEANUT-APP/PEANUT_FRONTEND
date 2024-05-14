import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body2} from '../text/Text';
import {SelectButtonStyleType, SelectButtonType} from './types';
import DesignIcon from '../icon/DesignIcon';

const getBorderColor = (isSelected: boolean) =>
  isSelected ? colors.primaryNormal : colors.LineDisabled;
const getBackgroundColor = (isSelected: boolean) =>
  isSelected ? colors.SolidSecondaryActive : colors.SolidTertiaryActive;
const getTextColor = (isSelected: boolean) =>
  isSelected ? colors.primaryStrong : colors.TextDisabled;

const SelectContainer = styled.TouchableOpacity<SelectButtonStyleType>`
  display: inline-flex;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 20px;
  border: 1px solid ${({isSelected}) => getBorderColor(isSelected)};
  background-color: ${({isSelected}) => getBackgroundColor(isSelected)};
`;

const SelectText = styled(Body2)<SelectButtonStyleType>`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${({isSelected}) => getTextColor(isSelected)};
`;

export default function SelectButton({
  children,
  isSelected,
  onPress,
}: SelectButtonType) {
  return (
    <SelectContainer
      accessibilityRole="button"
      activeOpacity={1}
      isSelected={isSelected}
      onPress={onPress}>
      {isSelected && (
        <DesignIcon type="check" size="s" color={colors.primaryStrong} />
      )}
      <SelectText isSelected={isSelected} weight="normal">
        {children}
      </SelectText>
    </SelectContainer>
  );
}
