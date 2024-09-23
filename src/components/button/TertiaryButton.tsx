import React from 'react';
import styled from 'styled-components/native';
import {PrimaryButtonType} from './types';
import {DefaultButton, Label} from './styles';
import {getButtonText} from './getText';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {colors} from '../../styles/colors';
import {useButtonState} from '../../modules/useButtonState';

const Button = styled(DefaultButton)`
  background-color: ${props =>
    props.isPressed ? colors.SolidTertiaryActive : colors.white};
  border: 1px solid ${colors.LineDisabled};
`;

export default function TertiaryButton({
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

  const renderIcon = (position: string) => {
    if (isLoading && position === 'left') {
      return <LoadingIcon size="l" type="tertiary" />;
    }
    if (left && position === 'left') {
      return (
        <NullIcon
          type={disabled ? 'tertiaryDisabled' : 'tertiary'}
          size={size}
        />
      );
    }
    if (right && position === 'right') {
      return (
        <NullIcon
          type={disabled ? 'tertiaryDisabled' : 'tertiary'}
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
      onPress={onPress}>
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
