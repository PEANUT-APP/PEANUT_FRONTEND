import React from 'react';
import {colors} from '../../styles/colors';
import {TouchableWithoutFeedback} from 'react-native';
import MealGraph from './graph/MealGraph';
import {MealCardType} from './types';
import {
  MealCardBox,
  MealCardContainer,
  MealCardContent,
  MealCardGraphBox,
  MealCardKcal,
  MealCardKcalBox,
  MealCardKcalDescription,
  MealCardNav,
  MealCardNavItem,
  MealCardTitle,
} from './styles';
import {useMealCard} from './hooks';

const times = ['전체', '아침', '점심', '저녁', '간식'];

export default function MealCard({size, today}: MealCardType) {
  const {
    selectedTime,
    isAllFoodInfoSuccess,
    isFoodByTimeSuccess,
    handleTimeChange,
    carbohydrate,
    fat,
    protein,
    total,
  } = useMealCard(today);

  return (
    <MealCardContainer>
      {size === 'm' && (
        <MealCardTitle weight="bold" color={colors.TextNormal}>
          식사 기록
        </MealCardTitle>
      )}
      <MealCardBox>
        {size === 'm' && (
          <MealCardNav>
            {times.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleTimeChange(item)}>
                <MealCardNavItem
                  color={
                    item === selectedTime
                      ? colors.primaryStrong
                      : colors.TextDisabled
                  }>
                  {item}
                </MealCardNavItem>
              </TouchableWithoutFeedback>
            ))}
          </MealCardNav>
        )}
        {(isAllFoodInfoSuccess || isFoodByTimeSuccess) && (
          <MealCardContent>
            <MealCardGraphBox>
              <MealGraph name="탄수화물" value={carbohydrate} total={total} />
              <MealGraph name="지방" value={fat} total={total} />
              <MealGraph name="단백질" value={protein} total={total} />
            </MealCardGraphBox>
            <MealCardKcalBox>
              <MealCardKcal weight="bold">800 kcal</MealCardKcal>
              <MealCardKcalDescription>총 섭취 칼로리</MealCardKcalDescription>
            </MealCardKcalBox>
          </MealCardContent>
        )}
      </MealCardBox>
    </MealCardContainer>
  );
}
