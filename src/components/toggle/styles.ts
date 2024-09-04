import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const ToggleContainer = styled.TouchableOpacity<{color: string}>`
  width: 52px;
  height: 28px;
  border-radius: 20px;
  justify-content: center;
  background-color: ${props => props.color};
`;

export const ToggleWheel = styled(Animated.View)`
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 100px;
`;
