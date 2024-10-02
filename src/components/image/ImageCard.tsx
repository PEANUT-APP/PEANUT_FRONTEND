import React from 'react';
import styled from 'styled-components/native';
import {ImageCardType} from './types';
import {colors} from '../../styles/colors';
import {useCamera} from '../../modules/useCamera';

const DefaultImage = styled.TouchableOpacity<{size: 'l' | 's'}>`
  width: ${({size}) => (size === 'l' ? 350 : 112)}px;
  height: ${({size}) => (size === 'l' ? 227 : 112)}px;
  background-color: ${({size}) => (size === 'l' ? '#fff' : colors.background)};
  border-radius: 6px;
`;

const Image = styled.Image<{size: 'l' | 's'}>`
  width: ${({size}) => (size === 'l' ? 350 : 112)}px;
  height: ${({size}) => (size === 'l' ? 227 : 112)}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  border-radius: 6px;
  object-fit: cover;
`;

export default function ImageCard({source, size}: ImageCardType) {
  const {handlePress} = useCamera();

  return source ? (
    <Image source={{uri: source}} alt="이미지" fadeDuration={300} size={size} />
  ) : (
    <DefaultImage
      size={size}
      activeOpacity={1}
      onPress={size === 'l' ? handlePress : () => {}}
    />
  );
}
