import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const CheckBoxContainer = styled.TouchableOpacity<{isChecked: boolean}>`
  min-width: 20px;
  min-height: 20px;
  border-width: 1px;
  border-width: ${({isChecked}) => (isChecked ? '0' : '1px')};
  border-color: ${({isChecked}) =>
    isChecked ? 'transparent' : colors.LineDisabled};
  background-color: ${({isChecked}) =>
    isChecked ? colors.primaryNormal : 'transparent'};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
