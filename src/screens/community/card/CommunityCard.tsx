import React from 'react';
import {
  CommunityCardContainer,
  CommunityCardDate,
  CommunityCardName,
  CommunityCardTop,
  CommunityCardUserInfoBox,
  CommunityCardUserNoneProfile,
  CommunityCardUserProfile,
  CommunityCardContentBox,
  CommunityCardTitle,
  CommunityCardContent,
  CommunityCardLikeBox,
  CommunityCardLike,
} from './styles';
import {CommunityDetailCardReturnType} from '../../../services/community/types';
import {TouchableOpacity, View} from 'react-native';
import DesignIcon from '../../../components/icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {formatDateTime, useKebab} from '../../../modules/commonHooks';
import Writer from '../../../components/edit/Writer';
import {useDetail} from '../hooks';

export default function CommunityCard({
  imageUrl,
  nickName,
  userId,
  title,
  content,
  like,
  liked,
  create_At,
}: CommunityDetailCardReturnType) {
  const {showWriter, handleClickKebab} = useKebab();
  const {isLike, handleLike} = useDetail(liked);

  return (
    <CommunityCardContainer>
      <CommunityCardTop>
        <CommunityCardUserInfoBox>
          {imageUrl ? (
            <CommunityCardUserProfile source={{uri: imageUrl}} />
          ) : (
            <CommunityCardUserNoneProfile />
          )}
          <View>
            <CommunityCardName weight="bold">{nickName}</CommunityCardName>
            <CommunityCardDate>{formatDateTime(create_At)}</CommunityCardDate>
          </View>
        </CommunityCardUserInfoBox>
        <TouchableOpacity activeOpacity={1} onPress={handleClickKebab}>
          <DesignIcon type="kebab" size="l" color={colors.TextDisabled} />
        </TouchableOpacity>
        {showWriter && <Writer userId={userId} />}
      </CommunityCardTop>
      <CommunityCardContentBox>
        <CommunityCardTitle weight="bold">{title}</CommunityCardTitle>
        <CommunityCardContent>{content}</CommunityCardContent>
      </CommunityCardContentBox>
      <CommunityCardLikeBox>
        <TouchableOpacity activeOpacity={1} onPress={handleLike}>
          <DesignIcon
            type={isLike ? 'likeFill' : 'like'}
            size="l"
            color={like ? colors.primaryNormal : colors.LineNomal}
          />
        </TouchableOpacity>
        <CommunityCardLike>좋아요 {like}</CommunityCardLike>
      </CommunityCardLikeBox>
    </CommunityCardContainer>
  );
}
