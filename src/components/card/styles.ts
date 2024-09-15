import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Caption1, Heading} from '../text/Text';

export const MealCardContainer = styled.View`
  width: 350px;
  padding: 20px 20px;
  background-color: ${colors.white};
  border-radius: 8px;
  justify-content: center;
  gap: 12px;
`;

export const MealCardBox = styled.View`
  gap: 12px;
  padding: 0 9px;
`;

export const MealCardTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const MealCardNav = styled.View`
  flex-direction: row;
  gap: 43px;
`;

export const MealCardNavItem = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const MealCardContent = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export const MealCardGraphBox = styled.View`
  gap: 8px;
`;

export const MealCardKcalBox = styled.View`
  align-items: center;
`;

export const MealCardKcal = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.primaryNormal};
`;

export const MealCardKcalDescription = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextDisabled};
`;
