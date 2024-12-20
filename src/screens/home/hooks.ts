import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  useGetAdditionalInfoMainPageQuery,
  useGetPatientAdditionalInfoMainPageQuery,
  useGetPatientUserInfoMainPageQuery,
  useGetUserInfoMainPageQuery,
  useSaveGuardianMedicineInsulinStatusMutation,
  useSaveMedicineInsulinStatusMutation,
} from '../../services/mainPage/mainPageApi';
import {BloodSugarItem} from '../../services/mainPage/types';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {resetTime, resetToday} from '../../slices/todaySlice';
import {setUserId, setUserState} from '../../slices/userSlice';
import {useGetPatientInfoQuery} from '../../services/user/userApi';
import {GraphType} from './types';
import {Alert} from 'react-native';
import {MealCardHandles} from '../../components/card/types';

// 시간을 기준으로 데이터 포인트를 매핑하는 함수
function mapBloodSugarToGraph(bloodSugarList: BloodSugarItem[] | []) {
  const graphData: GraphType[] = [];

  // 6시부터 23시까지의 시간대를 모두 미리 null 값으로 초기화
  for (let hour = 6; hour <= 24; hour++) {
    graphData.push({
      time: hour,
      minute: 0,
      value: null,
      key: '',
    });
  }

  // 혈당 데이터를 변환
  bloodSugarList?.forEach(item => {
    const bloodSugarKey = Object.keys(item)[0]; // 혈당 유형
    const bloodSugarRecord = Object.values(item)[0]; // 혈당 데이터 객체
    const bloodSugarValue = parseInt(Object.keys(bloodSugarRecord)[0], 10); // 혈당 값
    const time = moment(
      Object.values(bloodSugarRecord)[0],
      'YYYY-MM-DDTHH:mm:ss.SSSSSS',
    ); // 시간 파싱
    const hour = time.hour(); // 시간 (0시 ~ 23시)
    const minute = time.minute();

    // 만약 6시부터 23시 사이의 값이면 해당하는 시간에 값 할당
    if (hour >= 6 && hour <= 24) {
      graphData[hour - 6].value = bloodSugarValue;
      graphData[hour - 6].minute = minute;
      graphData[hour - 6].key = bloodSugarKey;
    }
  });

  return graphData;
}

export function useMain() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const dispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.user.userState);

  const {data: patientInfo} = useGetPatientInfoQuery();

  const handleMyPagePress = useCallback(() => {
    if (patientInfo) {
      dispatch(setUserState(userState === 'Patient' ? 'Protector' : 'Patient'));
    }
  }, [dispatch, patientInfo, userState]);

  const handleNotifyPress = useCallback(() => {
    navigation.navigate('Notify');
  }, [navigation]);

  const handleGotoSearch = useCallback(() => {
    navigation.navigate('MealSearch', {isAIProcessing: false});
  }, [navigation]);

  return {
    handleMyPagePress,
    handleNotifyPress,
    handleGotoSearch,
  };
}

