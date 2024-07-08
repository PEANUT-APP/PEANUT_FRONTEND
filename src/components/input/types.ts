import {Dispatch, ReactNode, SetStateAction} from 'react';
import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormTrigger,
} from 'react-hook-form';
import {ReturnKeyTypeOptions} from 'react-native';

export interface FormData {
  email: string;
  verificationCode: string;
  gender: string;
  birth: string;
  name: string;
  password: string;
  weight: string;
  height: string;
  nickname: string;
}

export interface InputType {
  placeholder: string;
  name: keyof FormData;
  rules?: object;
  control: Control<FormData>;
  errors: DeepMap<FieldValues, FieldError>;
  buttonText?: string;
  editable?: boolean;
  defaultValue?: string;
  icon?: ReactNode;
  button?: boolean;
  message?: string;
  touchedFields: DeepMap<Record<string, boolean>, boolean>;
  returnKeyType?: ReturnKeyTypeOptions;
  trigger: UseFormTrigger<FormData>;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => {};
  drop?: boolean;
  value?: string;
  isDropdownVisible?: boolean;
  setIsDropdownVisible?: Dispatch<SetStateAction<boolean>>;
  pointerEvents?: 'none' | 'box-none' | 'box-only' | 'auto' | undefined;
}

export interface InputStyleType {
  isFocused?: boolean;
  editable?: boolean;
  icon?: boolean;
  button?: boolean;
  isError?: boolean;
  isValid?: boolean;
  message?: boolean;
  drop?: boolean;
  isDropdownVisible?: boolean;
}
