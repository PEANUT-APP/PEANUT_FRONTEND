import React from 'react';
import {CommentContainer, CommentInputBox, CommentTextInput} from './styles';
import OutlineButton from '../../../components/button/OutlineButton';
import {colors} from '../../../styles/colors';
import {CommentInputType} from './types';

export default function CommentInput({
  value,
  onChangeText,
  handleComment,
}: CommentInputType) {
  return (
    <CommentContainer>
      <CommentInputBox>
        <CommentTextInput
          placeholder="댓글을 입력해주세요"
          placeholderTextColor={colors.TextDisabled}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="send"
        />
        <OutlineButton size="s" onPress={handleComment}>
          등록
        </OutlineButton>
      </CommentInputBox>
    </CommentContainer>
  );
}
