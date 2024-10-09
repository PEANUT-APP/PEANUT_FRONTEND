import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Body2, Caption1} from '../../text/Text';

export const MealListContainer = styled.View`
  gap: 8px;
`;

export const MealListNoneBox = styled.View`
  width: 350px;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const MealListNoneImage = styled.View`
  width: 60px;
  height: 60px;
  background-color: #d9d9d9;
`;

export const MealListNoneText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const MealListItemContainer = styled.View`
  width: 350px;
  height: 77px;
  border-radius: 8px;
  background-color: ${colors.white};
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MealListItemName = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNormal};
`;

export const MealListItemDescription = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;

export const MealListItemFunc = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

export const MealListItemGI = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNeutral};
`;
