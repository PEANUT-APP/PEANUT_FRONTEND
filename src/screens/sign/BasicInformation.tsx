import React from 'react';
import Sign from './Sign';
import {FormData} from '../../components/input/types';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FieldErrors, useForm} from 'react-hook-form';
import Input from '../../components/input/Input';
import {Alert} from 'react-native';
import {validationRules} from '../../modules/validationRules';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export default function BasicInformation() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

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

  const onSubmit = () => {
    Alert.alert('성공', '모든 필드가 유효합니다!');
    navigation.navigate('AdditionalInformation');
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
    secureTextEntry = false,
  ) => (
    <Input
      placeholder={placeholder}
      name={name}
      control={control}
      rules={validationRules[name]}
      errors={errors}
      editable={true}
      icon={name === 'gender'}
      touchedFields={touchedFields}
      returnKeyType="next"
      trigger={trigger}
      secureTextEntry={secureTextEntry}
    />
  );

  return (
    <Sign
      title="기본 정보 입력"
      button={
        <PrimaryButton size="l" onPress={handleSubmit(onSubmit, onError)}>
          다음
        </PrimaryButton>
      }>
      {renderInput('gender', '성별')}
      {renderInput('birth', '생년월일')}
      {renderInput('name', '이름')}
      {renderInput('password', '비밀번호', true)}
    </Sign>
  );
}
