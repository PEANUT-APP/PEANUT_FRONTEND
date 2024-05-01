import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ButtonStyleType, ButtonType} from './types';
import {Label, getText} from './Button';
import NullIcon from '../icon/NullIcon';

const getPadding = ({isPressed, size, style}: ButtonStyleType) => {
  if (isPressed) {
    if (size === 'm') {
      return '0 16px';
    }
    return style === undefined ? '8px 12px' : '4px 12px';
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
    isPressed ? (type === 'primary' ? '#F9F9F9' : '#EAFFF9') : '#fff'};
`;

const InlineLabel = styled(Label)`
  gap: 2px;
`;

function DefaultTextButton({
  type,
  size,
  disabled,
  style,
  children,
}: ButtonType) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const Text = getText(isPressed && size === 'm' ? 's' : size);

  return (
    <TextButton
      accessibilityRole="button"
      size={size}
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      type={type}>
      <InlineLabel>
        {(style === 'left' || style === 'both') && (
          <NullIcon
            type={disabled ? 'textDisabled' : `${type}Text`}
            size={isPressed ? 'l' : size}
          />
        )}
        <Text
          color={
            disabled ? '#B8B8B8' : type === 'primary' ? '#585858' : '#0DB89A'
          }
          weight="bold">
          {children}
        </Text>
        {(style === 'right' || style === 'both') && (
          <NullIcon
            type={disabled ? 'textDisabled' : `${type}Text`}
            size={isPressed ? 'l' : size}
          />
        )}
      </InlineLabel>
    </TextButton>
  );
}

const PrimaryTextButton = (props: ButtonType) => (
  <DefaultTextButton type="primary" {...props} />
);
const AssistiveTextButton = (props: ButtonType) => (
  <DefaultTextButton type="assistive" {...props} />
);

export {PrimaryTextButton, AssistiveTextButton};
