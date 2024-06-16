import React, {useState} from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import FitIcon from '../../components/icon/FitIcon';
import {handleNextStep} from '../../modules/formHandler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import renderInput from '../../modules/renderInput';

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

  return (
    <Sign
      title="추가 정보 입력"
      button={
        <PrimaryButton
          size="l"
          onPress={() =>
            handleNextStep({
              step,
              setStep,
              fields: ['nickname', 'height', 'weight'],
              trigger,
              handleSubmit,
              navigation,
              targetScreen: 'SignIn',
              errors,
            })
          }>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}
      type="SignUp">
      {step >= 2 &&
        renderInput({
          name: 'weight',
          placeholder: '몸무게',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 1 &&
        renderInput({
          name: 'height',
          placeholder: '키',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 0 &&
        renderInput({
          name: 'nickname',
          placeholder: '닉네임',
          control,
          errors,
          touchedFields,
          trigger,
          message: '단 하나뿐인 닉네임입니다',
          icon: <FitIcon size="l" />,
        })}
    </Sign>
  );
}
