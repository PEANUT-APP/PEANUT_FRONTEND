/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SearchBack,
  SearchBox,
  SearchContainer,
  SearchContent,
  SearchContentScroll,
  SearchNoneImage,
  SearchTitle,
  SearchTop,
} from './styles';
import {useBackHandler} from '../../modules/commonHooks';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useCommunitySearch} from './hooks';
import Search from '../../components/search/Search';
import CommunityListItem from '../../components/list/community/CommunityListItem';
import {CommunityListReturnType} from '../../services/community/types';
import SearchIcon from '../../assets/images/CommunitySearchIcon.svg';

const communityList: CommunityListReturnType[] = [];

export default function CommunitySearch() {
  const {handleBack} = useBackHandler();
  const {setSearchCommunity, handleSearch} = useCommunitySearch();

  return (
    <SearchContainer>
      <SearchBack activeOpacity={1} onPress={handleBack}>
        <DesignIcon type="back" size="l" color={colors.TextNeutral} />
      </SearchBack>
      <SearchBox>
        <SearchTop>
          <SearchTitle weight="bold">글 찾기</SearchTitle>
          <Search
            onChangeText={setSearchCommunity}
            onSubmitEditing={handleSearch}
            placeholder="글 제목 또는 내용을 입력하세요"
          />
        </SearchTop>
        {communityList.length !== 0 ? (
          <SearchContentScroll
            contentContainerStyle={{paddingBottom: 16}}
            showsVerticalScrollIndicator={false}>
            <SearchContent>
              {communityList?.map(item => (
                <CommunityListItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  content={item.content}
                  name={item.name}
                  like={item.like}
                  imageUrl={item.imageUrl}
                  userId={item.userId}
                  comment={item.comment}
                  create_at={item.create_at}
                />
              ))}
            </SearchContent>
          </SearchContentScroll>
        ) : (
          <SearchNoneImage>
            <SearchIcon />
          </SearchNoneImage>
        )}
      </SearchBox>
    </SearchContainer>
  );
}
