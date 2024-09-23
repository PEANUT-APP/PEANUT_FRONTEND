import React from 'react';
import {colors} from '../../styles/colors';
import {MealTextListItemContainer} from './styles';

import {MealTextListItemType} from '../../components/list/meal/types';
import {
  MealListItemName,
  MealListNoneText,
} from '../../components/list/meal/styles';

export default function MealTextListItem({name, value}: MealTextListItemType) {
  return (
    <MealTextListItemContainer>
      <MealListNoneText color={colors.TextNeutral}>{name}</MealListNoneText>
      <MealListItemName>{value}</MealListItemName>
    </MealTextListItemContainer>
  );
}
