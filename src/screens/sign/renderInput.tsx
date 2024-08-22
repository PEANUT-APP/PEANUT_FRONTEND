import React from 'react';
import Input from '../../components/input/Input';
import {useValidationRules} from '../../modules/validationRules';
import {RenderInputProps} from './types';

export default function RenderInput({
  name,
  placeholder,
  control,
  errors,
  touchedFields,
  trigger,
  secureTextEntry = false,
  message,
  icon,
  button,
  buttonText,
  timer,
  isTimerActive,
  handleSendEmail,
  isVerificationCodeValid,
  isNicknameValid,
  verificationCode,
  autoFocus,
}: RenderInputProps) {
  const validationRules = useValidationRules(verificationCode);

  return (
    <Input
      placeholder={placeholder}
      name={name}
      control={control}
      rules={validationRules[name]}
      errors={errors}
      editable={true}
      touchedFields={touchedFields}
      returnKeyType="next"
      trigger={trigger}
      secureTextEntry={secureTextEntry}
      message={message}
      icon={icon}
      button={button}
      buttonText={buttonText}
      timer={timer}
      isTimerActive={isTimerActive}
      handleSendEmail={handleSendEmail}
      isVerificationCodeValid={isVerificationCodeValid}
      isNicknameValid={isNicknameValid}
      autoFocus={autoFocus}
    />
  );
}
