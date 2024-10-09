import React from 'react';
import {MealListContainer, MealListNoneBox, MealListNoneText} from './styles';
import {MealListType} from './types';
import MealListItem from './MealListItem';
import {colors} from '../../../styles/colors';
import NoneMeal from '../../../assets/images/NoneMeal.svg';

export default function MealList({mealListData, onDelete}: MealListType) {
  // 등록된 음식이 없는 경우
  if (!mealListData?.length) {
    return (
      <MealListNoneBox>
        <NoneMeal />
        <MealListNoneText weight="bold" color={colors.TextDisabled}>
          등록된 음식이 없어요
        </MealListNoneText>
      </MealListNoneBox>
    );
  }

  // 등록된 음식이 있을 경우
  return (
    <MealListContainer>
      {mealListData.map(({name, giIndex, servingCount}, index) => (
        <MealListItem
          key={index}
          name={name}
          giIndex={giIndex ? giIndex : 0}
          servingCount={servingCount}
          onDelete={() => onDelete(index, name)}
        />
      ))}
    </MealListContainer>
  );
}
