import React, {useState} from 'react';
import Sign from './Sign';
import {FormData} from '../../components/input/types';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useForm} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {handleNextStep} from '../../modules/formHandler';
import renderInput from '../../modules/renderInput';

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
      {step >= 3 &&
        renderInput({
          name: 'gender',
          placeholder: '성별',
          control,
          errors,
          touchedFields,
          trigger,
          secureTextEntry: false,
          icon: <DesignIcon type="drop" size="l" color={colors.TextDisabled} />,
        })}
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
