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

export function useConnect() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const route = useRoute<RouteProp<{params: {name: string}}, 'params'>>();
  const {name} = route.params;

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await trigger('guardianCode');
      setIsButtonDisabled(!isValid);
    };
    validateEmail();
  }, [trigger, guardianCodeWatch]);

  const handleSendCode = async () => {
    navigation.navigate('GuardianComplete', {name});
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
  };
}

export function useComplete() {
  const navigation = useNavigation<StackNavigationProp<NavigationList>>();
  const route = useRoute<RouteProp<{params: {name: string}}, 'params'>>();
  const {name} = route.params;

  const handleGoMy = () => {
    navigation.push('My');
  };

  return {handleGoMy, name};
}
