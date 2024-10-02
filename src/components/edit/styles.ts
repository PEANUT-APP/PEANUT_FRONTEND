import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Caption1} from '../text/Text';

export const OtherWriterContainer = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 15px;
  width: 87px;
  height: 34px;
  border-radius: 3px;
  background-color: ${colors.white};
  elevation: 5;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const MeWriterContainer = styled.View`
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 15px;
  width: 87px;
  border-radius: 3px;
  background-color: ${colors.white};
  elevation: 5;
  align-items: center;
  justify-content: center;
`;

export const MeWriterBox = styled.TouchableOpacity`
  height: 34px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const WriterText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;
