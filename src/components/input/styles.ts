import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {InputStyleType} from './types';
import {Caption1, Caption2} from '../text/Text';

const determineBorderColor = ({
  isFocused,
  isError,
  isValid,
  icon,
  message,
  isDropdownVisible,
}: InputStyleType) => {
  if (isDropdownVisible || isFocused) {
    return colors.primaryNormal;
  } else if (icon) {
    if (isError) {
      return colors.primaryStrong;
    } else if (message && isValid) {
      return colors.primaryNormal;
    }
  }
  return colors.TextDisabled;
};

export const InputBox = styled.View<InputStyleType>`
  width: ${({size}) => (size === 's' ? '152px' : '350px')};
  height: 52px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${determineBorderColor};
  background-color: ${({editable, drop, date, isError, isFocused}) =>
    isError && !isFocused
      ? colors.SolidSecondaryActive
      : editable || drop || date
      ? 'transparent'
      : colors.SolidDisabled};
`;

export const InputText = styled.TextInput<InputStyleType>`
  flex: 1;
  padding-right: ${({icon, button}) => (icon || button) && '16px'};
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${({editable, drop, date}) =>
    editable || drop || date ? colors.TextNormal : colors.TextDisabled};
`;

export const InputLabel = styled(Caption1)`
  padding: 0 4px;
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

export const InputMessage = styled(Caption2)<InputStyleType>`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  margin-top: 7px;
  margin-left: 16px;
  color: ${({isError}) =>
    isError ? colors.primaryStrong : colors.primaryNormal};
`;

export const InputTimer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const InputTimerMessage = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
`;
