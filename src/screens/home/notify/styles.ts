import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {TouchableOpacity} from 'react-native';
import {Body2, Heading} from '../../../components/text/Text';

export const NotifyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.background};
  padding: 72px 20px 28px;
`;

export const SearchBack = styled(TouchableOpacity)`
  position: absolute;
  top: 72px;
  left: 20px;
`;

export const NotifyBox = styled.View`
  flex: 1;
  align-items: center;
  gap: 20px;
`;

export const NotifyTitle = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNormal};
`;

export const NotifyContent = styled.View`
  height: 8px;
`;

export const NotifyCardContainer = styled.View`
  width: 350px;
  padding: 20px;
  border-radius: 6px;
  background-color: ${colors.white};
  gap: 8px;
`;

export const NotifyCardTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NotifyCardAlarm = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const NotifyCardImage = styled.View`
  width: 28px;
  height: 28px;
  background-color: #d9d9d9;
`;

export const NotifyCardText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;