export function usePatientMain() {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.userState);
  const today = useSelector((state: RootState) => state.today.today);

  const mealCardRef = useRef<MealCardHandles>(null);

  const {
    data: userInfo,
    isSuccess: isUserInfoSuccess,
    isLoading: isUserInfoLoading,
    refetch: userInfoRefetch,
  } = useGetUserInfoMainPageQuery();

  const {
    data: additionalInfo,
    isSuccess: isAdditionalInfoSuccess,
    isLoading: isAdditionalInfoLoading,
    refetch: additionalRefetch,
  } = useGetAdditionalInfoMainPageQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
  });

  const [saveGuardianMedicineInsulinStatus] =
    useSaveGuardianMedicineInsulinStatusMutation();

  const [isCheckedMedicine, setIsCheckedMedicine] = useState(false);
  const [isCheckedInsulin, setIsCheckedInsulin] = useState(false);
  const [bloodSugarList, setBloodSugarList] = useState<GraphType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (mealCardRef.current) {
      mealCardRef.current.refresh(); // MealCard의 refresh 함수를 직접 호출하여 새로고침
    }

    try {
      dispatch(resetToday());
      dispatch(resetTime());
      userInfoRefetch();
      additionalRefetch();
      if (additionalInfo?.bloodSugarList) {
        setBloodSugarList(mapBloodSugarToGraph(additionalInfo.bloodSugarList));
      }

      setIsCheckedInsulin(additionalInfo?.insulinState || false);
      setIsCheckedMedicine(additionalInfo?.medicationState || false);
    } catch (error) {
      console.error('데이터 새로 고치는 중 오류 발생', error);
    } finally {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalRefetch, dispatch, userInfoRefetch]);

  useEffect(() => {
    dispatch(setUserId(userInfo?.userId));
    dispatch(setUserState('Patient'));
    onRefresh();
  }, [dispatch, onRefresh, userInfo?.userId, userState]);

  useEffect(() => {
    if (additionalInfo?.bloodSugarList) {
      setBloodSugarList(mapBloodSugarToGraph(additionalInfo.bloodSugarList));
    }

    setIsCheckedInsulin(additionalInfo?.insulinState || false);
    setIsCheckedMedicine(additionalInfo?.medicationState || false);
  }, [additionalInfo]);

  const fastingBloodSugar =
    parseInt(userInfo?.fastingBloodSugarLevel || '0', 10) || 0;
  const currentBloodSugar =
    parseInt(userInfo?.currentBloodSugarLevel || '0', 10) || 0;

  const medicineName = useMemo(() => {
    return additionalInfo?.medicineName === '복용 기록 없음' ||
      additionalInfo?.medicineTime === '복용 기록 없음'
      ? '약을 등록해주세요'
      : additionalInfo?.medicineName;
  }, [additionalInfo?.medicineName, additionalInfo?.medicineTime]);

  const insulinName = useMemo(() => {
    return additionalInfo?.insulinName === '투여 기록 없음' ||
      additionalInfo?.insulinTime === '투여 기록 없음'
      ? '인슐린을 등록해주세요'
      : `${additionalInfo?.insulinName} ${additionalInfo?.insulinDosage}`;
  }, [
    additionalInfo?.insulinDosage,
    additionalInfo?.insulinName,
    additionalInfo?.insulinTime,
  ]);

  const medicineTime = useMemo(() => {
    if (
      additionalInfo?.medicineTime === '복용 기록 없음' ||
      !additionalInfo?.medicineTime
    ) {
      return '';
    } else {
      return `${additionalInfo?.medicineTime} 지금은`;
    }
  }, [additionalInfo?.medicineTime]);

  const insulinTime = useMemo(() => {
    if (
      additionalInfo?.insulinTime === '투여 기록 없음' ||
      !additionalInfo?.insulinTime
    ) {
      return '';
    } else {
      return `${additionalInfo?.insulinTime} 지금은`;
    }
  }, [additionalInfo?.insulinTime]);

  const checkMedicine = useCallback(async () => {
    if (!isCheckedMedicine) {
      try {
        await saveGuardianMedicineInsulinStatus({
          date: dayjs(today).format('YYYY-MM-DD'),
          insulinStatus: isCheckedInsulin,
          medicineStatus: true,
        }).unwrap();
        setIsCheckedMedicine(true);
        additionalRefetch();
      } catch (error) {
        console.error(error);
        Alert.alert('복약 상태 저장에 실패했습니다!');
      }
    }
  }, [
    additionalRefetch,
    isCheckedInsulin,
    isCheckedMedicine,
    saveGuardianMedicineInsulinStatus,
    today,
  ]);

  const checkInsulin = useCallback(async () => {
    if (!isCheckedInsulin) {
      try {
        await saveGuardianMedicineInsulinStatus({
          date: dayjs(today).format('YYYY-MM-DD'),
          insulinStatus: true,
          medicineStatus: isCheckedMedicine,
        }).unwrap();
        setIsCheckedInsulin(true);
        additionalRefetch();
      } catch (error) {
        console.error(error);
        Alert.alert('인슐린 상태 저장에 실패했습니다!');
      }
    }
  }, [
    additionalRefetch,
    isCheckedInsulin,
    isCheckedMedicine,
    saveGuardianMedicineInsulinStatus,
    today,
  ]);

  return {
    fastingBloodSugar,
    currentBloodSugar,
    userName: userInfo?.userName,
    isUserInfoSuccess,
    additionalInfo,
    bloodSugarList,
    medicineName,
    insulinName,
    medicineTime,
    insulinTime,
    isCheckedMedicine,
    isCheckedInsulin,
    checkMedicine,
    checkInsulin,
    isAdditionalInfoSuccess,
    isUserInfoLoading,
    isAdditionalInfoLoading,
    refreshing,
    onRefresh,
    mealCardRef,
  };
}

