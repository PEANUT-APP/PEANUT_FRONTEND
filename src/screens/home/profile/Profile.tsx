import React from 'react';
import {ProfileType} from './types';
import {Image} from './styles';

export default function Profile({source}: ProfileType) {
  return (
    <Image
      source={source}
      alt="프로필 이미지"
      fadeDuration={300}
      width={107}
      height={107}
    />
  );
}
