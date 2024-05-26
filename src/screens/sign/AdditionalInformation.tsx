import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FieldErrors, useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {Alert} from 'react-native';
import Input from '../../components/input/Input';
import {validationRules} from '../../modules/validationRules';

export default function AdditionalInformation() {
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

  const onSubmit = () => {
    Alert.alert('성공', '모든 필드가 유효합니다!');
  };

  const onError = (errs: FieldErrors<FormData>) => {
    const firstError = Object.values(errs)[0];
    Alert.alert(
      '실패',
      firstError?.message || '알 수 없는 오류가 발생했습니다.',
    );
  };

  const renderInput = (
    name: keyof FormData,
    placeholder: string,
    message?: string,
  ) => (
    <Input
      placeholder={placeholder}
      name={name}
      control={control}
      rules={validationRules[name]}
      errors={errors}
      editable={true}
      icon={name === 'nickname'}
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
        <PrimaryButton size="l" onPress={handleSubmit(onSubmit, onError)}>
          다음
        </PrimaryButton>
      }>
      {renderInput('weight', '몸무게')}
      {renderInput('height', '키')}
      {renderInput('nickname', '닉네임', '단 하나뿐인 닉네임입니다')}
    </Sign>
  );
}
