import React from 'react';
import Input from '../../components/input/Input';
import {validationRules} from '../../modules/validationRules';
import {RenderInputProps} from './types';

const renderInput = ({
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
}: RenderInputProps) => (
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
  />
);

export default renderInput;
