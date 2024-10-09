import React from 'react';
import styled from 'styled-components/native';
import {ImageCardType} from './types';
import {colors} from '../../styles/colors';
import {useCamera} from '../../modules/useCamera';
import ImageIconSmall from '../../assets/images/ImageIconSmall.svg';
import ImageIconLarge from '../../assets/images/ImageIconLarge.svg';
import {Body2} from '../text/Text';

const DefaultImage = styled.TouchableOpacity<{size: 'l' | 's'}>`
  width: ${({size}) => (size === 'l' ? 350 : 112)}px;
  height: ${({size}) => (size === 'l' ? 227 : 112)}px;
  background-color: ${({size}) => (size === 'l' ? '#fff' : colors.background)};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
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

const ImagePair = styled.View`
  align-items: center;
  gap: 8px;
`;

const ImageText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export default function ImageCard({source, size}: ImageCardType) {
  const {handlePress} = useCamera();

  return source ? (
    <Image source={{uri: source}} alt="이미지" fadeDuration={300} size={size} />
  ) : (
    <DefaultImage
      size={size}
      activeOpacity={1}
      onPress={size === 'l' ? handlePress : () => {}}>
      {size === 's' ? (
        <ImageIconSmall />
      ) : (
        <ImagePair>
          <ImageIconLarge />
          <ImageText color={colors.TextDisabled}>
            음식 이미지를 등록해주세요
          </ImageText>
        </ImagePair>
      )}
    </DefaultImage>
  );
}
