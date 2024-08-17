import React from 'react';
import styled from 'styled-components/native';
import {ButtonStyleType, PrimaryButtonType} from './types';
import {Label} from './styles';
import {getButtonText} from '../../modules/getText';
import NullIcon from '../icon/NullIcon';
import {colors} from '../../styles/colors';
import {useButtonState} from '../../modules/useButtonState';

const getPadding = ({isPressed, size, left, right}: ButtonStyleType) => {
  if (isPressed) {
    if (size === 'm') {
      return '0 16px';
    }
    return left === false && right === false ? '8px 12px' : '4px 12px';
  }
  return '4px 0';
};

const TextButton = styled.TouchableOpacity<ButtonStyleType>`
  display: inline-flex;
  height: ${({isPressed, size}) => isPressed && size !== 's' && '40px'};
  justify-content: center;
  align-items: center;
  padding: ${props => getPadding(props)};
  border-radius: ${({isPressed, size}) =>
    isPressed ? (size === 's' ? '3px' : '4px') : '4px'};
  background-color: ${({isPressed, type}) =>
    isPressed
      ? type === 'primary'
        ? colors.SolidTertiaryActive
        : colors.SolidSecondaryActive
      : colors.white};
`;

const InlineLabel = styled(Label)`
  gap: 2px;
`;

function DefaultTextButton({
  type,
  size,
  disabled,
  left,
  right,
  children,
  onPress,
}: PrimaryButtonType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  const Text = getButtonText(isPressed && size === 'm' ? 's' : size);

  const renderIcon = (position: string) => {
    if (left && position === 'left') {
      return (
        <NullIcon
          type={disabled ? 'textDisabled' : `${type}Text`}
          size={isPressed ? 'l' : size}
        />
      );
    }
    if (right && position === 'right') {
      return (
        <NullIcon
          type={disabled ? 'textDisabled' : `${type}Text`}
          size={isPressed ? 'l' : size}
        />
      );
    }
    return null;
  };

  return (
    <TextButton
      accessibilityRole="button"
      size={size}
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      type={type}
      onPress={onPress}>
      <InlineLabel>
        {renderIcon('left')}
        <Text
          color={
            disabled
              ? colors.TextDisabled
              : type === 'primary'
              ? colors.TextNeutral
              : colors.primaryStrong
          }
          weight="bold">
          {children}
        </Text>
        {renderIcon('right')}
      </InlineLabel>
    </TextButton>
  );
}

const PrimaryTextButton = (props: PrimaryButtonType) => (
  <DefaultTextButton type="primary" {...props} />
);
const AssistiveTextButton = (props: PrimaryButtonType) => (
  <DefaultTextButton type="assistive" {...props} />
);

export {PrimaryTextButton, AssistiveTextButton};
