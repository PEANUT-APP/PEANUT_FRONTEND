import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import CameraDefault from '../../assets/images/CameraDefault.svg';
import CameraActive from '../../assets/images/CameraActive.svg';
import {CameraContainer} from './styles';
import {useCamera} from '../../modules/useCamera';
import CameraModal from './CameraModal';

export default function CameraButton() {
  const {
    isActive,
    handlePress,
    modalVisible,
    setModalVisible,
    handleOptionSelect,
  } = useCamera();

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <CameraContainer>
          {isActive ? <CameraActive /> : <CameraDefault />}
        </CameraContainer>
      </TouchableWithoutFeedback>
      <CameraModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleOptionSelect={handleOptionSelect}
      />
    </>
  );
}
