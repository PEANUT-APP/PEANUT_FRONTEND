import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Body2, Caption2} from '../../../components/text/Text';

export const CardContainer = styled.View`
  width: 170px;
  height: 182px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${colors.white};
  padding: 20px;
`;

export const CardTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CardTopText = styled.View`
  gap: 2px;
`;

export const CardTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNormal};
`;

export const CardSubTitle = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
`;

export const CardGrayBox = styled.View`
  width: 56px;
  height: 56px;
  background-color: ${colors.SolidTertiaryActive};
  margin: 16px 0 8px;
`;

export const CardImage = styled.View`
  width: 60px;
  height: 60px;
  margin: 16px 0 8px;
`;

export const CardMedicineName = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextNormal};
`;
