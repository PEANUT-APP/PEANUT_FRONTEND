import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Caption1} from '../../../components/text/Text';

export const GuideContainer = styled.View`
  width: 350px;
  height: 56px;
  border-radius: 6px;
  background-color: ${colors.white};
  justify-content: center;
  padding: 0 20px;
`;

export const GuideBox = styled.View`
  flex-direction: row;
  gap: 11px;
  align-items: center;
`;

export const GuidePair = styled.View`
  flex-direction: row;
  gap: 5.14px;
  align-items: center;
`;

export const GuideText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNormal};
`;
