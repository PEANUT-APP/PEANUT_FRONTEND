import styled from 'styled-components/native';
import {Title} from '../../components/text/Text';
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
