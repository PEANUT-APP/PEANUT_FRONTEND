import styled from 'styled-components/native';
import {Heading} from '../../components/text/Text';
import LinearGradient from 'react-native-linear-gradient';

export const HomeBox = styled.View`
  flex: 1;
  gap: 12px;
`;

export const HomeTop = styled(LinearGradient)`
  align-items: center;
  gap: 24px;
  padding: 74px 0 20px;
`;

export const HomeWelcomeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const HomeWelcomeText = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
`;

export const HomeContent = styled.View`
  flex: 1;
  align-items: center;
  gap: 12px;
  padding-bottom: 28px;
`;
