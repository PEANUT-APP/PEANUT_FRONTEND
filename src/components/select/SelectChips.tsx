import React from 'react';
import {SelectChipsContainer, SelectChipsText} from './styles';
import {SelectType} from './types';

export default function SelectChips({
  children,
  isSelected,
  onPress,
}: SelectType) {
  const handlePress = () => {
    if (children !== '전체' && onPress) {
      onPress(); // '전체'가 아닐 때만 onPress 실행
    }
  };
  return (
    <SelectChipsContainer
      isSelected={isSelected}
      onPress={handlePress}
      activeOpacity={1}>
      <SelectChipsText isSelected={isSelected}>{children}</SelectChipsText>
    </SelectChipsContainer>
  );
}
