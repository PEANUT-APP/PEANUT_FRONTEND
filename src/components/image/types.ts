import {ImageSourcePropType} from 'react-native';

export interface ImageType {
  source?: ImageSourcePropType | string | null;
  width?: number;
  height?: number;
}

export interface ImageCardType {
  source?: string | null;
  size: 'l' | 's';
}
