import React from 'react';
import {
  CommentListItemContainer,
  CommentListItemDate,
  CommentListItemName,
  CommentListItemTop,
  CommentListItemUserInfoBox,
  CommentListItemUserNoneProfile,
  CommentListItemUserProfile,
  CommentListItemContent,
  CommentListItemInfoBox,
  CommentListItemInfoPair,
  CommentListItemCommentPair,
  CommentListItemInfoText,
} from './styles';
import {CommentReturnType} from '../../../services/community/types';
import {TouchableOpacity, View} from 'react-native';
import DesignIcon from '../../icon/DesignIcon';
import Writer from '../../edit/Writer';
import {formatDateTime, useKebab} from '../../../modules/commonHooks';
import {colors} from '../../../styles/colors';

export default function CommentListItem({
  imageUrl,
  userName,
  createTime,
  userId,
  id,
  content,
}: CommentReturnType) {
  const {showWriter, handleClickKebab} = useKebab();

  return (
    <CommentListItemContainer activeOpacity={1}>
      <CommentListItemTop>
        <CommentListItemUserInfoBox>
          {imageUrl ? (
            <CommentListItemUserProfile source={{uri: imageUrl}} />
          ) : (
            <CommentListItemUserNoneProfile />
          )}
          <View>
            <CommentListItemName weight="bold">{userName}</CommentListItemName>
            <CommentListItemDate>
              {formatDateTime(createTime)}
            </CommentListItemDate>
          </View>
        </CommentListItemUserInfoBox>
        <TouchableOpacity activeOpacity={1} onPress={handleClickKebab}>
          <DesignIcon type="kebab" size="l" color={colors.TextDisabled} />
        </TouchableOpacity>
        {showWriter && <Writer userId={userId} id={id} />}
      </CommentListItemTop>
      <CommentListItemContent>{content}</CommentListItemContent>
      <CommentListItemInfoBox>
        <CommentListItemInfoPair>
          <DesignIcon type="like" size="m" color={colors.LineNomal} />
          <CommentListItemInfoText>0</CommentListItemInfoText>
        </CommentListItemInfoPair>
        <CommentListItemCommentPair>
          <DesignIcon type="comment" size="m" color={colors.LineNomal} />
          <CommentListItemInfoText>0</CommentListItemInfoText>
        </CommentListItemCommentPair>
      </CommentListItemInfoBox>
    </CommentListItemContainer>
  );
}
