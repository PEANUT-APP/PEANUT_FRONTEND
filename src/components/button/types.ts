import {ReactNode} from 'react';
import {PhotoQuality} from 'react-native-image-picker';

export interface ButtonType {
  size: 'l' | 'm' | 's';
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  type?: string;
}

export interface ButtonStyleType extends ButtonType {
  isPressed: boolean;
}

export interface SelectButtonType {
  children: ReactNode;
  isSelected: boolean;
  onPress?: () => void;
}

export interface SelectButtonStyleType extends SelectButtonType {
  isSelected: boolean;
}

export interface NavigationButtonType {
  children: ReactNode;
  type: 'food' | 'home' | 'community' | 'my';
  active?: boolean;
}

export interface CameraButtonType {
  mediaType: 'photo' | 'video' | 'mixed';
  quality: PhotoQuality | undefined;
  cameraType: 'back' | 'front';
  saveToPhotos: boolean;
}
