import React from 'react';
import {NotifyContainer, NotifyText} from './styles';
import {NotifyListItemType} from './types';
import Toggle from '../../toggle/Toggle';

export default function NotifyListItem({
  children,
  isToggleOn,
  setIsToggleOn,
}: NotifyListItemType) {
  return (
    <NotifyContainer>
      <NotifyText>{children}</NotifyText>
      <Toggle isToggleOn={isToggleOn} setIsToggleOn={setIsToggleOn} />
    </NotifyContainer>
  );
}
