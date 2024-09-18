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
    handleGoToRecord,
    carbohydrate,
    fat,
    protein,
    total,
    prevTotal,
  } = useMealCard(today);

  return (
    <MealCardContainer onPress={handleGoToRecord} activeOpacity={1}>
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
              <MealGraph
                name="단백질"
                value={protein}
                total={total}
                isLast
                prevTotal={prevTotal}
              />
            </MealCardGraphBox>
          </MealCardContent>
        )}
      </MealCardBox>
    </MealCardContainer>
  );
}
