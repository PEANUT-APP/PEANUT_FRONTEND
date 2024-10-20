import React from 'react';
import Guardian from './Guardian';
import RenderInput from '../../../modules/renderInput';
import {useConnect} from './hooks';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {
  GuardianCardBox,
  GuardianCardContainer,
  GuardianCardImage,
  GuardianCardInfo,
  GuardianCardInfoBox,
  GuardianCardName,
  GuardianCardNoneImage,
  GuardianInfoBox,
} from './styles';
import {PrimaryTextButton} from '../../../components/button/TextButton';

export default function GuardianConnect() {
  const {
    control,
    errors,
    touchedFields,
    trigger,
    isButtonDisabled,
    onSubmit,
    name,
    guardianInfoData,
  } = useConnect();

  return (
    <Guardian
      title="보호자 연결하기"
      subTitle={
        guardianInfoData
          ? `${name}님은 보호자와 성공적으로 연결되었어요.`
          : `보호자가 연결 요청을 보냈나요?\n${name}님이 가입한 이메일에 도착한 코드를 입력해주세요.`
      }
      button={
        !guardianInfoData && (
          <PrimaryButton
            size="l"
            onPress={onSubmit}
            disabled={isButtonDisabled}>
            연결하기
          </PrimaryButton>
        )
      }>
      {!guardianInfoData ? (
        <>
          {RenderInput({
            name: 'guardianCode',
            placeholder: '인증 코드',
            control,
            errors,
            touchedFields,
            trigger,
          })}
        </>
      ) : (
        <GuardianCardContainer>
          <GuardianCardBox>
            {guardianInfoData.profileUrl ? (
              <GuardianCardImage source={{uri: guardianInfoData.profileUrl}} />
            ) : (
              <GuardianCardNoneImage />
            )}
            <GuardianInfoBox>
              <GuardianCardName weight="bold">
                {guardianInfoData.userName}님
              </GuardianCardName>
              <GuardianCardInfoBox>
                <GuardianCardInfo>{guardianInfoData.gender}</GuardianCardInfo>
                <GuardianCardInfo>·</GuardianCardInfo>
                <GuardianCardInfo>{guardianInfoData.birthday}</GuardianCardInfo>
                <GuardianCardInfo>·</GuardianCardInfo>
                <GuardianCardInfo>{guardianInfoData.height}cm</GuardianCardInfo>
                <GuardianCardInfo>·</GuardianCardInfo>
                <GuardianCardInfo>{guardianInfoData.weight}kg</GuardianCardInfo>
              </GuardianCardInfoBox>
            </GuardianInfoBox>
          </GuardianCardBox>
          <PrimaryTextButton size="s">연결 끊기</PrimaryTextButton>
        </GuardianCardContainer>
      )}
    </Guardian>
  );
}
