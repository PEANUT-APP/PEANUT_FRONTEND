/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {
  SearchBack,
  SearchBottom,
  SearchBox,
  SearchContainer,
  SearchContent,
  SearchContentScroll,
  SearchModalAmountBox,
  SearchModalTopText,
  SearchModalContainer,
  SearchModalFoodName,
  SearchModalNameBox,
  SearchModalTop,
  SearchOverlay,
  SearchTitle,
  SearchTop,
  SearchModalInput,
  SearchModalFeedback,
  SearchModalFeedbackText,
  SearchModalList,
} from './styles';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useSearch} from './hooks';
import Search from '../../components/search/Search';
import Dropdown from '../../components/dropdown/Dropdown';
import PrimaryButton from '../../components/button/PrimaryButton';
import SearchListItem from '../../components/list/search/SearchListItem';
import {useBackHandler} from '../../modules/commonHooks';
import {Animated, View} from 'react-native';
import MealTextListItem from './MealTextListItem';

export default function MealSearch() {
  const {handleBack} = useBackHandler();
  const {
    setSearchFood,
    handleSearch,
    control,
    trigger,
    setValue,
    setFocus,
    errors,
    touchedFields,
    foodByName,
    isFoodByNameSuccess,
    selectedItem,
    handleItemPress,
    closeModal,
    modalTranslateY,
    overlayOpacity,
    servingCount,
    setServingCount,
    addedMeals,
    handleAddMeal,
    handleRecordMeal,
    isFoodSuccess,
  } = useSearch();

  return (
    <SearchContainer>
      <SearchBack activeOpacity={1} onPress={handleBack}>
        <DesignIcon type="back" size="l" color={colors.TextNeutral} />
      </SearchBack>
      <SearchBox>
        <SearchTop>
          <SearchTitle weight="bold">음식 검색중</SearchTitle>
          <Search
            onChangeText={setSearchFood}
            onSubmitEditing={handleSearch}
            placeholder="음식명, 브랜드명을 입력하세요"
          />
        </SearchTop>
        <SearchContentScroll
          contentContainerStyle={{paddingBottom: 78}}
          showsVerticalScrollIndicator={false}>
          {addedMeals.length > 0 && !isFoodSuccess ? (
            <SearchContent>
              {addedMeals.map((item, index) => (
                <SearchListItem
                  key={index}
                  name={item.name}
                  giIndex={item.giIndex}
                  onPress={() => handleItemPress(item)} // 추가된 식단 아이템을 선택할 수 있도록
                  isSelected
                />
              ))}
            </SearchContent>
          ) : (
            // 검색어가 입력된 경우 foodByName 배열을 렌더링
            isFoodByNameSuccess &&
            foodByName?.length !== 0 &&
            isFoodSuccess && (
              <SearchContent>
                {foodByName?.map((item, index) => (
                  <SearchListItem
                    key={index}
                    name={item.name}
                    giIndex={item.giIndex}
                    onPress={() => handleItemPress(item)} // 검색 결과의 아이템을 선택할 수 있도록
                  />
                ))}
              </SearchContent>
            )
          )}
        </SearchContentScroll>
      </SearchBox>
      <SearchBottom>
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
          isSearch
        />
        <PrimaryButton size="m" onPress={handleRecordMeal}>
          {addedMeals.length}개 식단에 기록하기
        </PrimaryButton>
      </SearchBottom>
      {selectedItem && (
        <>
          <BlurView
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            blurType="light"
            blurAmount={1}
          />
          <SearchOverlay
            activeOpacity={1}
            onPress={closeModal}
            style={{
              opacity: overlayOpacity,
            }}
          />
          <Animated.View
            style={{
              width: '100%',
              transform: [{translateY: modalTranslateY}],
              position: 'absolute',
              bottom: 0,
            }}>
            <SearchModalContainer>
              <View>
                <SearchModalTop>
                  <SearchModalNameBox>
                    <SearchModalFoodName weight="bold">
                      {selectedItem.name}
                    </SearchModalFoodName>
                  </SearchModalNameBox>
                  <SearchModalAmountBox>
                    <SearchModalInput
                      value={servingCount}
                      onChangeText={setServingCount}
                    />
                    <SearchModalTopText color={colors.TextNeutral}>
                      인분
                    </SearchModalTopText>
                  </SearchModalAmountBox>
                </SearchModalTop>
                <SearchModalFeedback>
                  <SearchModalFeedbackText weight="bold">
                    {selectedItem.giIndex > 70 || selectedItem.glIndex > 20
                      ? '고'
                      : selectedItem.giIndex < 55 || selectedItem.glIndex < 11
                      ? '저'
                      : '중'}{' '}
                    혈당지수의 음식이에요.
                  </SearchModalFeedbackText>
                </SearchModalFeedback>
                <SearchModalList>
                  <MealTextListItem
                    name="혈당 지수(GI)"
                    value={selectedItem.giIndex}
                  />
                  <MealTextListItem
                    name="당 부하지수(GL)"
                    value={selectedItem.glIndex}
                  />
                  <MealTextListItem
                    name="탄수화물"
                    value={`${selectedItem.carbohydrate}g`}
                  />
                  <MealTextListItem
                    name="단백질"
                    value={`${selectedItem.protein}g`}
                  />
                  <MealTextListItem
                    name="지방"
                    value={`${selectedItem.fat}g`}
                  />
                  <MealTextListItem
                    name="콜레스테롤"
                    value={`${selectedItem.cholesterol}mg`}
                  />
                </SearchModalList>
                <PrimaryButton size="l" onPress={handleAddMeal}>
                  오늘 식단에 추가하기
                </PrimaryButton>
              </View>
            </SearchModalContainer>
          </Animated.View>
        </>
      )}
    </SearchContainer>
  );
}
