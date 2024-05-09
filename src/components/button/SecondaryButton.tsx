import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ButtonType} from './types';
import {DefaultButton, Label, getText} from './Button';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {colors} from '../../styles/colors';

const Button = styled(DefaultButton)`
  background-color: ${props =>
    props.isLoading
      ? colors.white
      : props.disabled
      ? 'transparent'
      : props.isPressed
      ? colors.SolidSecondaryActive
      : colors.white};
  border: 1px solid
    ${props =>
      props.disabled && !props.isLoading
        ? colors.LineDisabled
        : colors.primaryStrong};
`;

export default function SecondaryButton({
  size,
  disabled,
  style,
  children,
  isLoading,
}: ButtonType) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const Text = getText(size);

  return (
    <Button
      accessibilityRole="button"
      size={size}
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
      isLoading={isLoading}>
      <Label>
        {(style === 'left' || style === 'both') && (
          <NullIcon
            type={disabled ? 'secondaryDisabled' : 'secondary'}
            size={size}
          />
        )}
        {isLoading && (
          <LoadingIcon size={size === 's' ? 'm' : 'l'} type="secondary" />
        )}
        <Text
          color={disabled ? colors.LineDisabled : colors.primaryStrong}
          weight="bold">
          {children}
        </Text>
        {(style === 'right' || style === 'both') && (
          <NullIcon
            type={disabled ? 'secondaryDisabled' : 'secondary'}
            size={size}
          />
        )}
      </Label>
    </Button>
  );
}
