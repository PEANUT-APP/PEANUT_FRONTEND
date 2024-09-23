import React from 'react';
import {
  MealListContainer,
  MealListNoneBox,
  MealListNoneImage,
  MealListNoneText,
} from './styles';
import {MealListType} from './types';
import MealListItem from './MealListItem';
import {colors} from '../../../styles/colors';

export default function MealList({mealListData, onDelete}: MealListType) {
  // 등록된 음식이 없는 경우
  if (!mealListData?.length) {
    return (
      <MealListContainer>
        <MealListNoneBox>
          <MealListNoneImage />
          <MealListNoneText weight="bold" color={colors.TextDisabled}>
            등록된 음식이 존재하지 않아요
          </MealListNoneText>
        </MealListNoneBox>
      </MealListContainer>
    );
  }

  // 등록된 음식이 있을 경우
  return (
    <MealListContainer>
      {mealListData.map(({name, giIndex}, index) => (
        <MealListItem
          key={index}
          name={name}
          giIndex={giIndex ? giIndex : 0}
          onDelete={() => onDelete(index, name)}
        />
      ))}
    </MealListContainer>
  );
}
