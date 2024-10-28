import styled from 'styled-components/native';
import {Body2} from '../text/Text';
import {colors} from '../../styles/colors';

export const ToastContainer = styled.View`
  position: absolute;
  left: 50%;
  transform: translateX(-173px);
  top: 40px;
  width: 346px;
  height: 70px;
  border-radius: 8px;
  padding: 16px 19px;
  background-color: rgba(58, 57, 57, 0.93);
  flex-direction: row;
  align-items: center;
  gap: 8px;
  z-index: 1000;
`;

export const ToastBody = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  width: 100%;
  color: ${colors.white};
`;
