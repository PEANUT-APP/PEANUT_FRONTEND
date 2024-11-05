import React, {forwardRef} from 'react';
import {colors} from '../../styles/colors';
import {TouchableWithoutFeedback} from 'react-native';
import MealGraph from './graph/MealGraph';
import {MealCardHandles, MealCardType} from './types';
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

function MealCardNavMenu({
  selectedTime,
  handleTimeChange,
}: {
  selectedTime: string;
  handleTimeChange: (item: string) => void;
}) {
  return (
    <MealCardNav>
      {times.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => handleTimeChange(item)}>
          <MealCardNavItem
            color={
              item === selectedTime ? colors.primaryStrong : colors.TextDisabled
            }>
            {item}
          </MealCardNavItem>
        </TouchableWithoutFeedback>
      ))}
    </MealCardNav>
  );
}

function MealGraphs({
  carbohydrate,
  fat,
  protein,
  total,
  prevTotal,
}: {
  carbohydrate: number;
  fat: number;
  protein: number;
  total: number;
  prevTotal: number;
}) {
  return (
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
  );
}

const MealCard = forwardRef<MealCardHandles, MealCardType>(
  ({size, time}, ref) => {
    const {
      selectedTime,
      isAllFoodInfoSuccess,
      isFoodByTimeSuccess,
      isPatientAllFoodInfoSuccess,
      isPatientFoodByTimeSuccess,
      isFeedbackFoodByTimeSuccess,
      handleTimeChange,
      handleGoToRecord,
      carbohydrate,
      fat,
      protein,
      total,
      prevTotal,
    } = useMealCard(size, ref, time);

    return (
      <MealCardContainer onPress={handleGoToRecord} activeOpacity={1}>
        {size === 'm' && (
          <MealCardTitle weight="bold" color={colors.TextNormal}>
            식사 기록
          </MealCardTitle>
        )}
        <MealCardBox>
          {size === 'm' && (
            <MealCardNavMenu
              selectedTime={selectedTime}
              handleTimeChange={handleTimeChange}
            />
          )}
          {(isAllFoodInfoSuccess ||
            isFoodByTimeSuccess ||
            isPatientAllFoodInfoSuccess ||
            isPatientFoodByTimeSuccess ||
            isFeedbackFoodByTimeSuccess) && (
            <MealCardContent>
              <MealGraphs
                carbohydrate={carbohydrate}
                fat={fat}
                protein={protein}
                total={total}
                prevTotal={prevTotal}
              />
            </MealCardContent>
          )}
        </MealCardBox>
      </MealCardContainer>
    );
  },
);

export default MealCard;
