import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ParamList} from '../navigation/types';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
} from 'react-native-image-picker';
import {Alert} from 'react-native';

interface CameraButtonType {
  mediaType: 'photo' | 'video' | 'mixed';
  quality: PhotoQuality | undefined;
  cameraType: 'back' | 'front';
  saveToPhotos: boolean;
}

export function useCamera() {
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const handlePress = async () => {
    const options: CameraButtonType = {
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'back',
      saveToPhotos: true,
    };

    setIsActive(true);

    try {
      // 선택 옵션을 묻는 알림을 표시
      const result = await new Promise<ImagePickerResponse | null>(resolve => {
        Alert.alert(
          '사진 선택',
          '카메라로 사진을 찍거나 갤러리에서 선택하세요.',
          [
            {text: '취소', style: 'cancel', onPress: () => resolve(null)},
            {
              text: '카메라',
              onPress: () => launchCamera(options, resolve),
            },
            {
              text: '갤러리',
              onPress: () => launchImageLibrary(options, resolve),
            },
          ],
          {cancelable: true},
        );
      });
      if (result && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        navigation.navigate('MealRecording', {photoUri: uri}); // 이미지를 다음 페이지로 전달
      } else if (result?.errorCode) {
        Alert.alert(`오류 발생: ${result.errorMessage}`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('카메라 실행 중 오류가 발생했습니다.');
    } finally {
      setIsActive(false);
    }
  };

  return {isActive, handlePress};
}
