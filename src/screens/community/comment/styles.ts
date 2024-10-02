import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1} from '../../../components/text/Text';

export const CommentContainer = styled.View`
  width: 100%;
  height: 68px;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: ${colors.LineDisabled};
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

export const CommentInputBox = styled.View`
  width: 350px;
  height: 44px;
  border-radius: 6px;
  background-color: ${colors.SolidDisabled};
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const CommentTextInput = styled.TextInput`
  flex: 1;
  font-family: 'Pretendard';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const CommentInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 48px;
  border-radius: 6px;
  background-color: ${colors.white};
  padding: 0 12px 0 20px;
  margin: 12px 0 8px;
`;

export const CommentInfoText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNeutral};
`;
