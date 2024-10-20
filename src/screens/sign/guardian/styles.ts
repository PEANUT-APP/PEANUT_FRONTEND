import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Caption1, Caption2} from '../../../components/text/Text';

export const GuardianContainer = styled.View`
  flex: 1;
  padding: 93px 20px 28px;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.background};
`;

export const GuardianCardContainer = styled.View`
  width: 350px;
  height: 96px;
  border-radius: 6px;
  padding: 20px;
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GuardianCardBox = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const GuardianCardImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: #d9d9d9;
`;

export const GuardianCardNoneImage = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: #d9d9d9;
`;

export const GuardianInfoBox = styled.View`
  gap: 2px;
`;

export const GuardianCardName = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;

export const GuardianCardInfoBox = styled.View`
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

export const GuardianCardInfo = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  color: ${colors.TextNeutral};
`;
