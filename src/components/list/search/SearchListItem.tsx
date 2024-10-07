import React from 'react';
import {
  SearchListItemContainer,
  SearchListItemContent,
  SearchListItemFood,
  SearchListItemInfoBox,
} from './styles';
import {useButtonState} from '../../../modules/useButtonState';
import {SearchListItemType} from './types';
import FitIcon from '../../icon/FitIcon';

export default function SearchListItem({
  name,
  giIndex,
  onPress,
  isSelected,
}: SearchListItemType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  return (
    <SearchListItemContainer
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      isSelected={isSelected}>
      <SearchListItemContent>
        <SearchListItemFood>{name}</SearchListItemFood>
        {/*<SearchListItemBrand>햇반(210g)</SearchListItemBrand>*/}
      </SearchListItemContent>
      <SearchListItemInfoBox>
        <SearchListItemFood>GI {giIndex}</SearchListItemFood>
        {isSelected && <FitIcon size="l" />}
      </SearchListItemInfoBox>
    </SearchListItemContainer>
  );
}
