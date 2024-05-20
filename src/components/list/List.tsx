import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import ProfileImage from '../profile/ProfileImage';
import {Body1, Caption1, Caption2} from '../text/Text';
import Heart from '../../assets/images/heart.svg';
import Comment from '../../assets/images/comment.svg';
import {CommentWithLikeType, CommunityListType} from './types';

const CommunityListContainer = styled.TouchableOpacity`
  position: relative;
  width: 350px;
  height: 83px;
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 14px 14px;
`;

const CommunityListBox = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const CommunityListContentBox = styled.View`
  flex: 1;
  gap: 2px;
`;

const CommunityListName = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

const CommunityListText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

const CommunityListResponse = styled.View`
  position: absolute;
  right: 14px;
  bottom: 10px;
  flex-direction: row;
  gap: 4px;
`;

const CommunityListResponseBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const CommunityListResponseText = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
`;

const formatCount = (count: number) =>
  count > 9999 ? '9,999+' : count.toString();

function CommentWithLike({likes, comments}: CommentWithLikeType) {
  return (
    <CommunityListResponse>
      {[
        {icon: Heart, count: likes},
        {icon: Comment, count: comments},
      ].map((item, index) => (
        <CommunityListResponseBox key={index}>
          <item.icon />
          <CommunityListResponseText color={colors.TextDisabled} weight="light">
            {formatCount(item.count)}
          </CommunityListResponseText>
        </CommunityListResponseBox>
      ))}
    </CommunityListResponse>
  );
}

function CommunityList({
  profileSource,
  nickname,
  text,
  likes,
  comments,
}: CommunityListType) {
  return (
    <CommunityListContainer activeOpacity={1} accessibilityRole="list">
      <CommunityListBox>
        <ProfileImage source={profileSource} width={50} height={50} />
        <CommunityListContentBox>
          <CommunityListName numberOfLines={1} ellipseMode="tail">
            {nickname}
          </CommunityListName>
          <CommunityListText
            weight="light"
            numberOfLines={1}
            ellipseMode="tail">
            {text}
          </CommunityListText>
        </CommunityListContentBox>
      </CommunityListBox>
      <CommentWithLike likes={likes} comments={comments} />
    </CommunityListContainer>
  );
}

export {CommunityList};
