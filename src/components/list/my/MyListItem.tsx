import React from 'react';
import {MyListItemContainer, MyListItemText} from './styles';
import NullIcon from '../../icon/NullIcon';
import {MyListItemType} from './types';

export default function MyListItem({children, onPress}: MyListItemType) {
  return (
    <MyListItemContainer activeOpacity={1} onPress={onPress}>
      <NullIcon size="xl" />
      <MyListItemText>{children}</MyListItemText>
    </MyListItemContainer>
  );
}
