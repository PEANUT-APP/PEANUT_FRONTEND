import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2} from '../text/Text';
import {FoodImageListType} from './types';

const FoodListContainer = styled.View`
  width: 350px;
  height: 48px;
  border-radius: 6px;
  background-color: ${colors.white};
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FoodListKey = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

const FoodListValue = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export function FoodImageList({type, value}: FoodImageListType) {
  return (
    <FoodListContainer>
      <FoodListKey color={colors.TextNeutral} weight="bold">
        {type}
      </FoodListKey>
      <FoodListValue color={colors.TextNormal} weight="bold">
        {value}
      </FoodListValue>
    </FoodListContainer>
  );
}
