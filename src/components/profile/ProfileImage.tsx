import React from 'react';
import styled from 'styled-components/native';
import {ProfileImageType} from './types';

const Image = styled.Image`
  width: 73px;
  height: 73px;
  border-radius: 36.5px;
  background-color: #d9d9d9;
`;

export default function ProfileImage({source}: ProfileImageType) {
  return <Image source={source} alt="프로필 이미지" fadeDuration={300} />;
}
