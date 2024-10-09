import React from 'react';
import {
  OtherWriterContainer,
  MeWriterContainer,
  WriterText,
  MeWriterBox,
} from './styles';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {WriterType} from './types';
import DeleteIcon from '../icon/DeleteIcon';
import {useDeleteCommunityMutation} from '../../services/community/communityApi';

export default function Writer({userId, id}: WriterType) {
  const localUserId = useSelector((state: RootState) => state.user.userId);

  const [deleteCommunity] = useDeleteCommunityMutation();

  const handleDelete = async () => {
    console.log(id);
    try {
      const response = deleteCommunity(id).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return localUserId !== userId ? (
    <OtherWriterContainer activeOpacity={1}>
      <DesignIcon type="declare" size="s" color={colors.TextNeutral} />
      <WriterText>신고하기</WriterText>
    </OtherWriterContainer>
  ) : (
    <MeWriterContainer>
      <MeWriterBox activeOpacity={1}>
        <DesignIcon type="pencil" size="s" color={colors.TextNeutral} />
        <WriterText>수정하기</WriterText>
      </MeWriterBox>
      <MeWriterBox activeOpacity={1} onPress={handleDelete}>
        <DeleteIcon size="s" color={colors.TextNeutral} />
        <WriterText>삭제하기</WriterText>
      </MeWriterBox>
    </MeWriterContainer>
  );
}
