import React from 'react';
import {CommentInfoContainer, CommentInfoText} from './styles';
import {CommentInfoType} from './types';
import Filter from '../../../components/filter/Filter';

export default function CommentInformation({
  commentLength,
  selectedFilter,
  setSelectedFilter,
}: CommentInfoType) {
  return (
    <CommentInfoContainer>
      <CommentInfoText weight="bold">댓글 {commentLength}개</CommentInfoText>
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </CommentInfoContainer>
  );
}
