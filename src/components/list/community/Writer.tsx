import React from 'react';
import {
  OtherWriterContainer,
  MeWriterContainer,
  WriterText,
  MeWriterBox,
} from './styles';
import DesignIcon from '../../icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {WriterType} from './types';
import DeleteIcon from '../../icon/DeleteIcon';

export default function Writer({userId}: WriterType) {
  const localUserId = useSelector((state: RootState) => state.user.userId);

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
      <MeWriterBox activeOpacity={1}>
        <DeleteIcon size="s" color={colors.TextNeutral} />
        <WriterText>삭제하기</WriterText>
      </MeWriterBox>
    </MeWriterContainer>
  );
}
