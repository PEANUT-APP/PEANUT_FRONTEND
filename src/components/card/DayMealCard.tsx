import React from 'react';
import {
  DayMealCardBox,
  DayMealCardContainer,
  DayMealCardContent,
  DayMealCardFeedbackBox,
  DayMealCardFeedbackText,
  DayMealCardText,
  DayMealCardTitle,
} from './styles';
import ImageCard from '../image/ImageCard';
import PrimaryButton from '../button/PrimaryButton';
import {PrimaryTextButton} from '../button/TextButton';
import {colors} from '../../styles/colors';
import {DayMealCardType} from './types';
import {useDayMealCard} from './hooks';

export default function DayMealCard({time, foodData}: DayMealCardType) {
  const {handleGoToRecording} = useDayMealCard(time);

  return (
    <DayMealCardContainer>
      <ImageCard size="s" />
      <DayMealCardBox>
        <DayMealCardContent>
          <DayMealCardTitle>
            <DayMealCardText weight="bold">{time}</DayMealCardText>
            {!foodData.meal && (
              <PrimaryTextButton size="s" disabled>
                단식했어요
              </PrimaryTextButton>
            )}
          </DayMealCardTitle>
          <DayMealCardText
            color={colors.TextNeutral}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {foodData.meal ? foodData.meal : '아직 식사를 하지 않으셨나요?'}
          </DayMealCardText>
        </DayMealCardContent>
        {foodData.feedback1 || foodData.feedback2 ? (
          <DayMealCardFeedbackBox>
            <DayMealCardFeedbackText
              weight="bold"
              ellipsizeMode="tail"
              numberOfLines={1}>
              {foodData.feedback1}
            </DayMealCardFeedbackText>
            <DayMealCardFeedbackText
              weight="bold"
              ellipsizeMode="tail"
              numberOfLines={1}>
              {foodData.feedback2}
            </DayMealCardFeedbackText>
          </DayMealCardFeedbackBox>
        ) : (
          <PrimaryButton size="m" onPress={handleGoToRecording}>
            기록하기
          </PrimaryButton>
        )}
      </DayMealCardBox>
    </DayMealCardContainer>
  );
}
