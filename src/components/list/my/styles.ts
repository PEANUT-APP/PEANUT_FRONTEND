import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body2} from '../../text/Text';

export const MyListItemContainer = styled.TouchableOpacity`
  width: 350px;
  height: 56px;
  border-radius: 6px;
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  gap: 4px;
`;

export const MyListItemText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;
