import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Heading} from '../text/Text';
import {MainValueStyleType} from './types';

const MainValueContainer = styled.View`
  width: 350px;
  justify-content: space-between;
  background-color: ${colors.white};
  border-radius: 8px;
`;

export const MainValueDefaultContainer = styled(MainValueContainer)`
  height: 80px;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
`;

export const MainValueLargeContainer = styled(MainValueContainer)`
  height: 120px;
  padding: 24px;
`;

export const MainValueTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const MainValueContent = styled.View<MainValueStyleType>`
  flex-direction: row;
  gap: 4px;
  padding: ${({isChildren}) => (isChildren ? '0 5px' : 0)};
  justify-content: ${({isChildren}) => !isChildren && 'flex-end'};
`;

export const MainValueText = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
`;

export const MainValueNone = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;
