import React from 'react';
import {
  MealListItemContainer,
  MealListItemDescription,
  MealListItemFunc,
  MealListItemGI,
  MealListItemName,
} from './styles';
import {TouchableOpacity, View} from 'react-native';
import DeleteIcon from '../../icon/DeleteIcon';
import {colors} from '../../../styles/colors';
import {MealListItemType} from './types';

export default function MealListItem({
  name,
  giIndex,
  servingCount,
  onDelete,
}: MealListItemType) {
  return (
    <MealListItemContainer>
      <View>
        <MealListItemName>{name}</MealListItemName>
        {servingCount && (
          <MealListItemDescription>{servingCount}인분</MealListItemDescription>
        )}
      </View>
      <MealListItemFunc>
        <MealListItemGI>GI {giIndex}</MealListItemGI>
        <TouchableOpacity onPress={onDelete} activeOpacity={1}>
          <DeleteIcon size="l" color={colors.TextDisabled} />
        </TouchableOpacity>
      </MealListItemFunc>
    </MealListItemContainer>
  );
}
