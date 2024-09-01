import styled from 'styled-components/native';
import {Caption1} from '../../../components/text/Text';
import {colors} from '../../../styles/colors';

export const TextBox = styled.View`
  align-items: center;
`;

export const TextValue = styled.Text`
  text-align: center;
  font-family: 'Pretendard';
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 37.352px;
  letter-spacing: -0.7px;
  color: ${colors.white};
`;

export const TextText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.white};
`;
