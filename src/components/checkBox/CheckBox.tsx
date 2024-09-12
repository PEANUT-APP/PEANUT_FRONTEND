import React from 'react';
import {CheckBoxContainer} from './styles';
import {CheckBoxType} from './types';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';

export default function CheckBox({isChecked, onPress}: CheckBoxType) {
  return (
    <CheckBoxContainer
      isChecked={isChecked}
      onPress={onPress}
      activeOpacity={1}>
      {isChecked && <DesignIcon type="check" color={colors.white} size="s" />}
    </CheckBoxContainer>
  );
}
