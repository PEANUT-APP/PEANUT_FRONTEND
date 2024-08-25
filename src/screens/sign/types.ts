import {NavigationProp} from '@react-navigation/native';
import {ReactNode} from 'react';
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form';
import {ParamList} from '../../navigation/types';
import {FormData} from '../../components/input/types';

export interface SignType {
  title: string;
  children: ReactNode;
  button: ReactNode;
  verification?: boolean;
  setVerification?: React.Dispatch<React.SetStateAction<boolean>>;
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

export interface RenderInputProps {
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

export type HandleNextStepProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  fields: (keyof FormData)[];
  trigger: UseFormTrigger<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  navigation: NavigationProp<ParamList>;
  targetScreen: string;
  errors: FieldErrors<FormData>;
  handleBasicFormSubmit?: SubmitHandler<FormData>;
  handleAdditionalFormSubmit?: SubmitHandler<FormData>;
};
