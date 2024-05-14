import React from 'react';
import styled from 'styled-components/native';
import {ButtonStyleType, ButtonType} from './types';
import {Label} from './styles';
import NullIcon from '../icon/NullIcon';
import LoadingIcon from '../icon/LoadingIcon';
import {Caption1} from '../text/Text';
import {colors} from '../../styles/colors';
import {useButtonState} from '../../modules/useButtonState';

const Button = styled.TouchableOpacity<ButtonStyleType>`
  display: inline-flex;
  height: ${props => (props.size === 'm' ? '40px' : '30px')};
  justify-content: center;
  padding: 0 ${props => (props.size === 'm' ? '16px' : '12px')};
  border: 1px solid ${colors.LineDisabled};
  border-radius: ${props => (props.size === 'm' ? '4px' : '3px')};
  background-color: ${props =>
    props.isPressed ? colors.SolidTertiaryActive : colors.white};
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
  left,
  right,
  children,
  isLoading,
}: ButtonType) {
  const {isPressed, handlePressIn, handlePressOut} = useButtonState();

  const renderIcon = (position: string) => {
    if (isLoading && position === 'left') {
      return <LoadingIcon size={size === 'm' ? 'l' : 's'} type="outline" />;
    }
    if (left && position === 'left') {
      return (
        <NullIcon
          type={disabled ? 'outlineDisabled' : 'outline'}
          size={size === 'm' ? 'l' : 'm'}
        />
      );
    }
    if (right && position === 'right') {
      return (
        <NullIcon
          type={disabled ? 'outlineDisabled' : 'outline'}
          size={size === 'm' ? 'l' : 'm'}
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
      disabled={disabled || isLoading}>
      <InlineLabel isLoading={isLoading || true}>
        {renderIcon('left')}
        {!isLoading || size !== 's' ? (
          <Text
            color={
              isLoading
                ? colors.TextDisabled
                : disabled
                ? colors.LineDisabled
                : colors.TextNormal
            }
            weight="bold">
            {children}
          </Text>
        ) : null}
        {renderIcon('right')}
      </InlineLabel>
    </Button>
  );
}
