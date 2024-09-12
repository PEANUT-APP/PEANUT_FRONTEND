import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Caption1} from '../text/Text';
import {LineChart} from 'react-native-chart-kit';

export const GraphContainer = styled.View`
  width: 350px;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  background-color: ${colors.white};
  padding: 20px 0;
  overflow: hidden;
`;

export const GraphTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 24px;
`;

export const GraphTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const GraphContent = styled.View`
  flex-direction: row;
  margin-left: -35px;
  gap: 6px;
`;

export const GraphChart = styled(LineChart)``;

export const YAxisLabels = styled.View`
  gap: 13px;
  align-items: center;
  margin-top: 8px;
`;

export const YAxisLabel = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextDisabled};
`;
