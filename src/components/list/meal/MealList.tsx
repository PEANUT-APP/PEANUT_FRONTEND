import React from 'react';
import {
  MealListContainer,
  MealListNoneBox,
  MealListNoneImage,
  MealListNoneText,
} from './styles';
import {MealListType} from './types';
import MealListItem from './MealListItem';

export default function MealList({mealListData, onDelete}: MealListType) {
  return (
    <MealListContainer>
      {mealListData?.length === 0 ? (
        <MealListNoneBox>
          <MealListNoneImage />
          <MealListNoneText weight="bold">
            등록된 음식이 존재하지 않아요
          </MealListNoneText>
        </MealListNoneBox>
      ) : (
        mealListData?.map(({name, giIndex}, index) => (
          <MealListItem
            name={name}
            giIndex={giIndex}
            key={index}
            onDelete={() => onDelete(index)}
          />
        ))
      )}
    </MealListContainer>
  );
}
