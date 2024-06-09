import React, {ReactNode, useState} from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import Input from '../../components/input/Input';
import {validationRules} from '../../modules/validationRules';
import FitIcon from '../../components/icon/FitIcon';
import {handleFormError, handleFormSubmit} from '../../modules/formHandler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

const renderInput = (
  name: keyof FormData,
  placeholder: string,
  control: any,
  errors: any,
  touchedFields: any,
  trigger: any,
  message?: string,
  icon?: ReactNode,
) => (
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
    message={message}
    icon={icon}
  />
);

export default function AdditionalInformation() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      weight: '',
      height: '',
      nickname: '',
    },
    mode: 'onBlur',
  });

  const handleNextStep = async () => {
    const fields: (keyof FormData)[] = ['nickname', 'height', 'weight'];
    const result = await trigger(fields[step]);

    if (result) {
      step < 2
        ? setStep(step + 1)
        : handleSubmit(
            () => handleFormSubmit(navigation, 'SignIn'),
            handleFormError,
          )();
    } else {
      handleFormError(errors);
    }
  };

  return (
    <Sign
      title="추가 정보 입력"
      button={
        <PrimaryButton size="l" onPress={handleNextStep}>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}
      type="SignUp">
      {step >= 2 &&
        renderInput(
          'weight',
          '몸무게',
          control,
          errors,
          touchedFields,
          trigger,
        )}
      {step >= 1 &&
        renderInput('height', '키', control, errors, touchedFields, trigger)}
      {step >= 0 &&
        renderInput(
          'nickname',
          '닉네임',
          control,
          errors,
          touchedFields,
          trigger,
          '단 하나뿐인 닉네임입니다',
          <FitIcon size="l" />,
        )}
    </Sign>
  );
}
