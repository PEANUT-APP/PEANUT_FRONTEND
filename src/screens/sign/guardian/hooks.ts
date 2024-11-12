import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NavigationList, ParamList} from '../../../navigation/types';
import {FormData} from '../../../components/input/types';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useGetGuardianInfoQuery} from '../../../services/user/userApi';
import {GuardianRelationFormType} from '../../../services/user/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {BackHandler} from 'react-native';
import {API_URL} from '@env';

export function useConnect() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const route = useRoute<RouteProp<{params: {name: string}}, 'params'>>();
  const {name} = route.params;

  const token = useSelector((state: RootState) => state.token.accessToken);

  const {
    control,
    trigger,
    watch,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const guardianCodeWatch = watch('guardianCode');

  //const [getPatient] = useLazyGetPatientQuery();
  const {
    data: guardianInfoData,
    isSuccess: isGuardianInfoSuccess,
    refetch: guardianInfoRetch,
  } = useGetGuardianInfoQuery();
  //const [confirmGuardianRelation] = useConfirmGuardianRelationMutation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validateCode = async () => {
      const isValid = await trigger('guardianCode');
      setIsButtonDisabled(!isValid);
    };
    validateCode();
  }, [trigger, guardianCodeWatch]);

  /*const handleSendCode = async (data: GuardianRelationFormType) => {
    try {
      const response = await confirmGuardianRelation(data).unwrap();
      console.log('보호자 연결', response);
      navigation.navigate('GuardianComplete', {name});
    } catch (error) {
      console.log(error);
    }
  };*/

  const handleSendCode = async (data: GuardianRelationFormType) => {
    try {
      const response = await fetch(
        `${API_URL}user/connect/patient-guardian?confirmationCode=${data.guardianCode}`,
        {
          method: 'POST',
          headers: {
            'X-AUTH-TOKEN': token || '',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('보호자 연결 성공', result);

      // 보호자 연결 성공 시, 완료 페이지로 이동
      navigation.navigate('GuardianComplete', {name});
      guardianInfoRetch();
    } catch (error) {
      console.log('보호자 연결 실패', error);
    }
  };

  const onSubmit = handleSubmit(handleSendCode);

  return {
    control,
    trigger,
    errors,
    touchedFields,
    isButtonDisabled,
    onSubmit,
    name,
    guardianInfoData,
    isGuardianInfoSuccess,
  };
}

export function useComplete() {
  const navigation = useNavigation<StackNavigationProp<NavigationList>>();
  const route = useRoute<RouteProp<{params: {name: string}}, 'params'>>();
  const {name} = route.params;

  useEffect(() => {
    const handleBackPress = () => {
      // 두 단계 뒤로 가기
      navigation.pop(2);
      return true; // 기본 동작 방지
    };

    // BackHandler에 이벤트 추가
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [navigation]);

  const handleGoMy = () => {
    navigation.push('My');
  };

  return {handleGoMy, name};
}
