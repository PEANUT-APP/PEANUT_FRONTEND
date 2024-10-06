import {Dispatch, ReactNode, SetStateAction} from 'react';
import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import {KeyboardTypeOptions, ReturnKeyTypeOptions} from 'react-native';

export interface FormData {
  email: string;
  confirmationCode: string;
  gender: string;
  birth: string;
  name: string;
  password: string;
  weight: string;
  height: string;
  nickname: string;
  phoneNumber: string;
  medicineName: string;
  productName: string;
  dosage: string;
  bloodSugar: string;
  measurementCondition: string;
  memo: string;
  bloodSugarTime: string;
  foodTime: string;
}

export interface InputType {
  placeholder?: string;
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
  date?: boolean;
  value?: string;
  isDropdownVisible?: boolean;
  setIsDropdownVisible?: Dispatch<SetStateAction<boolean>>;
  pointerEvents?: 'none' | 'box-none' | 'box-only' | 'auto' | undefined;
  timer?: number;
  isTimerActive?: boolean;
  handleSendEmail?: (data: {email: string}) => void;
  isVerificationCodeValid?: boolean;
  isNicknameValid?: boolean;
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  size?: 'm' | 's';
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
  date?: boolean;
  isDropdownVisible?: boolean;
  size?: 'm' | 's';
}

export interface TimeInputType {
  placeholder?: string;
  name?: keyof FormData;
  rules?: object;
  control?: Control<FormData>;
  errors?: DeepMap<FieldValues, FieldError>;
  touchedFields?: DeepMap<Record<string, boolean>, boolean>;
  trigger?: UseFormTrigger<FormData>;
  setValue?: UseFormSetValue<FormData>;
  setFocus?: UseFormSetFocus<FormData>;
  value?: string;
  editable?: boolean;
  onChangeText?: (text: any) => void;
}

export interface DateInputType {
  placeholder?: string;
  name: keyof FormData;
  rules?: object;
  control: Control<FormData>;
  errors: DeepMap<FieldValues, FieldError>;
  touchedFields: DeepMap<Record<string, boolean>, boolean>;
  trigger: UseFormTrigger<FormData>;
  setValue: UseFormSetValue<FormData>;
  setFocus: UseFormSetFocus<FormData>;
}
