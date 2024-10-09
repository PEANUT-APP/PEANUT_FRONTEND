import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body2, Heading} from '../text/Text';

export const CameraContainer = styled.View`
  position: absolute;
  top: -16px;
  z-index: 10;
`;

export const ModalBack = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(17, 17, 17, 0.7);
`;

export const ModalContainer = styled.View`
  width: 320px;
  height: 161px;
  border-radius: 8px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px 20px;
`;

export const ModalContentBox = styled.View`
  gap: 8px;
  align-items: center;
`;

export const ModalTitle = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNormal};
`;

export const ModalContent = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  text-align: center;
`;

export const ModalButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 4px 12px;
`;

export const ModalButtonPair = styled.View`
  flex-direction: row;
`;
