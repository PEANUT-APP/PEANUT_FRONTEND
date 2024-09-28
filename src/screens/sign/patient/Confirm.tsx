import React from 'react';
import Patient from './Patient';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {
  ConfirmContainer,
  ConfirmInfo,
  ConfirmInfoBox,
  ConfirmName,
  ConfirmProfile,
} from './styles';
import {useConfirm} from './hooks';

export default function Confirm() {
  const {handleSendCode, name, birthday, gender, phoneNumber, profileImage} =
    useConfirm();

  return (
    <Patient
      title="아래 프로필이 맞나요?"
      subTitle="이 분이 아니라면 뒤로가기, 맞다면 전송 버튼을 누르세요"
      button={
        <PrimaryButton size="l" onPress={handleSendCode}>
          연결 요청 전송하기
        </PrimaryButton>
      }>
      <ConfirmContainer>
        <ConfirmProfile source={{uri: profileImage}} />
        <ConfirmName weight="bold">{name}님</ConfirmName>
        <ConfirmInfoBox>
          <ConfirmInfo>{gender}</ConfirmInfo>
          <ConfirmInfo>·</ConfirmInfo>
          <ConfirmInfo>{birthday}</ConfirmInfo>
          <ConfirmInfo>·</ConfirmInfo>
          <ConfirmInfo>{phoneNumber}</ConfirmInfo>
        </ConfirmInfoBox>
      </ConfirmContainer>
    </Patient>
  );
}
