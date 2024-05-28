import React, {useState} from 'react';
import {FieldErrors, useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {Alert} from 'react-native';
import Input from '../../components/input/Input';
import Sign from '../../components/sign/Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {validationRules} from '../../modules/validationRules';

export default function SignUp() {
  const [verification, setVerification] = useState(false);

  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      verificationCode: '',
    },
    mode: 'onBlur',
  });

  const onSubmitEmail = (data: {email: string}) => {
    Alert.alert(data.email);
    setVerification(true);
  };

  const onSubmitVerificationCode = () => {
    Alert.alert('인증 성공');
    navigation.navigate('BasicInformation');
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
      icon={name === 'verificationCode'}
      touchedFields={touchedFields}
      returnKeyType="next"
      trigger={trigger}
      message={message}
    />
  );

  return (
    <Sign
      title="회원가입"
      button={
        <PrimaryButton
          size="l"
          onPress={handleSubmit(
            verification ? onSubmitVerificationCode : onSubmitEmail,
            onError,
          )}>
          다음
        </PrimaryButton>
      }>
      {verification &&
        renderInput('verificationCode', '인증번호', '인증되었습니다')}
      {renderInput('email', '이메일')}
    </Sign>
  );
}