export function useProtectorMain() {
  const userState = useSelector((state: RootState) => state.user.userState);
  const dispatch = useDispatch();
  const today = useSelector((state: RootState) => state.today.today);

  const mealCardRef = useRef<MealCardHandles>(null);

  const {
    data: patientInfo,
    isSuccess: isPatientInfoSuccess,
    isLoading: isPatientInfoLoading,
    refetch: patientInfoRefetch,
  } = useGetPatientUserInfoMainPageQuery();
  const {
    data: patientAdditionalInfo,
    isSuccess: isPatientAdditionalInfoSuccess,
    isLoading: isPatientAdditionalInfoLoading,
    refetch: patientAdditionalRefetch,
  } = useGetPatientAdditionalInfoMainPageQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
  });

  console.log(patientAdditionalInfo);

  const [saveMedicineInsulinStatus] = useSaveMedicineInsulinStatusMutation();

  const [isPushedMedicine, setIsPushedMedicine] = useState(false);
  const [isPushedInsulin, setIsPushedInsulin] = useState(false);
  const [bloodSugarList, setBloodSugarList] = useState<GraphType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (mealCardRef.current) {
      mealCardRef.current.refresh(); // MealCard의 refresh 함수를 직접 호출하여 새로고침
    }

    try {
      dispatch(resetToday());
      dispatch(resetTime());
      patientInfoRefetch();
      patientAdditionalRefetch();
      if (patientAdditionalInfo?.bloodSugarList) {
        setBloodSugarList(
          mapBloodSugarToGraph(patientAdditionalInfo.bloodSugarList),
        );
      }
      if (patientAdditionalInfo?.medicineName === '약 정보 없음') {
        setIsPushedMedicine(true);
      } else {
        setIsPushedInsulin(patientAdditionalInfo?.insulinState || false);
      }
      if (patientAdditionalInfo?.insulinName === '인슐린 정보 없음') {
        setIsPushedInsulin(true);
      } else {
        setIsPushedMedicine(patientAdditionalInfo?.medicationState || false);
      }
    } catch (error) {
      console.error('데이터 새로 고치는 중 오류 발생', error);
    } finally {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, patientAdditionalRefetch, patientInfoRefetch]);

  useEffect(() => {
    dispatch(setUserState('Protector'));
    onRefresh();
  }, [dispatch, onRefresh, userState]);

  useEffect(() => {
    if (patientAdditionalInfo?.bloodSugarList) {
      setBloodSugarList(
        mapBloodSugarToGraph(patientAdditionalInfo.bloodSugarList),
      );
    }
    if (patientAdditionalInfo?.medicineTime === '복용 기록 없음') {
      setIsPushedMedicine(true);
    } else {
      setIsPushedInsulin(patientAdditionalInfo?.insulinState || false);
    }
    if (patientAdditionalInfo?.insulinTime === '투여 기록 없음') {
      setIsPushedInsulin(true);
    } else {
      setIsPushedMedicine(patientAdditionalInfo?.medicationState || false);
    }
  }, [patientAdditionalInfo]);

  const fastingBloodSugar =
    parseInt(patientInfo?.fastingBloodSugarLevel || '0', 10) || 0;
  const currentBloodSugar =
    parseInt(patientInfo?.currentBloodSugarLevel || '0', 10) || 0;

  const medicineName = useMemo(() => {
    return patientAdditionalInfo?.medicineName === '약 정보 없음'
      ? '약 정보가 없어요'
      : patientAdditionalInfo?.medicineName;
  }, [patientAdditionalInfo?.medicineName]);

  const insulinName = useMemo(() => {
    return patientAdditionalInfo?.insulinName === '인슐린 정보 없음'
      ? '인슐린 정보가 없어요'
      : `${patientAdditionalInfo?.insulinName} ${patientAdditionalInfo?.insulinDosage} U/mL`;
  }, [
    patientAdditionalInfo?.insulinDosage,
    patientAdditionalInfo?.insulinName,
  ]);

  const pushMedicine = useCallback(async () => {
    if (!isPushedMedicine) {
      try {
        const response = await saveMedicineInsulinStatus({
          date: dayjs(today).format('YYYY-MM-DD'),
          insulinStatus: isPushedInsulin,
          medicineStatus: true,
        }).unwrap();
        console.log(response);
        setIsPushedMedicine(true);
        patientAdditionalRefetch();
      } catch (error) {
        console.error(error);
        Alert.alert('복약 상태 저장에 실패했습니다!');
      }
    }
  }, [
    isPushedInsulin,
    isPushedMedicine,
    patientAdditionalRefetch,
    saveMedicineInsulinStatus,
    today,
  ]);

  const pushInsulin = useCallback(async () => {
    if (!isPushedInsulin) {
      try {
        await saveMedicineInsulinStatus({
          date: dayjs(today).format('YYYY-MM-DD'),
          insulinStatus: true,
          medicineStatus: isPushedMedicine,
        }).unwrap();
        setIsPushedInsulin(true);
        patientAdditionalRefetch();
      } catch (error) {
        console.error(error);
        Alert.alert('인슐린 상태 저장에 실패했습니다!');
      }
    }
  }, [
    isPushedInsulin,
    isPushedMedicine,
    patientAdditionalRefetch,
    saveMedicineInsulinStatus,
    today,
  ]);

  return {
    fastingBloodSugar,
    currentBloodSugar,
    patientName: patientInfo?.userName,
    isPatientInfoSuccess,
    bloodSugarList,
    medicineName,
    insulinName,
    isPushedMedicine,
    isPushedInsulin,
    pushMedicine,
    pushInsulin,
    isPatientAdditionalInfoSuccess,
    isPatientInfoLoading,
    isPatientAdditionalInfoLoading,
    refreshing,
    onRefresh,
    mealCardRef,
  };
}
