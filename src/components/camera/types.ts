import {PhotoQuality} from 'react-native-image-picker';

export interface CameraButtonType {
  mediaType: 'photo' | 'video' | 'mixed';
  quality: PhotoQuality | undefined;
  cameraType: 'back' | 'front';
  saveToPhotos: boolean;
}
