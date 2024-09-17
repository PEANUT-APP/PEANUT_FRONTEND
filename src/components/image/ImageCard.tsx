import React from 'react';
import styled from 'styled-components/native';
import {ImageCardType} from './types';

const Image = styled.Image<{size: 'l' | 's'}>`
  width: ${({size}) => (size === 'l' ? 350 : 112)}px;
  height: ${({size}) => (size === 'l' ? 227 : 112)}px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  object-fit: cover;
`;

export default function ImageCard({source, size}: ImageCardType) {
  return (
    source && (
      <Image
        source={{uri: source}}
        alt="이미지"
        fadeDuration={300}
        size={size}
      />
    )
  );
}
