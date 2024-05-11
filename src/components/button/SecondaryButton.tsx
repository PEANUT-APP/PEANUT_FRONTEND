import React from 'react';
import styled from 'styled-components/native';
import {ButtonType} from './types';
import {DefaultButton, Label} from './styles';
import {getButtonText} from '../../modules/getText';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {colors} from '../../styles/colors';
import {useButtonState} from '../../modules/useButtonState';

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
  left,
  right,
  children,
  isLoading,
}: ButtonType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  const Text = getButtonText(size);

  const renderIcon = (position: string) => {
    if (isLoading && position === 'left') {
      return <LoadingIcon size={size === 's' ? 'm' : 'l'} type="secondary" />;
    }
    if (left && position === 'left') {
      return (
        <NullIcon
          type={disabled ? 'secondaryDisabled' : 'secondary'}
          size={size}
        />
      );
    }
    if (right && position === 'right') {
      return (
        <NullIcon
          type={disabled ? 'secondaryDisabled' : 'secondary'}
          size={size}
        />
      );
    }
    return null;
  };

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
        {renderIcon('left')}
        <Text
          color={disabled ? colors.LineDisabled : colors.primaryStrong}
          weight="bold">
          {children}
        </Text>
        {renderIcon('right')}
      </Label>
    </Button>
  );
}
