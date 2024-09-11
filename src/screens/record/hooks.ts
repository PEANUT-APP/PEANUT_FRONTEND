import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm, UseFormTrigger} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {useCallback, useEffect, useState} from 'react';
import {useSaveMedicineInfoMutation} from '../../services/medicine/medicineApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {useSaveInsulinIfoMutation} from '../../services/insulin/insulinApi';
import {handleFormError} from '../../modules/formHandler';
import {useSaveBloodSugarMutation} from '../../services/bloodSugar/bloodSugarApi';

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
  const [intakeTime, setIntakeTime] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [inputs, setInputs] = useState<{id: number; time: string | null}[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const validate = useCallback(async () => {
    const isValid =
      validateFields.every(async field => await trigger(field)) &&
      intakeTime.length !== 0;
    setIsButtonDisabled(!isValid);
  }, [trigger, intakeTime.length, validateFields]);

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

  const handleMedicineSubmit = async () => {
    const data = {
      alarm: isToggleOn,
      intakeDays: intakeTime,
      intakeNumber: intakeTime.length.toString(),
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
  const measurementTime = watch('measurementTime');

  const [input, setInput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(!(bloodSugar && measurementTime));
  }, [bloodSugar, measurementTime]);

  const handleInputChange = useCallback((text: string) => {
    setInput(text);
  }, []);

  const handleBloodSugarSubmit = async () => {
    const data = {
      blood_sugar: getValues('bloodSugar'),
      measurementTime: getValues('measurementTime'),
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
