import React, {useCallback} from 'react';
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

// 공통 아이콘 버튼 컴포넌트
const IconButton = ({
  onPress,
  icon,
  text,
}: {
  onPress: () => void;
  icon: React.ReactNode;
  text: string;
}) => (
  <MeWriterBox activeOpacity={1} onPress={onPress}>
    {icon}
    <WriterText>{text}</WriterText>
  </MeWriterBox>
);

export default function Writer({userId, id}: WriterType) {
  const localUserId = useSelector((state: RootState) => state.user.userId);

  const [deleteCommunity] = useDeleteCommunityMutation();

  const handleDelete = useCallback(async () => {
    if (id) {
      try {
        const response = deleteCommunity(id).unwrap();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [deleteCommunity, id]);

  // 자신이 작성자가 아닌 경우
  if (localUserId !== userId) {
    return (
      <OtherWriterContainer activeOpacity={1}>
        <DesignIcon type="declare" size="s" color={colors.TextNeutral} />
        <WriterText>신고하기</WriterText>
      </OtherWriterContainer>
    );
  }

  // 자신이 작성자인 경우
  return (
    <MeWriterContainer>
      <IconButton
        onPress={() => console.log('Edit clicked')}
        icon={<DesignIcon type="pencil" size="s" color={colors.TextNeutral} />}
        text="수정하기"
      />
      <IconButton
        onPress={handleDelete}
        icon={<DeleteIcon size="s" color={colors.TextNeutral} />}
        text="삭제하기"
      />
    </MeWriterContainer>
  );
}
