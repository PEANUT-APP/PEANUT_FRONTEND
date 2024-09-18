import React from 'react';
import {
  RecordingBox,
  RecordingContainer,
  RecordingContentBox,
  RecordingContent,
  RecordingTitle,
  RecordingTitleBox,
  RecordingButtonPair,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useMeal, useRecording} from './hooks';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import ImageCard from '../../components/image/ImageCard';
import Dropdown from '../../components/dropdown/Dropdown';
import MealList from '../../components/list/meal/MealList';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';

export default function MealRecording() {
  const {handleBack, today, setToday} = useMeal();
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
  } = useRecording();

  return (
    <RecordingContainer>
      <RecordingBox>
        <RecordingTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordingTitle color={colors.TextNormal} weight="bold">
            식사 기록중
          </RecordingTitle>
          <WeeklyCalendar today={today} setToday={setToday} />
        </RecordingTitleBox>
        <RecordingContentBox>
          <ImageCard source={imageSource} size="l" />
          <RecordingContent>
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
            <MealList mealListData={mealListData} onDelete={handleDeleteItem} />
          </RecordingContent>
        </RecordingContentBox>
      </RecordingBox>
      <RecordingButtonPair>
        {isUpload ? (
          <>
            <SecondaryButton size="l">음식 추가하기</SecondaryButton>
            <PrimaryButton size="l">오늘 식단으로 등록하기</PrimaryButton>
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
    </RecordingContainer>
  );
}
