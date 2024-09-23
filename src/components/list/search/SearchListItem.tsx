import React from 'react';
import {
  SearchListItemContainer,
  SearchListItemContent,
  SearchListItemFood,
} from './styles';
import {useButtonState} from '../../../modules/useButtonState';
import {SearchListItemType} from './types';

export default function SearchListItem({
  name,
  giIndex,
  onPress,
}: SearchListItemType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  return (
    <SearchListItemContainer
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}>
      <SearchListItemContent>
        <SearchListItemFood>{name}</SearchListItemFood>
        {/*<SearchListItemBrand>햇반(210g)</SearchListItemBrand>*/}
      </SearchListItemContent>
      <SearchListItemFood>GI {giIndex}</SearchListItemFood>
    </SearchListItemContainer>
  );
}
