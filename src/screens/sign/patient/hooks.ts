import {useForm} from 'react-hook-form';
import {FormData} from '../../../components/input/types';
import {useEffect, useState} from 'react';
import {useSendInviteCodeMutation} from '../../../services/user/userApi';
import {Alert} from 'react-native';
import {SendCodeFormType} from '../../../services/user/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NavigationList, ParamList} from '../../../navigation/types';

export function useConnect() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    trigger,
    watch,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const emailWatch = watch('email');

  const [sendInviteCode] = useSendInviteCodeMutation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await trigger('email');
      setIsButtonDisabled(!isValid);
    };
    validateEmail();
  }, [trigger, emailWatch]);

  const handleSendEmail = async (data: SendCodeFormType) => {
    try {
      const response = await sendInviteCode(data).unwrap();
      navigation.navigate('Confirm');
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert('이메일 조회에 실패했습니다!');
    }
  };

  const onSubmit = handleSubmit(handleSendEmail);

  return {
    control,
    trigger,
    errors,
    touchedFields,
    isButtonDisabled,
    onSubmit,
  };
}

export function useConfirm() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const handleSendCode = () => {
    navigation.navigate('Complete');
  };

  return {handleSendCode};
}

export function useComplete() {
  const navigation = useNavigation<NavigationProp<NavigationList>>();

  const handleGoMy = () => {
    navigation.navigate('My');
  };

  return {handleGoMy};
}
