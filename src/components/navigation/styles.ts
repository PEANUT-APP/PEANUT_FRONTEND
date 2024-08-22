import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 13px 22px 38px;
  background-color: ${colors.white};
  align-items: center;
  border-top: 1px solid ${colors.LineDisabled};
`;

export const NavigationBarBox = styled.View`
  flex-direction: row;
  gap: 40px;
`;
