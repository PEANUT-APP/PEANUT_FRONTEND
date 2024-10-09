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
import {GuardianInfoType} from './types';
import {PrimaryTextButton} from '../../../components/button/TextButton';

const guardianInfo: GuardianInfoType = {
  userName: '김유성',
  gender: '남성',
  birth: '2000.09.10',
  height: 175,
  weight: 75,
  imageUrl: null,
};

export default function GuardianConnect() {
  const {
    control,
    errors,
    touchedFields,
    trigger,
    isButtonDisabled,
    onSubmit,
    name,
  } = useConnect();

  return (
    <Guardian
      title="보호자 연결하기"
      subTitle={`보호자가 연결 요청을 보냈나요?\n${name}님이 가입한 이메일에 도착한 코드를 입력해주세요.`}
      button={
        !guardianInfo && (
          <PrimaryButton
            size="l"
            onPress={onSubmit}
            disabled={isButtonDisabled}>
            연결하기
          </PrimaryButton>
        )
      }>
      {!guardianInfo ? (
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
            {guardianInfo.imageUrl ? (
              <GuardianCardImage />
            ) : (
              <GuardianCardNoneImage />
            )}
            <GuardianInfoBox>
              <GuardianCardName weight="bold">
                {guardianInfo.userName}님
              </GuardianCardName>
              <GuardianCardInfoBox>
                <GuardianCardInfo>{guardianInfo.gender}</GuardianCardInfo>
                <GuardianCardInfo>·</GuardianCardInfo>
                <GuardianCardInfo>{guardianInfo.birth}</GuardianCardInfo>
                <GuardianCardInfo>·</GuardianCardInfo>
                <GuardianCardInfo>{guardianInfo.height}cm</GuardianCardInfo>
                <GuardianCardInfo>·</GuardianCardInfo>
                <GuardianCardInfo>{guardianInfo.weight}kg</GuardianCardInfo>
              </GuardianCardInfoBox>
            </GuardianInfoBox>
          </GuardianCardBox>
          <PrimaryTextButton size="s">연결 끊기</PrimaryTextButton>
        </GuardianCardContainer>
      )}
    </Guardian>
  );
}
