import React from 'react';
import styled from 'styled-components/native';
import {Body1} from '../text/Text';
import {DropdownFieldType} from './types';
import {useButtonState} from '../../modules/useButtonState';
import {colors} from '../../styles/colors';

const FieldContainer = styled.TouchableOpacity<{
  isSelected: boolean;
  size: 'm' | 's';
}>`
  width: ${({size}) => (size === 's' ? '133px' : '328px')};
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
  size,
}: DropdownFieldType) {
  const {handlePressIn, handlePressOut} = useButtonState();

  return (
    <FieldContainer
      isSelected={isSelected}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      size={size}
      activeOpacity={1}>
      <FieldText color={isSelected ? colors.primaryStrong : colors.TextNormal}>
        {children}
      </FieldText>
    </FieldContainer>
  );
}
