import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const GlobalView = styled(SafeAreaView).attrs({
  edges: ['bottom', 'left', 'right'],
})`
  flex: 1;
  background-color: #fff;
`;

export default GlobalView;
