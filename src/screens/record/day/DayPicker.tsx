import React from 'react';
import {PickerContainer, PickerText} from './styles';
import {DayPickerType} from './types';

export default function DayPicker({children, status, onPress}: DayPickerType) {
  return (
    <PickerContainer status={status} onPress={onPress}>
      <PickerText status={status}>{children}</PickerText>
    </PickerContainer>
  );
}
