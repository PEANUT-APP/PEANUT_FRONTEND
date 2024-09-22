import React from 'react';
import {SelectChipsContainer, SelectChipsText} from './styles';
import {SelectType} from './types';

export default function SelectChips({
  children,
  isSelected,
  onPress,
}: SelectType) {
  return (
    <SelectChipsContainer
      isSelected={isSelected}
      onPress={onPress}
      activeOpacity={1}>
      <SelectChipsText isSelected={isSelected}>{children}</SelectChipsText>
    </SelectChipsContainer>
  );
}
