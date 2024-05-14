import styled from 'styled-components/native';
import {Body1, Body2, Caption1} from '../components/text/Text';

export const getButtonText = (size: 'l' | 'm' | 's') => {
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
