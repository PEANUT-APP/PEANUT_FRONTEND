import {ImageSourcePropType} from 'react-native';

export interface ImageType {
  source?: ImageSourcePropType;
  width?: number;
  height?: number;
}

export interface ImageCardType {
  source?: string;
  size: 'l' | 's';
}
