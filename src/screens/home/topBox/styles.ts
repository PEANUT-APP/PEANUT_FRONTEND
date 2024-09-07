import styled from 'styled-components/native';
import {Body1, Heading} from '../../../components/text/Text';

export const TopBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 23px;
`;

export const TopBoxLayout = styled.View`
  gap: 4px;
`;

export const TopBoxName = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
`;

export const TopBoxText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const TopBoxBloodSugar = styled.View`
  flex-direction: row;
  gap: 36px;
`;
