import React from 'react';
import {
  SearchListItemContainer,
  SearchListItemContent,
  SearchListItemBrand,
  SearchListItemFood,
} from './styles';
import {useButtonState} from '../../../modules/useButtonState';

export default function SearchListItem() {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  return (
    <SearchListItemContainer
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <SearchListItemContent>
        <SearchListItemFood>현미밥</SearchListItemFood>
        <SearchListItemBrand>햇반(210g)</SearchListItemBrand>
      </SearchListItemContent>
      <SearchListItemFood>GI 20</SearchListItemFood>
    </SearchListItemContainer>
  );
}
