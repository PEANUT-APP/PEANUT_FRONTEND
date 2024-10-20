import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ParamList} from '../navigation/types';
import {
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
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [isActive, setIsActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOptionSelect = useCallback(
    async (option: 'camera' | 'gallery') => {
      const options: CameraButtonType = {
        mediaType: 'photo',
        quality: 0.8,
        cameraType: 'back',
        saveToPhotos: true,
      };

      setIsActive(true);
      setModalVisible(false);

      try {
        // 선택 옵션을 묻는 알림을 표시
        const result =
          option === 'camera'
            ? await launchCamera(options)
            : await launchImageLibrary(options);

        if (result?.assets?.length) {
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
    },
    [navigation],
  );

  return {
    isActive,
    handlePress,
    modalVisible,
    setModalVisible,
    handleOptionSelect,
  };
}
