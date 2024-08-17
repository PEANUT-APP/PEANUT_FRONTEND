import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import FitIcon from '../../components/icon/FitIcon';
import {handleFormError, useSignUp} from './hooks';
import renderInput from './renderInput';

export default function SignUp() {
  const {
    verification,
    setVerification,
    handleSubmit,
    control,
    errors,
    trigger,
    touchedFields,
    handleSignUpFormSubmit,
    timer,
    isTimerActive,
    isButtonDisabled,
    handleSendEmail,
    isVerificationCodeValid,
  } = useSignUp();
  return (
    <Sign
      title="회원가입"
      button={
        <PrimaryButton
          size="l"
          onPress={handleSubmit(handleSignUpFormSubmit, handleFormError)}
          disabled={isButtonDisabled}>
          다음
        </PrimaryButton>
      }
      verification={verification}
      setVerification={setVerification}
      type="SignUp">
      {verification &&
        renderInput({
          name: 'verificationCode',
          placeholder: '인증번호',
          control,
          errors,
          touchedFields,
          trigger,
          message: '인증되었습니다',
          icon: <FitIcon size="l" />,
          button: true,
          buttonText: '재전송',
          timer,
          isTimerActive,
          handleSendEmail,
          isVerificationCodeValid,
        })}
      {renderInput({
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
