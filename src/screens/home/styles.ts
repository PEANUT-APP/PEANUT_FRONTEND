import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
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

export const HomeSearchContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const HomeSearchBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 290px;
  height: 48px;
  padding: 0 20px;
  background-color: ${colors.white};
  border-radius: 8px;
`;

export const HomeSearchInput = styled.TextInput`
  flex: 1;
  font-family: 'Pretendard';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.676px;
  letter-spacing: -0.35px;
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
