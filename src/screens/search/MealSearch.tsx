import React from 'react';
import {
  SearchBack,
  SearchBottom,
  SearchBox,
  SearchContainer,
  SearchContent,
  SearchContentScroll,
  SearchTitle,
  SearchTop,
} from './styles';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useSearch} from './hooks';
import Search from '../../components/search/Search';
import Dropdown from '../../components/dropdown/Dropdown';
import PrimaryButton from '../../components/button/PrimaryButton';
import SearchListItem from '../../components/list/search/SearchListItem';
import {useBackHandler} from '../../modules/commonHooks';

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
    isFoodByNameSuccess,
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
        <SearchContentScroll contentContainerStyle={{paddingBottom: 78}}>
          {isFoodByNameSuccess && (
            <SearchContent>
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
              <SearchListItem />
            </SearchContent>
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
        />
        <PrimaryButton size="m">0개 식단에 기록하기</PrimaryButton>
      </SearchBottom>
    </SearchContainer>
  );
}
