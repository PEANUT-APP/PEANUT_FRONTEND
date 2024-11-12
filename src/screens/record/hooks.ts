import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm, UseFormTrigger} from 'react-hook-form';
import {FormData} from '../../components/input/types';
import {useCallback, useEffect, useState} from 'react';
import {
  useLazyGetMedicineInfoListQuery,
  useSaveMedicineInfoMutation,
  useStopMedicineMutation,
} from '../../services/medicine/medicineApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {
  useLazyGetInsulinInfoListQuery,
  useSaveInsulinIfoMutation,
  useStopInsulinMutation,
} from '../../services/insulin/InsulinApi';
import {handleFormError} from '../../modules/formHandler';
import {useSaveBloodSugarMutation} from '../../services/bloodSugar/bloodSugarApi';
import {InsulinRecordWithOngoing, MedicineRecordWithOngoing} from './types';

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
  const [stopMedicine] = useStopMedicineMutation();

  const [fetchMedicineData, {data: medicineData}] =
    useLazyGetMedicineInfoListQuery();

  const [intakeDays, setIntakeDays] = useState<string[]>([]);
  const [medicineState, setMedicineState] = useState<
    MedicineRecordWithOngoing[]
  >([]);

  useEffect(() => {
    fetchMedicineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicineData]);

  useEffect(() => {
    if (medicineData) {
      const transformedData = medicineData.map(item => ({
        ...item,
        intakeTime: item.intakeTime.join(', '),
        isOngoing: item.activeStatus === '복약 중',
      }));
      setMedicineState(transformedData);
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
  const toggleMedicineState = useCallback(
    async (medicineName: string) => {
      const medicineToUpdate = medicineState.find(
        item => item.medicineName === medicineName,
      );

      if (!medicineToUpdate) {
        return;
      }

      const newActiveStatus =
        medicineToUpdate.activeStatus === '복약 중'
          ? '복약 중단 상태'
          : '복약 중';

      try {
        await stopMedicine({
          activeStatus: medicineToUpdate.activeStatus !== '복약 중',
          medicineId: medicineToUpdate.id,
        }).unwrap();

        setMedicineState(prevState =>
          prevState.map(item =>
            item.medicineName === medicineName
              ? {
                  ...item,
                  activeStatus: newActiveStatus,
                  isOngoing: newActiveStatus === '복약 중',
                }
              : item,
          ),
        );
      } catch (error) {
        console.error(error);
        Alert.alert('복약 상태 변경에 실패했습니다.');
      }
    },
    [medicineState, stopMedicine],
  );

  // 복약 추가하기
  const handleGoAdd = useCallback(() => {
    navigation.navigate('Medicine');
  }, [navigation]);

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
    toggleMedicineState,
    handleGoAdd,
    medicineData: medicineState,
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
  const [stopInsulin] = useStopInsulinMutation();

  const [fetchInsulinData, {data: insulinData}] =
    useLazyGetInsulinInfoListQuery();

  const [insulinState, setInsulinState] = useState<InsulinRecordWithOngoing[]>(
    [],
  );

  useEffect(() => {
    fetchInsulinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insulinData]);

  useEffect(() => {
    if (insulinData) {
      const transformedData = insulinData.map(item => ({
        ...item,
        dosage: `${item.dosage}(U/mL)`, // Dosage 표시 추가
        isOngoing: item.activeStatus === '투약 중',
      }));
      setInsulinState(transformedData);
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
  const toggleInsulinState = useCallback(
    async (productName: string) => {
      const insulinToUpdate = insulinState.find(
        item => item.productName === productName,
      );

      if (!insulinToUpdate) {
        return;
      }

      const newActiveStatus =
        insulinToUpdate.activeStatus === '투약 중'
          ? '투약 중단 상태'
          : '투약 중';

      try {
        await stopInsulin({
          activeStatus: insulinToUpdate.activeStatus !== '투약 중',
          insulinId: insulinToUpdate.id,
        }).unwrap();

        setInsulinState(prevState =>
          prevState.map(item =>
            item.productName === productName
              ? {
                  ...item,
                  activeStatus: newActiveStatus,
                  isOngoing: newActiveStatus === '투약 중',
                }
              : item,
          ),
        );
      } catch (error) {
        console.error(error);
        Alert.alert('상태 변경에 실패했습니다.');
      }
    },
    [insulinState, stopInsulin],
  );

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
    toggleInsulinState,
    handleGoAdd,
    insulinData: insulinState,
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
