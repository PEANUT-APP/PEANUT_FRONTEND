import React from 'react';
import {NavigationButtonType} from './types';
import styled from 'styled-components/native';
import {Body2} from '../text/Text';
import {Path, Svg} from 'react-native-svg';
import {colors} from '../../styles/colors';

const NavigationButtonBox = styled.TouchableOpacity`
  width: 50.3px;
  height: 50.3px;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const NavigationButtonText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export default function NavigationButton({
  children,
  type,
  active,
}: NavigationButtonType) {
  const color = active ? colors.primaryNormal : colors.TextDisabled;
  const renderIcon = () => {
    switch (type) {
      case 'food':
        return (
          <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
            <Path
              d="M8.88889 7.35H6.66667V0H4.44444V7.35H2.22222V0H0V7.35C0 9.576 1.84444 11.382 4.16667 11.5185V21H6.94444V11.5185C9.26667 11.382 11.1111 9.576 11.1111 7.35V0H8.88889V7.35ZM14.4444 4.2V12.6H17.2222V21H20V0C16.9333 0 14.4444 2.352 14.4444 4.2Z"
              fill={color}
            />
          </Svg>
        );
      case 'home':
        return (
          <Svg width="24" height="21" viewBox="0 0 24 21" fill="none">
            <Path
              d="M9.6 21V13.5882H14.4V21H20.4V11.1176H24L12 0L0 11.1176H3.6V21H9.6Z"
              fill={color}
            />
          </Svg>
        );
      case 'community':
        return (
          <Svg width="25" height="21" viewBox="0 0 25 21" fill="none">
            <Path
              d="M22.7273 0C23.3295 0 23.9091 0.245 24.3295 0.688333C24.7614 1.12 25 1.715 25 2.33333V14C25 14.6183 24.7614 15.2133 24.3295 15.645C23.9091 16.0883 23.3295 16.3333 22.7273 16.3333H6.81818C6.21591 16.3333 5.63636 16.0883 5.21591 15.645C4.78409 15.2133 4.54545 14.6183 4.54545 14V2.33333C4.54545 1.715 4.78409 1.12 5.21591 0.688333C5.63636 0.245 6.21591 0 6.81818 0H22.7273ZM2.27273 18.6667H19.3182V21H2.27273C1.67045 21 1.09091 20.755 0.670455 20.3117C0.238636 19.88 0 19.285 0 18.6667V5.83333H2.27273V18.6667Z"
              fill={color}
            />
          </Svg>
        );
      case 'my':
        return (
          <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
            <Path
              d="M10.5 0C11.8924 0 13.2277 0.553123 14.2123 1.53769C15.1969 2.52226 15.75 3.85761 15.75 5.25C15.75 6.64239 15.1969 7.97775 14.2123 8.96231C13.2277 9.94688 11.8924 10.5 10.5 10.5C9.10761 10.5 7.77225 9.94688 6.78769 8.96231C5.80312 7.97775 5.25 6.64239 5.25 5.25C5.25 3.85761 5.80312 2.52226 6.78769 1.53769C7.77225 0.553123 9.10761 0 10.5 0ZM10.5 13.125C16.3013 13.125 21 15.4744 21 18.375V21H0V18.375C0 15.4744 4.69875 13.125 10.5 13.125Z"
              fill={color}
            />
          </Svg>
        );
      default:
        return null;
    }
  };
  return (
    <NavigationButtonBox accessibilityRole="menuitem" activeOpacity={1}>
      {renderIcon()}
      <NavigationButtonText color={color}>{children}</NavigationButtonText>
    </NavigationButtonBox>
  );
}
