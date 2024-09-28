import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Heading} from '../../../components/text/Text';

export const ConfirmContainer = styled.View`
  margin-top: 40px;
  align-items: center;
`;

export const ConfirmProfile = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: ${colors.SolidTertiaryActive};
  margin-bottom: 8px;
`;

export const ConfirmName = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNormal};
  margin-bottom: 4px;
`;

export const ConfirmInfoBox = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const ConfirmInfo = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNormal};
`;

export const CompleteBox = styled.View`
  align-items: center;
  margin-top: 72px;
`;

export const CompleteImage = styled.View`
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
`;
