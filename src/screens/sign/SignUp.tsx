import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {Alert} from 'react-native';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import FitIcon from '../../components/icon/FitIcon';
import {handleFormError} from '../../modules/formHandler';
import renderInput from '../../modules/renderInput';

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
        renderInput({
          name: 'verificationCode',
          placeholder: '인증번호',
          control,
          errors,
          touchedFields,
          trigger,
          message: '인증되었습니다',
          icon: <FitIcon size="l" />,
        })}
      {renderInput({
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
