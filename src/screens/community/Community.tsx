/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Layout from '../layout/Layout';
import {
  CommunityContainer,
  CommunityContent,
  CommunityNav,
  CommunityTitle,
  CommunityTop,
} from './styles';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {FlatList, TouchableOpacity} from 'react-native';
import CommunityListItem from '../../components/list/community/CommunityListItem';
import {useCommunity} from './hooks';

export default function Community() {
  const {
    allCommunityData,
    isAllCommunitySuccess,
    handleGoSearch,
    handleGoWrite,
    refreshing,
    onRefresh,
  } = useCommunity();

  return (
    <Layout>
      <CommunityContainer>
        <CommunityTop>
          <CommunityTitle weight="bold">커뮤니티</CommunityTitle>
          <CommunityNav>
            <TouchableOpacity activeOpacity={1} onPress={handleGoSearch}>
              <DesignIcon type="search" size="xl" color={colors.TextNeutral} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={handleGoWrite}>
              <DesignIcon type="pencil" size="xl" color={colors.TextNeutral} />
            </TouchableOpacity>
          </CommunityNav>
        </CommunityTop>
        {isAllCommunitySuccess && (
          <FlatList
            data={allCommunityData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <CommunityListItem
                id={item.id}
                title={item.title}
                content={item.content}
                name={item.name}
                like={item.like}
                imageUrl={item.imageUrl}
                userId={item.userId}
                commentCount={item.commentCount}
                createTime={item.createTime}
              />
            )}
            ItemSeparatorComponent={CommunityContent}
            contentContainerStyle={{paddingBottom: 137}}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </CommunityContainer>
    </Layout>
  );
}
