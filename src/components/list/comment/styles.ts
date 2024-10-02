import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body2, Caption1, Caption2} from '../../text/Text';

export const CommentListItemContainer = styled.TouchableOpacity`
  width: 350px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${colors.white};
`;

export const CommentListItemTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CommentListItemUserInfoBox = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;

export const CommentListItemUserProfile = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: #d9d9d9;
`;

export const CommentListItemUserNoneProfile = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: #d9d9d9;
`;

export const CommentListItemName = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const CommentListItemDate = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  color: ${colors.TextDisabled};
`;

export const CommentListItemContent = styled(Body2)`
  width: 100%;
  line-height: 18.676px;
  letter-spacing: -0.35px;
  margin: 8px 10px 12px;
`;

export const CommentListItemInfoBox = styled.View`
  margin-left: 8px;
  flex-direction: row;
  gap: 8px;
`;

export const CommentListItemInfoPair = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CommentListItemCommentPair = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const CommentListItemInfoText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextDisabled};
`;
