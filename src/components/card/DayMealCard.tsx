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

export default function DayMealCard({
  time,
  meal,
  feedback1,
  feedback2,
}: DayMealCardType) {
  return (
    <DayMealCardContainer>
      <ImageCard size="s" />
      <DayMealCardBox>
        <DayMealCardContent>
          <DayMealCardTitle>
            <DayMealCardText weight="bold">{time}</DayMealCardText>
            {!meal && (
              <PrimaryTextButton size="s" disabled>
                단식했어요
              </PrimaryTextButton>
            )}
          </DayMealCardTitle>
          <DayMealCardText
            color={colors.TextNeutral}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {meal ? meal : '아직 식사를 하지 않으셨나요?'}
          </DayMealCardText>
        </DayMealCardContent>
        {meal || feedback1 || feedback2 ? (
          <DayMealCardFeedbackBox>
            <DayMealCardFeedbackText weight="bold">
              {feedback1}
            </DayMealCardFeedbackText>
            <DayMealCardFeedbackText weight="bold">
              {feedback2}
            </DayMealCardFeedbackText>
          </DayMealCardFeedbackBox>
        ) : (
          <PrimaryButton size="m">기록하기</PrimaryButton>
        )}
      </DayMealCardBox>
    </DayMealCardContainer>
  );
}
