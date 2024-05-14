import styled from 'styled-components/native';
import {ButtonStyleType} from './types';

export const DefaultButton = styled.TouchableOpacity<ButtonStyleType>`
  width: ${props =>
    props.size === 'l' ? '350px' : props.size === 'm' ? '170px' : '110px'};
  height: ${props =>
    props.size === 'l' ? '48px' : props.size === 'm' ? '36px' : '32px'};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const Label = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;
