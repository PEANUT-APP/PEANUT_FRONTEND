import React from 'react';
import {colors} from '../../styles/colors';
import {MultiSelectType} from './types';
import DesignIcon from '../icon/DesignIcon';
import {MultiChipsContainer, MultiChipsText} from './styles';

export default function MultiSelectChip({
  children,
  isSelected,
  onPress,
}: MultiSelectType) {
  return (
    <MultiChipsContainer
      accessibilityRole="button"
      activeOpacity={1}
      isSelected={isSelected}
      onPress={onPress}>
      {isSelected && (
        <DesignIcon type="check" size="s" color={colors.primaryStrong} />
      )}
      <MultiChipsText isSelected={isSelected} weight="normal">
        {children}
      </MultiChipsText>
    </MultiChipsContainer>
  );
}
