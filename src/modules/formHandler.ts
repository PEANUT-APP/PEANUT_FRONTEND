import {NavigationProp} from '@react-navigation/native';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form';
import {Alert} from 'react-native';
import {ParamList} from '../navigation/types';
import {FormData} from '../components/input/types';

export const handleFormSubmit = (navigation: any, navigateTo: string) => {
  Alert.alert('성공', '모든 필드가 유효합니다!');
  navigation.navigate(navigateTo);
};

export const handleFormError = (errs: FieldErrors<FormData>) => {
  const firstError = Object.values(errs)[0];
  Alert.alert('실패', firstError?.message || '알 수 없는 오류가 발생했습니다.');
};

type HandleNextStepProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  fields: (keyof FormData)[];
  trigger: UseFormTrigger<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  navigation: NavigationProp<ParamList>;
  targetScreen: string;
  errors: FieldErrors<FormData>;
};

export const handleNextStep = async ({
  step,
  setStep,
  fields,
  trigger,
  handleSubmit,
  navigation,
  targetScreen,
  errors,
}: HandleNextStepProps) => {
  const result = await trigger(fields[step]);

  if (result) {
    if (step < fields.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit(
        () => handleFormSubmit(navigation, targetScreen),
        handleFormError,
      )();
    }
  } else {
    handleFormError(errors);
  }
};
