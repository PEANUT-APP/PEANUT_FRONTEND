import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const HomeSearchBox = styled.View<{isFocused: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 350px;
  height: 48px;
  padding: 0 20px;
  background-color: ${colors.white};
  border-radius: 8px;

  ${({isFocused}) =>
    isFocused &&
    `
    border-width: 1px;
    border-color: ${colors.primaryStrong};
  `}
`;

export const HomeSearchInput = styled.TextInput`
  flex: 1;
  font-family: 'Pretendard';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: ${colors.TextNeutral};
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;
