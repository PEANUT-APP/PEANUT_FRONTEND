import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ButtonStyleType, ButtonType} from './types';
import {Label} from './Button';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {Caption1} from '../text/Text';

const Button = styled.TouchableOpacity<ButtonStyleType>`
  display: inline-flex;
  height: ${props => (props.size === 'm' ? '40px' : '30px')};
  justify-content: center;
  padding: 0 ${props => (props.size === 'm' ? '16px' : '12px')};
  border: 1px solid #d7d7d7;
  border-radius: ${props => (props.size === 'm' ? '4px' : '3px')};
  background-color: ${props => (props.isPressed ? '#F9F9F9' : '#FFF')};
`;

const InlineLabel = styled(Label)<{isLoading: boolean}>`
  gap: ${props => (props.isLoading ? '4px' : '2px')};
`;

const Text = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

export default function OutlineButton({
  size,
  disabled,
  style,
  children,
  isLoading,
}: ButtonType) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <Button
      accessibilityRole="button"
      size={size}
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}>
      <InlineLabel isLoading={isLoading || true}>
        {(style === 'left' || style === 'both') && (
          <NullIcon
            type={disabled ? 'outlineDisabled' : 'outline'}
            size={size === 'm' ? 'l' : 'm'}
          />
        )}
        {isLoading && (
          <LoadingIcon size={size === 'm' ? 'l' : 's'} type="outlineLoading" />
        )}
        {!isLoading || size !== 's' ? (
          <Text
            color={isLoading ? '#B8B8B8' : disabled ? '#D7D7D7' : '#111'}
            weight="bold">
            {children}
          </Text>
        ) : null}
        {(style === 'right' || style === 'both') && (
          <NullIcon
            type={disabled ? 'outlineDisabled' : 'outline'}
            size={size === 'm' ? 'l' : 'm'}
          />
        )}
      </InlineLabel>
    </Button>
  );
}
