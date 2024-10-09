import {NavigationProp} from '@react-navigation/native';
import {ReactNode} from 'react';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form';
import {ParamList} from '../../navigation/types';
import {FormData} from '../../components/input/types';

export interface SignType {
  title: string;
  subTitle?: string;
  children: ReactNode;
  button: ReactNode;
  verification?: boolean;
  setVerification?: React.Dispatch<React.SetStateAction<boolean>>;
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  isComplete?: boolean;
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
  handleSignInFormSubmit?: SubmitHandler<FormData>;
};
