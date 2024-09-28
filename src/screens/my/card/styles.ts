import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body2, Caption1} from '../../../components/text/Text';

export const MyCardContainer = styled.TouchableOpacity`
  width: 110px;
  height: 76px;
  border-radius: 6px;
  background-color: ${colors.white};
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 8px;
`;

export const CardText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

export const PatientCardContainer = styled.View`
  width: 350px;
  height: 175px;
  border-radius: 6px;
  background-color: ${colors.white};
  padding: 20px;
  gap: 12px;
`;

export const PatientCardTitle = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextNormal};
`;

export const PatientCardBox = styled.TouchableOpacity`
  align-items: center;
  gap: 8px;
`;

export const PatientCardImage = styled.View`
  width: 78px;
  height: 76px;
  background-color: #d9d9d9;
`;
