import React, {useState} from 'react';
import {Alert, TouchableWithoutFeedback} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {CameraButtonType} from './types';
import CameraDefault from '../../assets/images/CameraDefault.svg';
import CameraActive from '../../assets/images/CameraActive.svg';
import {CameraContainer} from './styles';

export default function CameraButton() {
  const [isActive, setIsActive] = useState(false);

  const handlePress = async () => {
    const options: CameraButtonType = {
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'back',
      saveToPhotos: true,
    };

    setIsActive(true);

    try {
      const result = await launchCamera(options);
      if (result.didCancel) {
        Alert.alert('사용자가 이미지 선택을 취소했습니다.');
      } else if (result.errorCode) {
        Alert.alert(`오류 발생: ${result.errorMessage}`);
      } else {
        Alert.alert('이미지가 성공적으로 선택되었습니다.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('카메라 실행 중 오류가 발생했습니다.');
    } finally {
      setIsActive(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <CameraContainer>
        {isActive ? <CameraActive /> : <CameraDefault />}
      </CameraContainer>
    </TouchableWithoutFeedback>
  );
}
