import React from 'react';
import {MyCardContainer, CardText, MyCommentIcon} from './styles';
import {MyCardType} from './types';
import {colors} from '../../../styles/colors';
import {useCard} from '../hooks';
import MyWriting from '../../../assets/images/MyWriting.svg';
import MyLike from '../../../assets/images/MyLike.svg';
import MyComment from '../../../assets/images/MyComment.svg';

export default function MyCard({children, navigate, title}: MyCardType) {
  const {onPress} = useCard();

  return (
    <MyCardContainer activeOpacity={1} onPress={() => onPress(navigate, title)}>
      {children === '작성글' ? (
        <MyWriting />
      ) : children === '좋아요' ? (
        <MyLike />
      ) : (
        <MyCommentIcon>
          <MyComment />
        </MyCommentIcon>
      )}
      <CardText color={colors.TextNormal}>{children}</CardText>
    </MyCardContainer>
  );
}
