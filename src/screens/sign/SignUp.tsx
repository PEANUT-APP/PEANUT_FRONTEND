import React, {ReactNode, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {Alert} from 'react-native';
import Input from '../../components/input/Input';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {validationRules} from '../../modules/validationRules';
import FitIcon from '../../components/icon/FitIcon';
import {handleFormError} from '../../modules/formHandler';

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

  const handleFormSubmit = (data: {email: string}) => {
    if (!verification) {
      Alert.alert(data.email);
      setVerification(true);
    } else {
      Alert.alert('인증 성공');
      navigation.navigate('BasicInformation');
    }
  };

  return (
    <Sign
      title="회원가입"
      button={
        <PrimaryButton
          size="l"
          onPress={handleSubmit(handleFormSubmit, handleFormError)}>
          다음
        </PrimaryButton>
      }
      verification={verification}
      setVerification={setVerification}
      type="SignUp">
      {verification &&
        renderInput(
          'verificationCode',
          '인증번호',
          control,
          errors,
          touchedFields,
          trigger,
          '인증되었습니다',
          <FitIcon size="l" />,
        )}
      {renderInput('email', '이메일', control, errors, touchedFields, trigger)}
    </Sign>
  );
}
