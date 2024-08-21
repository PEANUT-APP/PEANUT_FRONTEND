import React from 'react';
import styled from 'styled-components/native';
import {Body1} from '../text/Text';
import {DropdownFieldType} from './types';
import {useButtonState} from '../button/useButtonState';
import {colors} from '../../styles/colors';

const FieldContainer = styled.TouchableOpacity<{isSelected: boolean}>`
  width: 328px;
  padding: 16px;
  border-radius: 4px;
  background-color: ${props =>
    props.isSelected ? colors.SolidSecondaryActive : 'transparent'};
`;

const FieldText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export default function DropdownField({
  children,
  onPress,
  isSelected,
}: DropdownFieldType) {
  const {handlePressIn, handlePressOut} = useButtonState();

  return (
    <FieldContainer
      isSelected={isSelected}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={1}>
      <FieldText color={isSelected ? colors.primaryStrong : colors.TextNormal}>
        {children}
      </FieldText>
    </FieldContainer>
  );
}
