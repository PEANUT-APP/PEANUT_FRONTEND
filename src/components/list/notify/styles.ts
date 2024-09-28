import styled from 'styled-components/native';
import {Body1} from '../../text/Text';
import {colors} from '../../../styles/colors';

export const NotifyContainer = styled.View`
  flex-direction: row;
  width: 100%;
  min-width: 350px;
  justify-content: space-between;
  align-items: center;
`;

export const NotifyText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNeutral};
`;
