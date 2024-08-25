import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {handleNextStep, useSignIn} from './hooks';
import {PrimaryTextButton} from '../../components/button/TextButton';
import RenderInput from './renderInput';

export default function SignIn() {
  const {
    navigation,
    step,
    setStep,
    isButtonDisabled,
    control,
    handleSubmit,
    errors,
    trigger,
    touchedFields,
    handleFindPassword,
  } = useSignIn();

  return (
    <Sign
      title="로그인"
      button={
        <>
          <PrimaryButton
            size="l"
            onPress={() =>
              handleNextStep({
                step,
                setStep,
                fields: ['email', 'password'],
                trigger,
                handleSubmit,
                navigation,
                targetScreen: 'Home',
                errors,
              })
            }
            disabled={isButtonDisabled}>
            {step >= 1 ? '로그인' : '다음'}
          </PrimaryButton>
          <PrimaryTextButton size="m" onPress={handleFindPassword}>
            비밀번호 찾기
          </PrimaryTextButton>
        </>
      }
      step={step}
      setStep={setStep}>
      {step >= 1 &&
        RenderInput({
          name: 'password',
          placeholder: '비밀번호',
          control,
          errors,
          touchedFields,
          trigger,
          secureTextEntry: true,
        })}
      {step >= 0 &&
        RenderInput({
          name: 'email',
          placeholder: '이메일',
          control,
          errors,
          touchedFields,
          trigger,
        })}
    </Sign>
  );
}
