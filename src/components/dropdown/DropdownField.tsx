import React from 'react';
import styled from 'styled-components/native';
import {Body1} from '../text/Text';
import {DropdownFieldType} from './types';
import {useButtonState} from '../../modules/useButtonState';
import {colors} from '../../styles/colors';

const FieldContainer = styled.TouchableOpacity<{isPressed: boolean}>`
  width: 328px;
  padding: 16px;
  border-radius: 4px;
  background-color: ${props =>
    props.isPressed ? colors.SolidSecondaryActive : 'transparent'};
`;

const FieldText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export default function DropdownField({children}: DropdownFieldType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  return (
    <FieldContainer
      isPressed={isPressed}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}>
      <FieldText color={isPressed ? colors.primaryStrong : colors.TextNormal}>
        {children}
      </FieldText>
    </FieldContainer>
  );
}
