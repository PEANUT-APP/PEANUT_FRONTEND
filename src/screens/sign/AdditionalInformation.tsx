import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import FitIcon from '../../components/icon/FitIcon';
import {handleNextStep, useAdditionalInformation} from './hooks';
import renderInput from './renderInput';

export default function AdditionalInformation() {
  const {
    navigation,
    step,
    setStep,
    control,
    handleSubmit,
    trigger,
    errors,
    touchedFields,
    isButtonDisabled,
    isNicknameValid,
  } = useAdditionalInformation();

  return (
    <Sign
      title="추가 정보 입력"
      button={
        <PrimaryButton
          size="l"
          onPress={() =>
            handleNextStep({
              step,
              setStep,
              fields: ['nickname', 'height', 'weight'],
              trigger,
              handleSubmit,
              navigation,
              targetScreen: 'SignIn',
              errors,
            })
          }
          disabled={isButtonDisabled}>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}
      type="SignUp">
      {step >= 2 &&
        renderInput({
          name: 'weight',
          placeholder: '몸무게',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 1 &&
        renderInput({
          name: 'height',
          placeholder: '키',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 0 &&
        renderInput({
          name: 'nickname',
          placeholder: '닉네임',
          control,
          errors,
          touchedFields,
          trigger,
          message: '중복되지 않는 닉네임입니다',
          icon: <FitIcon size="l" />,
          isNicknameValid,
        })}
    </Sign>
  );
}
