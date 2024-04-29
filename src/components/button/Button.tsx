import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ButtonType} from './types';
import {Body1} from '../text/Text';
import Loading from '../icon/LoadingIcon';

const Button = styled.TouchableOpacity<ButtonType>`
  width: ${props =>
    props.size === 'l' ? '350px' : props.size === 'm' ? '170px' : '110px'};
  height: ${props =>
    props.size === 'l' ? '48px' : props.size === 'm' ? '36px' : '32px'};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const Label = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Text = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

const DefaultButton = styled(Button)`
  background-color: ${props =>
    props.disabled ? '#F2F2F2' : props.isPressed ? '#00D293' : '#03f4ac'};
`;

export function PrimaryButton({disabled}: ButtonType) {
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = () => {
    setIsPressed(true);
  };

  const onPressOut = () => {
    setIsPressed(false);
  };

  return (
    <DefaultButton
      accessibilityRole="button"
      size="l"
      isPressed={isPressed}
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <Label>
        <Loading size="l" type="primaryLoading" />
        <Text color={disabled ? '#B8B8B8' : 'white'} weight="bold">
          Label
        </Text>
      </Label>
    </DefaultButton>
  );
}
