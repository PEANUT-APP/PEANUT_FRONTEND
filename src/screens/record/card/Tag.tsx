import React from 'react';
import {TagBox, TagText} from './styles';
import {TagType} from './types';

export default function Tag({children, isOngoing}: TagType) {
  return (
    <TagBox isOngoing={isOngoing}>
      <TagText isOngoing={isOngoing}>{children}</TagText>
    </TagBox>
  );
}
