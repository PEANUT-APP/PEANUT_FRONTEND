import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ButtonType} from './types';
import {DefaultButton, Label, getText} from './Button';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';

const Button = styled(DefaultButton)`
  background-color: ${props => (props.isPressed ? '#F9F9F9' : '#fff')};
  border: 1px solid #d7d7d7;
`;

export function TertiaryButton({
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
      disabled={disabled || isLoading}>
      <Label>
        {(style === 'left' || style === 'both') && (
          <NullIcon
            type={disabled ? 'tertiaryDisabled' : 'tertiary'}
            size={size}
          />
        )}
        {isLoading && <LoadingIcon size="l" type="tertiaryLoading" />}
        <Text color={disabled ? '#D7D7D7' : '#00D293'} weight="bold">
          {children}
        </Text>
        {(style === 'right' || style === 'both') && (
          <NullIcon
            type={disabled ? 'tertiaryDisabled' : 'tertiary'}
            size={size}
          />
        )}
      </Label>
    </Button>
  );
}
