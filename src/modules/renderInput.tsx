import React, {ReactNode} from 'react';
import Input from '../components/input/Input';
import {FormData} from '../components/input/types';
import {validationRules} from './validationRules';
import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormTrigger,
} from 'react-hook-form';

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
}

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
  />
);

export default renderInput;
