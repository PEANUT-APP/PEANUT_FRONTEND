/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  RecordingBox,
  RecordingContainer,
  RecordingContentBox,
  MealContent,
  MealTitle,
  RecordingButtonPair,
  MealBack,
} from './styles';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useRecording} from './hooks';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import ImageCard from '../../components/image/ImageCard';
import Dropdown from '../../components/dropdown/Dropdown';
import MealList from '../../components/list/meal/MealList';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';
import {useBackHandler} from '../../modules/commonHooks';
import {ScrollView} from '../layout/styles';

export default function MealRecording() {
  const {handleBack} = useBackHandler();
  const {
    control,
    errors,
    touchedFields,
    trigger,
    setValue,
    setFocus,
    isUpload,
    imageSource,
    mealListData,
    handleFoodPredict,
    handleDirectAdd,
    handleDeleteItem,
    handleAddMeal,
    handleRegisterMeal,
  } = useRecording();

  return (
    <RecordingContainer>
      <MealBack activeOpacity={1} onPress={handleBack}>
        <DesignIcon type="back" size="l" color={colors.TextNeutral} />
      </MealBack>
      <MealTitle weight="bold">식사 기록중</MealTitle>
      <ScrollView
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}>
        <RecordingBox>
          <WeeklyCalendar />
          <RecordingContentBox>
            <ImageCard source={imageSource} size="l" />
            <MealContent>
              <Dropdown
                control={control}
                errors={errors}
                touchedFields={touchedFields}
                trigger={trigger}
                setValue={setValue}
                setFocus={setFocus}
                name="foodTime"
                options={['아침', '점심', '저녁', '간식']}
                size="s"
              />
              <MealList
                mealListData={mealListData}
                onDelete={handleDeleteItem}
              />
            </MealContent>
          </RecordingContentBox>
        </RecordingBox>
        <RecordingButtonPair isData={!!mealListData?.length}>
          {isUpload ? (
            <>
              <SecondaryButton size="l" onPress={handleAddMeal}>
                음식 추가하기
              </SecondaryButton>
              <PrimaryButton size="l" onPress={handleRegisterMeal}>
                오늘 식단으로 등록하기
              </PrimaryButton>
            </>
          ) : (
            <>
              <PrimaryButton size="l" onPress={handleFoodPredict}>
                AI로 이미지 인식하기
              </PrimaryButton>
              <SecondaryButton size="l" onPress={handleDirectAdd}>
                직접 추가하기
              </SecondaryButton>
            </>
          )}
        </RecordingButtonPair>
      </ScrollView>
    </RecordingContainer>
  );
}
