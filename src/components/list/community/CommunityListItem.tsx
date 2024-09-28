import React from 'react';
import {
  CommunityListItemContainer,
  CommunityListItemContent,
  CommunityListItemDate,
  CommunityListItemImage,
  CommunityListItemBottomBox,
  CommunityListItemName,
  CommunityListItemProfile,
  CommunityListItemTitle,
  CommunityListItemTitleBox,
  CommunityListItemInfoBox,
  CommunityListItemText,
  CommunityListItemInfoPair,
  CommunityListItemCommentPair,
  CommunityListItemNoneImage,
} from './styles';
import DesignIcon from '../../icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {View} from 'react-native';
import {CommunityListItemType} from './types';

export default function CommunityListItem({
  title,
  date,
  content,
  name,
  likes,
  comments,
  profile,
}: CommunityListItemType) {
  return (
    <CommunityListItemContainer>
      <View>
        <CommunityListItemTitleBox>
          <CommunityListItemTitle
            weight="bold"
            ellipsizeMode="tail"
            numberOfLines={1}>
            {title}
          </CommunityListItemTitle>
          <DesignIcon type="kebab" size="l" color={colors.TextDisabled} />
        </CommunityListItemTitleBox>
        <CommunityListItemDate>{date}</CommunityListItemDate>
        <CommunityListItemContent ellipsizeMode="tail" numberOfLines={1}>
          {content}
        </CommunityListItemContent>
      </View>
      <CommunityListItemBottomBox>
        <CommunityListItemProfile>
          {profile ? (
            <CommunityListItemImage />
          ) : (
            <CommunityListItemNoneImage />
          )}
          <CommunityListItemName>{name}</CommunityListItemName>
        </CommunityListItemProfile>
        <CommunityListItemInfoBox>
          <CommunityListItemInfoPair>
            <DesignIcon type="like" size="s" color={colors.LineNomal} />
            <CommunityListItemText>{likes}</CommunityListItemText>
          </CommunityListItemInfoPair>
          <CommunityListItemCommentPair>
            <DesignIcon type="comment" size="s" color={colors.LineNomal} />
            <CommunityListItemText>{comments}</CommunityListItemText>
          </CommunityListItemCommentPair>
        </CommunityListItemInfoBox>
      </CommunityListItemBottomBox>
    </CommunityListItemContainer>
  );
}
