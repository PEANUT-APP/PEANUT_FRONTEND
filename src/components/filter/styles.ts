import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body2} from '../text/Text';

export const FilterDefaultBox = styled.TouchableOpacity`
  width: 96px;
  height: 32px;
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.LineDisabled};
  background-color: ${colors.white};
  position: relative;
`;

export const FilterText = styled(Body2)`
  flex: 1;
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const FilterOptionBox = styled.View`
  width: 96px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.LineDisabled};
  background-color: ${colors.white};
  position: absolute;
  top: 36px;
  z-index: 100;
`;

export const FilterOption = styled.TouchableOpacity<{isSelected: boolean}>`
  width: 94px;
  height: 32px;
  padding: 0 12px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
  background-color: ${({isSelected}) =>
    isSelected ? colors.SolidSecondaryActive : 'transparent'};
`;

export const FilterOptionTop = styled(FilterOption)`
  border-radius: 5px 5px 0 0;
`;

export const FilterOptionBottom = styled(FilterOption)`
  border-radius: 0 0 5px 5px;
`;
