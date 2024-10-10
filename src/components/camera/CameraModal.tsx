/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ModalBack,
  ModalButton,
  ModalButtonBox,
  ModalButtonPair,
  ModalContainer,
  ModalContent,
  ModalContentBox,
  ModalTitle,
} from './styles';
import {colors} from '../../styles/colors';
import {Modal} from 'react-native';
import {CameraModalType} from './types';
import {BlurView} from '@react-native-community/blur';

export default function CameraModal({
  modalVisible,
  setModalVisible,
  handleOptionSelect,
}: CameraModalType) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <BlurView
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        blurType="light"
        blurAmount={1}
      />
      <ModalBack onPress={() => setModalVisible(false)} activeOpacity={1}>
        <ModalContainer>
          <ModalContentBox>
            <ModalTitle weight="bold">
              이미지 접근 방법을 선택해주세요
            </ModalTitle>
            <ModalContent color={colors.TextNeutral}>
              카메라로 사진을 찍거나 갤러리에서{'\n'}선택할 수 있어요.
            </ModalContent>
          </ModalContentBox>
          <ModalButtonBox>
            <ModalButton onPress={() => setModalVisible(false)}>
              <ModalContent color={colors.TextNeutral}>취소</ModalContent>
            </ModalButton>
            <ModalButtonPair>
              <ModalButton onPress={() => handleOptionSelect('gallery')}>
                <ModalContent color={colors.primaryNormal}>갤러리</ModalContent>
              </ModalButton>
              <ModalButton onPress={() => handleOptionSelect('camera')}>
                <ModalContent color={colors.primaryNormal}>카메라</ModalContent>
              </ModalButton>
            </ModalButtonPair>
          </ModalButtonBox>
        </ModalContainer>
      </ModalBack>
    </Modal>
  );
}
