import styled from 'styled-components/native';
import {Body2, Heading, Title} from '../../components/text/Text';
import {colors} from '../../styles/colors';

export const CommunityContainer = styled.View`
  flex: 1;
  padding: 72px 20px 0;
  align-items: center;
  gap: 20px;
`;

export const CommunityTop = styled.View`
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
`;

export const CommunityTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  color: ${colors.TextNormal};
`;

export const CommunityNav = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const CommunityContent = styled.View`
  height: 8px;
`;

export const WriteContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 72px 20px 0;
  background-color: ${colors.background};
  gap: 20px;
`;

export const WriterTop = styled.View`
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
`;

export const WriterTitle = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNormal};
`;

export const WriterForm = styled.View`
  width: 350px;
  flex: 1;
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 0 12px;
`;

export const WriterTitleInput = styled.TextInput`
  width: 100%;
  height: 59px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.LineNomal};
  font-family: 'Pretendard';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 26.68px;
  letter-spacing: -0.5px;
  padding: 0 12px;
  color: #000000;
`;

export const WriterContentInput = styled.TextInput`
  width: 100%;
  flex: 1;
  font-family: 'Pretendard';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18.676px;
  letter-spacing: -0.35px;
  padding: 20px 12px;
  color: #000000;
`;

export const WriterPlaceholder = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextDisabled};
  width: 299px;
  position: absolute;
  top: 198px;
  left: 24px;
`;

export const DetailContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const DetailBox = styled.View`
  flex: 1;
  align-items: center;
  padding: 72px 20px 0;
  background-color: ${colors.background};
  gap: 20px;
`;

export const DetailBack = styled.TouchableOpacity`
  width: 350px;
`;

export const DetailComments = styled.View`
  gap: 8px;
`;
