import React, {ReactNode} from 'react';
import Input from '../components/input/Input';
import {useValidationRules} from './validationRules';
import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormTrigger,
} from 'react-hook-form';
import {FormData} from '../components/input/types';

interface RenderInputProps {
  name: keyof FormData;
  placeholder: string;
  control: Control<FormData>;
  errors: DeepMap<FieldValues, FieldError>;
  touchedFields: DeepMap<Record<string, boolean>, boolean>;
  trigger: UseFormTrigger<FormData>;
  secureTextEntry?: boolean;
  message?: string;
  icon?: ReactNode;
  button?: boolean;
  buttonText?: string;
  timer?: number;
  isTimerActive?: boolean;
  handleSendEmail?: (data: {email: string}) => void;
  isVerificationCodeValid?: boolean;
  isNicknameValid?: boolean;
  verificationCode?: string;
  autoFocus?: boolean;
}

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
  const keyboardType =
    name === 'phoneNumber'
      ? 'phone-pad'
      : name === 'height' || name === 'weight' || name === 'dosage'
      ? 'numeric'
      : 'default';

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
      keyboardType={keyboardType}
    />
  );
}
