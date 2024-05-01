import styled from 'styled-components/native';
import {NullType} from './types';
import {colors} from '../../styles/colors';

const getSize = (size: 'xl' | 'l' | 'm' | 's'): string => {
  switch (size) {
    case 'xl':
      return '28px';
    case 'l':
      return '16px';
    case 'm':
      return '14px';
    case 's':
    default:
      return '12px';
  }
};

const getMargin = (size: 'xl' | 'l' | 'm' | 's'): string => {
  switch (size) {
    case 'xl':
      return '4px';
    case 'l':
      return '4px';
    case 'm':
      return '3px';
    case 's':
    default:
      return '2px';
  }
};

export const NullIcon = styled.View<NullType>`
  width: ${props => getSize(props.size)};
  height: ${props => getSize(props.size)};
  margin: ${props => getMargin(props.size)};
  border: 1.35px dotted ${props => colors[props.type]};
  border-radius: 2px;
`;

export default NullIcon;
