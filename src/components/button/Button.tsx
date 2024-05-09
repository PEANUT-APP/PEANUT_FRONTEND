import styled from 'styled-components/native';
import {ButtonStyleType} from './types';
import {Body1, Body2, Caption1} from '../text/Text';

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

export const getText = (size: 'l' | 'm' | 's') => {
  switch (size) {
    case 'l':
      return styled(Body1)`
        line-height: 21.344px;
        letter-spacing: -0.4px;
      `;
    case 'm':
      return styled(Body2)`
        line-height: 18.676px;
        letter-spacing: -0.35px;
      `;
    case 's':
    default:
      return styled(Caption1)`
        line-height: 16.008px;
        letter-spacing: -0.3px;
      `;
  }
};
