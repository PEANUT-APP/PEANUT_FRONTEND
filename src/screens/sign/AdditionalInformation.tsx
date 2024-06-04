import React, {ReactNode, useState} from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FieldErrors, useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {Alert} from 'react-native';
import Input from '../../components/input/Input';
import {validationRules} from '../../modules/validationRules';
import FitIcon from '../../components/icon/FitIcon';

export default function AdditionalInformation() {
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

  const handleFormSubmit = () => {
    Alert.alert('성공', '모든 필드가 유효합니다!');
  };

  const handleFormError = (errs: FieldErrors<FormData>) => {
    const firstError = Object.values(errs)[0];
    Alert.alert(
      '실패',
      firstError?.message || '알 수 없는 오류가 발생했습니다.',
    );
  };

  const handleNextStep = async () => {
    const fields: (keyof FormData)[] = ['nickname', 'height', 'weight'];
    const result = await trigger(fields[step]);

    if (result) {
      step < 2
        ? setStep(step + 1)
        : handleSubmit(handleFormSubmit, handleFormError)();
    } else {
      handleFormError(errors);
    }
  };

  const renderInput = (
    name: keyof FormData,
    placeholder: string,
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
      icon={icon}
      touchedFields={touchedFields}
      returnKeyType="next"
      trigger={trigger}
      message={message}
    />
  );

  return (
    <Sign
      title="추가 정보 입력"
      button={
        <PrimaryButton size="l" onPress={handleNextStep}>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}>
      {step >= 2 && renderInput('weight', '몸무게')}
      {step >= 1 && renderInput('height', '키')}
      {step >= 0 &&
        renderInput(
          'nickname',
          '닉네임',
          '단 하나뿐인 닉네임입니다',
          <FitIcon size="l" />,
        )}
    </Sign>
  );
}
