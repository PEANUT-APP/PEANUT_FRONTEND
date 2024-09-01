import React from 'react';
import {TextBox, TextText, TextValue} from './styles';
import {MainTextType} from './types';

export default function Text({value, text}: MainTextType) {
  return (
    <TextBox>
      <TextValue>{value}</TextValue>
      <TextText weight="bold">{text}</TextText>
    </TextBox>
  );
}
