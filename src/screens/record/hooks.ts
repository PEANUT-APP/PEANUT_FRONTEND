import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm, UseFormTrigger} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {useCallback, useEffect, useState} from 'react';
import {useSaveMedicineInfoMutation} from '../../services/medicine/medicineApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {useSaveInsulinIfoMutation} from '../../services/insulin/InsulinApi';
import {handleFormError} from '../../modules/formHandler';
import {useSaveBloodSugarMutation} from '../../services/bloodSugar/bloodSugarApi';

function useCommonForm(
  validateFields: (keyof FormData)[],
  trigger: UseFormTrigger<FormData>,
  intakeDays?: string[],
) {
  const [intakeTime, setIntakeTime] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [inputs, setInputs] = useState<{id: number; time: string | null}[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const validate = useCallback(async () => {
    const isValid =
      validateFields.every(async field => await trigger(field)) &&
      intakeTime.length !== 0 &&
      intakeDays?.length !== 0;
    setIsButtonDisabled(!isValid);
  }, [validateFields, intakeTime.length, intakeDays?.length, trigger]);

  useEffect(() => {
    validate();
  }, [intakeTime.length, validate, trigger]);

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
    intakeTime,
    setIntakeTime,
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
    handleSubmit: handleFormSubmit,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const {
    intakeTime,
    setIntakeTime,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    isButtonDisabled,
  } = useCommonForm(['medicineName'], trigger);

  const [saveMedicineInfo] = useSaveMedicineInfoMutation();

  const [intakeDays, setIntakeDays] = useState<string[]>([]);

  const handleMedicineSubmit = async () => {
    const data = {
      alarm: isToggleOn,
      intakeDays: intakeDays,
      intakeTime: intakeTime,
      // inputs.map(input => input.time || '')
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

  const handleSubmit = handleFormSubmit(handleMedicineSubmit, handleFormError);

  return {
    control,
    errors,
    touchedFields,
    trigger,
    intakeDays,
    setIntakeDays,
    intakeTime,
    setIntakeTime,
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
    handleSubmit: handleFormSubmit,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const {
    intakeTime,
    setIntakeTime,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    isButtonDisabled,
  } = useCommonForm(['productName', 'dosage'], trigger);

  const [saveInsulinIfo] = useSaveInsulinIfoMutation();

  const handleInsulinSubmit = async () => {
    const data = {
      alarm: isToggleOn,
      administrationTime: intakeTime,
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

  const handleSubmit = handleFormSubmit(handleInsulinSubmit, handleFormError);

  return {
    control,
    errors,
    touchedFields,
    trigger,
    intakeTime,
    setIntakeTime,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
  };
}

export function useBloodSugar() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    trigger,
    setValue,
    getValues,
    setFocus,
    watch,
    handleSubmit: handleFormSubmit,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [saveBloodSugar] = useSaveBloodSugarMutation();

  const bloodSugar = watch('bloodSugar');
  const measurementCondition = watch('measurementCondition');

  const [input, setInput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(!(bloodSugar && measurementCondition && input));
  }, [bloodSugar, measurementCondition, input]);

  const handleInputChange = useCallback((text: string) => {
    setInput(text);
  }, []);

  const handleBloodSugarSubmit = async () => {
    const data = {
      bloodSugarLevel: getValues('bloodSugar'),
      measurementCondition: getValues('measurementCondition'),
      measurementTime: input,
      memo: getValues('memo'),
    };

    try {
      await saveBloodSugar(data).unwrap();
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('혈당 기록에 실패했습니다.');
    }
  };

  const handleSubmit = handleFormSubmit(
    handleBloodSugarSubmit,
    handleFormError,
  );

  return {
    control,
    errors,
    touchedFields,
    trigger,
    input,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
    setValue,
    setFocus,
  };
}
