import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {useEffect, useState} from 'react';
import {useSaveMedicineInfoMutation} from '../../services/medicine/medicineApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {useSaveInsulinIfoMutation} from '../../services/insulin/InsulinApi';

export default function useRecord() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return {handleBack};
}

export function useMedicine() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    trigger,
    getValues,
    watch,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const medicineNameWatch = watch('medicineName');

  const [saveMedicineInfo] = useSaveMedicineInfoMutation();

  const [intakeDays, setIntakeDays] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [inputs, setInputs] = useState<{id: number; time: string | null}[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const validate = async () => {
      let isValid = false;
      isValid = (await trigger('medicineName')) && intakeDays.length !== 0;

      setIsButtonDisabled(!isValid);
    };

    validate();
  }, [intakeDays.length, medicineNameWatch, trigger]);

  const addInputField = () => {
    setInputs(prevInputs => [
      ...prevInputs,
      {id: prevInputs.length + 1, time: null},
    ]);
  };

  const handleInputChange = (text: string, index: number) => {
    setInputs(prevInputs =>
      prevInputs.map((input, i) =>
        i === index ? {...input, time: text} : input,
      ),
    );
  };

  const handleSubmit = async () => {
    const data = {
      alarm: isToggleOn,
      intakeDays,
      intakeNumber: intakeDays.length.toString(),
      intakeTime: inputs.map(input => input.time || ''),
      medicineName: getValues('medicineName') || '',
    };

    try {
      await saveMedicineInfo(data).unwrap();
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('복약 추가에 실패했습니다.');
    }
  };

  return {
    control,
    errors,
    touchedFields,
    trigger,
    intakeDays,
    setIntakeDays,
    isToggleOn,
    setIsToggleOn,
    inputs,
    setInputs,
    addInputField,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
  };
}

export function useInsulin() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    trigger,
    getValues,
    watch,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const productNameWatch = watch('productName');
  const dosage = watch('dosage');

  const [saveInsulinIfo] = useSaveInsulinIfoMutation();

  const [intakeDays, setIntakeDays] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [inputs, setInputs] = useState<{id: number; time: string | null}[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const validate = async () => {
      let isValid = false;
      isValid =
        (await trigger('medicineName')) &&
        (await trigger('dosage')) &&
        intakeDays.length !== 0;

      setIsButtonDisabled(!isValid);
    };

    validate();
  }, [intakeDays.length, productNameWatch, dosage, trigger]);

  const addInputField = () => {
    setInputs(prevInputs => [
      ...prevInputs,
      {id: prevInputs.length + 1, time: null},
    ]);
  };

  const handleInputChange = (text: string, index: number) => {
    setInputs(prevInputs =>
      prevInputs.map((input, i) =>
        i === index ? {...input, time: text} : input,
      ),
    );
  };

  const handleSubmit = async () => {
    const data = {
      alarm: isToggleOn,
      administrationTime: intakeDays,
      dosage: getValues('dosage') || '',
      productName: getValues('productName') || '',
    };

    try {
      await saveInsulinIfo(data).unwrap();
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('복약 추가에 실패했습니다.');
    }
  };

  return {
    control,
    errors,
    touchedFields,
    trigger,
    intakeDays,
    setIntakeDays,
    isToggleOn,
    setIsToggleOn,
    inputs,
    setInputs,
    addInputField,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
  };
}
