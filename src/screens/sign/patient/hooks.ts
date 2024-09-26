import {useForm} from 'react-hook-form';
import {FormData} from '../../../components/input/types';
import {useEffect, useState} from 'react';
import {
  useLazyGetPatientQuery,
  useSendInviteCodeMutation,
} from '../../../services/user/userApi';
import {Alert} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NavigationList, ParamList} from '../../../navigation/types';
import {GetPatientReturnType} from '../../../services/user/types';
import {StackNavigationProp} from '@react-navigation/stack';

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

  const [getPatient] = useLazyGetPatientQuery();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await trigger('email');
      setIsButtonDisabled(!isValid);
    };
    validateEmail();
  }, [trigger, emailWatch]);

  const handleSendEmail = async ({email}: {email: string}) => {
    try {
      const response = await getPatient({email}).unwrap();
      navigation.navigate('Confirm', {data: response});
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
  const route =
    useRoute<RouteProp<{params: {data: GetPatientReturnType}}, 'params'>>();
  const {data} = route.params;

  const [sendInviteCode] = useSendInviteCodeMutation();

  const birthday = data.birthday.replace(/[^0-9]/g, '');

  const phoneParts = data.phoneNumber.split('-');
  const formattedPhoneNumber = `${phoneParts[0]}****${phoneParts[2]}`;

  const handleSendCode = async () => {
    try {
      await sendInviteCode({}).unwrap();
      navigation.navigate('Complete');
    } catch (error) {
      console.log(error);
      Alert.alert('연결 요청에 실패했습니다!');
    }
  };

  return {
    handleSendCode,
    name: data.name,
    birthday,
    gender: data.gender,
    phoneNumber: formattedPhoneNumber,
    profileImage: data.profileImage,
  };
}

export function useComplete() {
  const navigation = useNavigation<StackNavigationProp<NavigationList>>();

  const handleGoMy = () => {
    navigation.push('My');
  };

  return {handleGoMy};
}
