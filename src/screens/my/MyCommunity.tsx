import React from 'react';
import {
  MyCommunityContainer,
  MyCommunityContent,
  MyMoreTitle,
  MyMoreTop,
} from './styles';
import {FlatList, TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import {useMyCommunity} from './hooks';
import CommunityListItem from '../../components/list/community/CommunityListItem';

export default function MyCommunity() {
  const {handleBack} = useBackHandler();
  const {title, communityData} = useMyCommunity();

  return (
    <MyCommunityContainer>
      <MyMoreTop>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </TouchableOpacity>
        <MyMoreTitle weight="bold">{title}</MyMoreTitle>
      </MyMoreTop>
      <FlatList
        data={communityData}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => (
          <CommunityListItem
            title={item.title}
            content={item.content}
            name={item.userName}
            like={item.like}
            comment={item.comment}
            create_at={item.create_At}
            imageUrl=""
            id={0}
          />
        )}
        ItemSeparatorComponent={MyCommunityContent}
        showsVerticalScrollIndicator={false}
      />
    </MyCommunityContainer>
  );
}
