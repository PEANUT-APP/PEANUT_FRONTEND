import React, {useEffect, useState} from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import Input from '../../components/input/Input';
import {validationRules} from '../../modules/validationRules';
import {handleFormError, handleFormSubmit} from '../../modules/formHandler';
import {PrimaryTextButton} from '../../components/button/TextButton';

const renderInput = (
  name: keyof FormData,
  placeholder: string,
  control: any,
  errors: any,
  touchedFields: any,
  trigger: any,
  secureTextEntry = false,
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
    secureTextEntry={secureTextEntry}
  />
);

export default function SignIn() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [step, setStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const emailWatch = watch('email');

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await trigger('email');
      setIsButtonDisabled(!isValid);
    };
    validateEmail();
  }, [trigger, emailWatch, step]);

  const handleNextStep = async () => {
    const fields: (keyof FormData)[] = ['email', 'password'];
    const result = await trigger(fields[step]);

    if (result) {
      step < 1
        ? setStep(step + 1)
        : handleSubmit(
            () => handleFormSubmit(navigation, 'Home'),
            handleFormError,
          )();
    } else {
      handleFormError(errors);
    }
  };

  const handleFindPassword = () => {};

  return (
    <Sign
      title="로그인"
      button={
        <>
          <PrimaryButton
            size="l"
            onPress={handleNextStep}
            disabled={isButtonDisabled}>
            {step >= 1 ? '로그인' : '다음'}
          </PrimaryButton>
          <PrimaryTextButton size="m" onPress={handleFindPassword}>
            비밀번호 찾기
          </PrimaryTextButton>
        </>
      }
      step={step}
      setStep={setStep}
      type="SignIn">
      {step >= 1 &&
        renderInput(
          'password',
          '비밀번호',
          control,
          errors,
          touchedFields,
          trigger,
          true,
        )}
      {step >= 0 &&
        renderInput('email', '이메일', control, errors, touchedFields, trigger)}
    </Sign>
  );
}
