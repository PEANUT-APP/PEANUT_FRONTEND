import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm, UseFormTrigger} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {useCallback, useEffect, useState} from 'react';
import {useSaveMedicineInfoMutation} from '../../services/medicine/medicineApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {useSaveInsulinIfoMutation} from '../../services/insulin/InsulinApi';

export default function useRecord() {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {handleBack};
}

function useCommonForm(
  validateFields: (keyof FormData)[],
  trigger: UseFormTrigger<FormData>,
) {
  const [intakeDays, setIntakeDays] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [inputs, setInputs] = useState<{id: number; time: string | null}[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const validate = useCallback(async () => {
    const isValid =
      validateFields.every(async field => await trigger(field)) &&
      intakeDays.length !== 0;
    setIsButtonDisabled(!isValid);
  }, [trigger, intakeDays.length, validateFields]);

  useEffect(() => {
    validate();
  }, [intakeDays.length, validate, trigger]);

  const addInputField = useCallback(() => {
    setInputs(prevInputs => [
      ...prevInputs,
      {id: prevInputs.length + 1, time: null},
    ]);
  }, []);

  const handleInputChange = useCallback((text: string, index: number) => {
    setInputs(prevInputs =>
      prevInputs.map((input, i) =>
        i === index ? {...input, time: text} : input,
      ),
    );
  }, []);

  return {
    intakeDays,
    setIntakeDays,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    isButtonDisabled,
  };
}

export function useMedicine() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    trigger,
    getValues,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const {
    intakeDays,
    setIntakeDays,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    isButtonDisabled,
  } = useCommonForm(['medicineName'], trigger);

  const [saveMedicineInfo] = useSaveMedicineInfoMutation();

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
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const {
    intakeDays,
    setIntakeDays,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    isButtonDisabled,
  } = useCommonForm(['productName', 'dosage'], trigger);

  const [saveInsulinIfo] = useSaveInsulinIfoMutation();

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
    addInputField,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
  };
}
