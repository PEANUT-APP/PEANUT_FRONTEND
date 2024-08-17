import React, {useState} from 'react';
import Sign from './Sign';
import {FormData} from '../../components/input/types';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useForm} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {handleNextStep} from '../../modules/formHandler';
import renderInput from '../../modules/renderInput';
import Dropdown from '../../components/dropdown/Dropdown';

export default function BasicInformation() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      gender: '',
      birth: '',
      name: '',
      password: '',
    },
    mode: 'onBlur',
  });

  return (
    <Sign
      title="기본 정보 입력"
      button={
        <PrimaryButton
          size="l"
          onPress={() =>
            handleNextStep({
              step,
              setStep,
              fields: ['password', 'name', 'birth', 'gender'],
              trigger,
              handleSubmit,
              navigation,
              targetScreen: 'AdditionalInformation',
              errors,
            })
          }>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}
      type="SignUp">
      {step >= 3 && (
        <Dropdown
          control={control}
          errors={errors}
          touchedFields={touchedFields}
          trigger={trigger}
        />
      )}
      {step >= 2 &&
        renderInput({
          name: 'birth',
          placeholder: '생년월일',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 1 &&
        renderInput({
          name: 'name',
          placeholder: '이름',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 0 &&
        renderInput({
          name: 'password',
          placeholder: '비밀번호',
          control,
          errors,
          touchedFields,
          trigger,
          secureTextEntry: true,
        })}
    </Sign>
  );
}
