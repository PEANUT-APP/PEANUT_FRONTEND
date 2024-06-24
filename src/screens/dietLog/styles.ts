import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Title} from '../../components/text/Text';

export const DietLogContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const DietLogScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 99,
  },
})`
  flex: 1;
`;

export const DietLogBox = styled.View`
  flex: 1;
  padding: 72px 20px 99px;
  gap: 16px;
  align-items: center;
`;

export const DietLogTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  width: 350px;
  margin-left: 8px;
`;

export const DietLogContent = styled.View`
  flex: 1;
  gap: 12px;
`;
