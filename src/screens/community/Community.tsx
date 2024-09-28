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
import {FlatList} from 'react-native';
import CommunityListItem from '../../components/list/community/CommunityListItem';
import {useCommunity} from './hooks';

export default function Community() {
  const {allCommunityData} = useCommunity();

  return (
    <Layout paddingBottom={130}>
      <CommunityContainer>
        <CommunityTop>
          <CommunityTitle weight="bold">커뮤니티</CommunityTitle>
          <CommunityNav>
            <DesignIcon type="search" size="xl" color={colors.TextNeutral} />
            <DesignIcon type="pencil" size="xl" color={colors.TextNeutral} />
          </CommunityNav>
        </CommunityTop>
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
            />
          )}
          ItemSeparatorComponent={CommunityContent}
        />
      </CommunityContainer>
    </Layout>
  );
}
