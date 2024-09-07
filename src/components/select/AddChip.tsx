import React, {useState} from 'react';
import {AddChipsContainer, AddChipsText} from './styles';
import {colors} from '../../styles/colors';
import PlusIcon from '../icon/PlusIcon';
import {AddType} from './types';

export default function AddChips({onPress}: AddType) {
  const [isActive, setIsActive] = useState(false);

  return (
    <AddChipsContainer
      accessibilityRole="button"
      activeOpacity={1}
      isActive={isActive}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      onPress={onPress}>
      <PlusIcon
        size="s"
        color={isActive ? colors.primaryStrong : colors.TextDisabled}
      />
      <AddChipsText isActive={isActive} weight="normal">
        추가하기
      </AddChipsText>
    </AddChipsContainer>
  );
}
