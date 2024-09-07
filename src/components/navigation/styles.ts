import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
`;

export const NavigationBarBox = styled.View<{role: 'Protector' | 'Patient'}>`
  width: 100%;
  flex-direction: row;
  gap: ${({role}) => (role === 'Protector' ? '40px' : '106px')};
  justify-content: center;
  align-items: center;
  padding: 13px 22px 38px;
  background-color: ${colors.white};
  border-top-width: 1px;
  border-top-color: ${colors.LineDisabled};
`;

export const NavigationPair = styled.View<{role: 'Protector' | 'Patient'}>`
  flex-direction: row;
  gap: ${({role}) => (role === 'Protector' ? '40px' : '20px')};
`;
