import React, {useEffect, useState} from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {handleNextStep} from '../../modules/formHandler';
import {PrimaryTextButton} from '../../components/button/TextButton';
import renderInput from '../../modules/renderInput';

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

  const handleFindPassword = () => {};

  return (
    <Sign
      title="로그인"
      button={
        <>
          <PrimaryButton
            size="l"
            onPress={() =>
              handleNextStep({
                step,
                setStep,
                fields: ['email', 'password'],
                trigger,
                handleSubmit,
                navigation,
                targetScreen: 'Home',
                errors,
              })
            }
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
        renderInput({
          name: 'password',
          placeholder: '비밀번호',
          control,
          errors,
          touchedFields,
          trigger,
          secureTextEntry: true,
        })}
      {step >= 0 &&
        renderInput({
          name: 'email',
          placeholder: '이메일',
          control,
          errors,
          touchedFields,
          trigger,
        })}
    </Sign>
  );
}
