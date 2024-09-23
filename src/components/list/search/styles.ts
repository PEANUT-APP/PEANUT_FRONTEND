import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Caption1} from '../../text/Text';
import {TouchableOpacity} from 'react-native';

export const SearchListItemContainer = styled(TouchableOpacity)<{
  isPressed: boolean;
}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 81px;
  border-radius: 8px;
  background-color: ${({isPressed}) =>
    isPressed ? colors.SolidSecondaryActive : colors.white};
  padding: 20px;
`;

export const SearchListItemContent = styled.View`
  justify-content: space-between;
`;

export const SearchListItemFood = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNormal};
`;

export const SearchListItemBrand = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;
