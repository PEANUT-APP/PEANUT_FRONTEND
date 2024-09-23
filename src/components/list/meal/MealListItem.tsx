import React from 'react';
import {
  MealListItemContainer,
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
  onDelete,
}: MealListItemType) {
  return (
    <MealListItemContainer>
      <View>
        <MealListItemName>{name}</MealListItemName>
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
