import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm, UseFormTrigger} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {useCallback, useEffect, useState} from 'react';
import {
  useLazyGetMedicineInfoListQuery,
  useSaveMedicineInfoMutation,
} from '../../services/medicine/medicineApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {
  useLazyGetInsulinInfoListQuery,
  useSaveInsulinIfoMutation,
} from '../../services/insulin/InsulinApi';
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

  const [fetchMedicineData, {data: medicineData}] =
    useLazyGetMedicineInfoListQuery();

  const [intakeDays, setIntakeDays] = useState<string[]>([]);
  const [medicineState, setMedicineState] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    fetchMedicineData();
    console.log(medicineData);
  }, [fetchMedicineData, medicineData]);

  useEffect(() => {
    if (medicineData) {
      const initialMedicineState: Record<string, boolean> = {};

      medicineData.map(item => {
        initialMedicineState[item.medicineName] = true; // true: 복약 중, false: 복약 중단
      });

      setMedicineState(initialMedicineState);
    }
  }, [medicineData]);

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
      fetchMedicineData();
      navigation.navigate('MedicineDocument');
    } catch (error) {
      console.error(error);
      Alert.alert('복약 추가에 실패했습니다.');
    }
  };

  const handleSubmit = handleFormSubmit(handleMedicineSubmit, handleFormError);

  // 복약 상태 토글 함수
  const toggleMedicineState = useCallback((name: string) => {
    setMedicineState(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  }, []);

  // 복약 추가하기
  const handleGoAdd = useCallback(() => {
    navigation.navigate('Medicine');
  }, [navigation]);

  const transformedData = medicineData?.map(item => ({
    ...item,
    intakeTime: item.intakeTime.join(', '),
  }));

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
    medicineState,
    toggleMedicineState,
    handleGoAdd,
    transformedData,
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

  const [fetchInsulinData, {data: insulinData}] =
    useLazyGetInsulinInfoListQuery();

  const [insulinState, setInsulinState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchInsulinData();
    console.log('인슐린', insulinData);
  }, [fetchInsulinData, insulinData]);

  useEffect(() => {
    if (insulinData) {
      const initialInsulinState: Record<string, boolean> = {};

      insulinData.map(item => {
        initialInsulinState[item.productName] = true;
      });

      setInsulinState(initialInsulinState);
    }
  }, [insulinData]);

  const handleInsulinSubmit = async () => {
    const data = {
      alarm: isToggleOn,
      administrationTime: intakeTime,
      dosage: getValues('dosage') || '',
      productName: getValues('productName') || '',
    };

    try {
      await saveInsulinIfo(data).unwrap();
      navigation.navigate('InsulinDocument');
    } catch (error) {
      console.error(error);
      Alert.alert('복약 추가에 실패했습니다.');
    }
  };

  const handleSubmit = handleFormSubmit(handleInsulinSubmit, handleFormError);

  // 인슐린 상태 토글 함수
  const toggleInsulinState = useCallback((name: string) => {
    setInsulinState(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  }, []);

  // 인슐린 추가하기
  const handleGoAdd = useCallback(() => {
    navigation.navigate('Insulin');
  }, [navigation]);

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
    insulinState,
    toggleInsulinState,
    handleGoAdd,
    insulinData,
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
  const bloodSugarTime = watch('bloodSugarTime');

  const [input, setInput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      !(bloodSugar && measurementCondition && bloodSugarTime),
    );
  }, [bloodSugar, measurementCondition, bloodSugarTime]);

  const handleInputChange = useCallback((text: string) => {
    setInput(text);
  }, []);

  const handleBloodSugarSubmit = async () => {
    const data = {
      bloodSugarLevel: getValues('bloodSugar'),
      measurementCondition: getValues('measurementCondition'),
      measurementTime: getValues('bloodSugarTime'),
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
