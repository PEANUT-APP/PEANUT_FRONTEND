import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

const PointCircle = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: ${colors.primaryNormal};
`;

export const Point = () => {
  return <PointCircle />;
};
