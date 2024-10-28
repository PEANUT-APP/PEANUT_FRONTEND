import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Caption1} from '../text/Text';
import {TouchableOpacity} from 'react-native';

export const MealCardContainer = styled(TouchableOpacity)`
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
  position: relative;
  z-index: 100;
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

export const DayMealCardContainer = styled.View`
  width: 350px;
  padding: 20px 20px;
  background-color: ${colors.white};
  border-radius: 6px;
  flex-direction: row;
  justify-content: space-between;
`;

export const DayMealCardBox = styled.View`
  width: 183px;
  gap: 23px;
`;

export const DayMealCardContent = styled.View`
  gap: 8px;
`;

export const DayMealCardTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DayMealCardText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const DayMealCardFeedbackBox = styled.View`
  gap: 4px;
`;

export const DayMealCardFeedbackText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.primaryNormal};
`;
