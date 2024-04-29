import styled from 'styled-components/native';
import {NullType} from './types';
import {colors} from '../../styles/colors';

const getSize = (size: 'xl' | 'l' | 'm' | 's'): string => {
  switch (size) {
    case 'xl':
      return '36px';
    case 'l':
      return '24px';
    case 'm':
      return '20px';
    case 's':
    default:
      return '16px';
  }
};

export const NullIcon = styled.View<NullType>`
  width: ${props => getSize(props.size)};
  height: ${props => getSize(props.size)};
  border: 1.35px dotted ${props => colors[props.type]};
  border-radius: 5px;
`;

export default NullIcon;
