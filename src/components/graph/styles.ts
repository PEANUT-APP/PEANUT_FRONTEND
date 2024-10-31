import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Caption1} from '../text/Text';
import {LineChart} from 'react-native-svg-charts';

export const GraphContainer = styled.View`
  width: 350px;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  background-color: ${colors.white};
  padding: 20px 0;
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
  gap: 6px;
  overflow: visible;
`;

export const GraphChart = styled(LineChart)`
  width: 265px;
  height: 125px;
  top: 6px;
  left: 25px;
  overflow: visible;
`;

export const GraphMainToolTip = styled.View`
  height: 52px;
  padding: 0 10px;
  border-radius: 4px;
  background-color: ${colors.primaryNormal};
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: absolute;
`;

export const GraphMainToolTipValue = styled.View`
  flex-direction: row;
  gap: 4px;
`;

export const GraphMainToolTipValueText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.white};
`;

export const GraphMainToolTipTimeText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

export const GraphFeedbackBeforeToolTip = styled.View`
  height: 30px;
  padding: 0 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  background-color: ${colors.white};
  border-width: 1px;
  border-color: ${colors.primaryNormal};
  gap: 4px;
  align-self: flex-start;
`;

export const GraphFeedbackAfterToolTip = styled.View`
  height: 30px;
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  background-color: ${colors.primaryNormal};
  gap: 6px;
  align-self: flex-start;
`;

export const YAxisLabels = styled.View`
  gap: 17px;
  position: absolute;
  right: 27px;
`;

export const AxisLabel = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextDisabled};
`;

export const XAxisLabel = styled.View`
  flex-direction: row;
  gap: 51px;
  left: 35px;
`;
