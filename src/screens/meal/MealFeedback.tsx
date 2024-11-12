/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {
  FeedbackBox,
  FeedbackButtonPair,
  FeedbackContainer,
  FeedbackFoodBox,
  FeedbackFoodText,
  FeedbackSelectBox,
  FeedbackText,
  FeedbackTextBox,
  MealBack,
  MealContent,
  MealTitle,
} from './styles';
import SelectChips from '../../components/select/SelectChips';
import {useFeedback} from './hooks';
import MealCard from '../../components/card/MealCard';
import SecondaryButton from '../../components/button/SecondaryButton';
import Graph from '../../components/graph/Graph';
import PrimaryButton from '../../components/button/PrimaryButton';

export default function MealFeedback() {
  const {
    formattedToday,
    selectedChip,
    handleSelectChip,
    formattedFoodName,
    isFeedbackFoodByTimeSuccess,
    graphData,
    feedbackBloodSugarData,
    isFeedbackBloodSugarSuccess,
    handleComplete,
    handleBack,
    handleMealUpdate,
  } = useFeedback();

  return (
    <FeedbackContainer>
      <MealBack activeOpacity={1} onPress={handleBack}>
        <DesignIcon type="back" size="l" color={colors.TextNeutral} />
      </MealBack>
      <MealTitle weight="bold">
        {formattedToday}
        {'\n'}식단 피드백
      </MealTitle>
      <ScrollView
        contentContainerStyle={{paddingBottom: 14}}
        showsVerticalScrollIndicator={false}>
        <FeedbackBox>
          <MealContent>
            <FeedbackSelectBox>
              {['전체', '아침', '점심', '저녁', '간식'].map(time => (
                <SelectChips
                  key={time}
                  isSelected={selectedChip === time}
                  onPress={() => handleSelectChip(time)}>
                  {time}
                </SelectChips>
              ))}
            </FeedbackSelectBox>
            <FeedbackFoodBox>
              <FeedbackFoodText weight="bold">섭취한 음식</FeedbackFoodText>
              {isFeedbackFoodByTimeSuccess && (
                <FeedbackFoodText color={colors.TextNeutral}>
                  {formattedFoodName}
                </FeedbackFoodText>
              )}
            </FeedbackFoodBox>
            <MealCard size="s" time={selectedChip} />
            {isFeedbackBloodSugarSuccess && (
              <Graph graphData={graphData} size="s" />
            )}
            <FeedbackTextBox>
              <FeedbackText>{feedbackBloodSugarData?.msg}</FeedbackText>
            </FeedbackTextBox>
          </MealContent>
          <FeedbackButtonPair>
            <SecondaryButton size="l" onPress={handleMealUpdate}>
              수정하기
            </SecondaryButton>
            <PrimaryButton size="l" onPress={handleComplete}>
              완료하기
            </PrimaryButton>
          </FeedbackButtonPair>
        </FeedbackBox>
      </ScrollView>
    </FeedbackContainer>
  );
}
