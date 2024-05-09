import styled from 'styled-components/native';
import {NullType} from './types';
import {getSize} from '../../modules/getSize';
import {getMargin} from '../../modules/getMargin';
import {getNullColorByType} from '../../modules/getColorByType';

export const NullIcon = styled.View<NullType>`
  width: ${({size}) => getSize(size)};
  height: ${({size}) => getSize(size)};
  margin: ${({size}) => getMargin(size)};
  border: 1.35px dotted ${({type}) => getNullColorByType(type)};
  border-radius: 2px;
`;

export default NullIcon;
