import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Caption1} from '../text/Text';

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
  gap: 6px;
`;

export const YAxisLabels = styled.View`
  gap: 20.5px;
  margin-top: 8px;
  position: absolute;
  right: 26px;
  top: -9px;
`;

export const AxisLabel = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextDisabled};
`;

export const XAxisLabel = styled.View`
  flex-direction: row;
  gap: 51px;
  position: absolute;
  bottom: 18px;
  left: 40px;
`;