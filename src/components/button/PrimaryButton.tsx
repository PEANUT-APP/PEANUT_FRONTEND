import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ButtonType} from './types';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {DefaultButton, Label, getText} from './Button';
import {colors} from '../../styles/colors';

const Button = styled(DefaultButton)`
  background-color: ${props =>
    props.isLoading
      ? colors.primaryNormal
      : props.disabled
      ? colors.SolidDisabled
      : props.isPressed
      ? colors.primaryStrong
      : colors.primaryNormal};
`;

export default function PrimaryButton({
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

  const iconSize = size === 's' ? 's' : 'l';

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
            type={disabled ? 'primaryDisabled' : 'primary'}
            size={iconSize}
          />
        )}
        {isLoading && <LoadingIcon size="l" type="primaryLoading" />}
        <Text
          color={disabled ? colors.TextDisabled : colors.white}
          weight="bold">
          {children}
        </Text>
        {(style === 'right' || style === 'both') && (
          <NullIcon
            type={disabled ? 'primaryDisabled' : 'primary'}
            size={iconSize}
          />
        )}
      </Label>
    </Button>
  );
}
