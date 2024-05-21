import React from 'react';
import {colors} from '../../styles/colors';
import ProfileImage from '../profile/ProfileImage';
import Heart from '../../assets/images/heart.svg';
import Comment from '../../assets/images/comment.svg';
import {CommentWithLikeType, CommunityListType, MyListType} from './types';
import {
  CommunityListBox,
  CommunityListContainer,
  CommunityListContentBox,
  CommunityListName,
  CommunityListResponse,
  CommunityListResponseBox,
  CommunityListResponseText,
  CommunityListText,
  MyListBox,
  MyListContainer,
  MyListText,
} from './styles';
import NullIcon from '../icon/NullIcon';

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

function MyList({text}: MyListType) {
  return (
    <MyListContainer>
      <MyListBox>
        <NullIcon size="xl" />
        <MyListText color={colors.TextNeutral}>{text}</MyListText>
      </MyListBox>
    </MyListContainer>
  );
}

export {CommunityList, MyList};
