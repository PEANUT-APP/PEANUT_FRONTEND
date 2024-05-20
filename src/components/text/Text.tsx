import styled from 'styled-components/native';
import {TextType} from './types';

const Typography = styled.Text<TextType>`
  font-family: ${props =>
    props.weight === 'bold'
      ? 'Pretendard-Bold'
      : props.weight === 'light'
      ? 'Pretendard-Light'
      : 'Pretendard-Medium'};
  line-height: 48px;
  letter-spacing: -0.5px;
  color: ${props => props.color || 'black'};
`;

export const Title = styled(Typography)`
  font-size: 24px;
`;
export const Heading = styled(Typography)`
  font-size: 20px;
`;
export const Body1 = styled(Typography)`
  font-size: 16px;
`;
export const Body2 = styled(Typography)`
  font-size: 14px;
`;
export const Caption1 = styled(Typography)`
  font-size: 12px;
`;
export const Caption2 = styled(Typography)`
  font-size: 10px;
`;
