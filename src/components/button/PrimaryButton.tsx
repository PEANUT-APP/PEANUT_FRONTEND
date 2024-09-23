import React from 'react';
import styled from 'styled-components/native';
import {PrimaryButtonType} from './types';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {DefaultButton, Label} from './styles';
import {getButtonText} from './getText';
import {colors} from '../../styles/colors';
import {useButtonState} from '../../modules/useButtonState';

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
  left,
  right,
  children,
  isLoading,
  onPress,
}: PrimaryButtonType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  const Text = getButtonText(size);

  const iconSize = size === 's' ? 's' : 'l';

  const renderIcon = (position: string) => {
    if (isLoading && position === 'left') {
      return <LoadingIcon size="l" type="primaryLoading" />;
    }
    if (left && position === 'left') {
      return (
        <NullIcon
          type={disabled ? 'primaryDisabled' : 'primary'}
          size={iconSize}
        />
      );
    }
    if (right && position === 'right') {
      return (
        <NullIcon
          type={disabled ? 'primaryDisabled' : 'primary'}
          size={iconSize}
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
      isLoading={isLoading}
      onPress={onPress}>
      <Label>
        {renderIcon('left')}
        <Text
          color={disabled ? colors.TextDisabled : colors.white}
          weight="bold">
          {children}
        </Text>
        {renderIcon('right')}
      </Label>
    </Button>
  );
}
