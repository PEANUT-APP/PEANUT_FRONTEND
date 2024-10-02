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
import {TouchableOpacity, View} from 'react-native';
import {CommunityListReturnType} from '../../../services/community/types';
import Writer from '../../edit/Writer';
import {useCommunityListItem} from './hooks';
import {useKebab} from '../../../modules/commonHooks';

export default function CommunityListItem({
  id,
  userId,
  title,
  content,
  name,
  like,
  imageUrl,
}: CommunityListReturnType) {
  const {showWriter, handleClickKebab} = useKebab();
  const {handleClickItem} = useCommunityListItem(id);

  return (
    <CommunityListItemContainer activeOpacity={1} onPress={handleClickItem}>
      <View>
        <CommunityListItemTitleBox>
          <CommunityListItemTitle
            weight="bold"
            ellipsizeMode="tail"
            numberOfLines={1}>
            {title}
          </CommunityListItemTitle>
          <TouchableOpacity activeOpacity={1} onPress={handleClickKebab}>
            <DesignIcon type="kebab" size="l" color={colors.TextDisabled} />
          </TouchableOpacity>
          {showWriter && <Writer userId={userId || null} />}
        </CommunityListItemTitleBox>
        <CommunityListItemDate>2024.09.04 오후 11:30</CommunityListItemDate>
        <CommunityListItemContent ellipsizeMode="tail" numberOfLines={1}>
          {content}
        </CommunityListItemContent>
      </View>
      <CommunityListItemBottomBox>
        <CommunityListItemProfile>
          {imageUrl ? (
            <CommunityListItemImage source={{uri: imageUrl}} />
          ) : (
            <CommunityListItemNoneImage />
          )}
          <CommunityListItemName>{name}</CommunityListItemName>
        </CommunityListItemProfile>
        <CommunityListItemInfoBox>
          <CommunityListItemInfoPair>
            <DesignIcon type="like" size="s" color={colors.LineNomal} />
            <CommunityListItemText>{like}</CommunityListItemText>
          </CommunityListItemInfoPair>
          <CommunityListItemCommentPair>
            <DesignIcon type="comment" size="s" color={colors.LineNomal} />
            <CommunityListItemText>0</CommunityListItemText>
          </CommunityListItemCommentPair>
        </CommunityListItemInfoBox>
      </CommunityListItemBottomBox>
    </CommunityListItemContainer>
  );
}
