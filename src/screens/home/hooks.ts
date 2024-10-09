import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useGetAdditionalInfoMainPageQuery,
  useGetPatientAdditionalInfoMainPageQuery,
  useGetPatientUserInfoMainPageQuery,
  useGetUserInfoMainPageQuery,
} from '../../services/mainPage/mainPageApi';
import {BloodSugarItem} from '../../services/mainPage/types';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {resetToday} from '../../slices/todaySlice';
import {setUserId, setUserState} from '../../slices/userSlice';
import {useGetPatientInfoQuery} from '../../services/user/userApi';

// 시간을 기준으로 데이터 포인트를 매핑하는 함수
function mapBloodSugarToGraph(bloodSugarList: BloodSugarItem[] | undefined) {
  const graphData: {
    time: number;
    minute: number | null;
    value: number | null;
    key: string;
  }[] = [];

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
  const userState = useSelector((state: RootState) => state.user.userState);
  const dispatch = useDispatch();
  const today = useSelector((state: RootState) => state.today.today);

  const [isCheckedMedicine, setIsCheckedMedicine] = useState(false);
  const [isCheckedInsulin, setIsCheckedInsulin] = useState(false);
  const [bloodSugarList, setBloodSugarList] = useState<
    {
      time: number;
      minute: number | null;
      value: number | null;
      key: string;
    }[]
  >([]);

  const {
    data: userInfo,
    isSuccess: isUserInfoSuccess,
    refetch: userInfoRefetch,
  } = useGetUserInfoMainPageQuery();
  const {
    data: additionalInfo,
    isSuccess: isAdditionalInfoSuccess,
    refetch: additionalRefetch,
  } = useGetAdditionalInfoMainPageQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
  });

  useEffect(() => {
    dispatch(resetToday());
    dispatch(setUserState('Patient'));
    dispatch(setUserId(userInfo?.userId));
    userInfoRefetch();
    additionalRefetch();
  }, [
    additionalRefetch,
    dispatch,
    userInfo?.userId,
    userInfoRefetch,
    userState,
  ]);

  useEffect(() => {
    setIsCheckedInsulin(additionalInfo?.insulinState || false);
    setIsCheckedMedicine(additionalInfo?.medicineState || false);
  }, [additionalInfo?.insulinState, additionalInfo?.medicineState]);

  useEffect(() => {
    if (additionalInfo?.bloodSugarList) {
      const updatedBloodSugarList = mapBloodSugarToGraph(
        additionalInfo.bloodSugarList,
      );
      setBloodSugarList(updatedBloodSugarList);
    }
  }, [additionalInfo?.bloodSugarList]);

  const fastingBloodSugar =
    parseInt(userInfo?.fastingBloodSugarLevel || '0', 10) || 0;
  const currentBloodSugar =
    parseInt(userInfo?.currentBloodSugarLevel || '0', 10) || 0;

  const medicineName = useMemo(() => {
    return additionalInfo?.medicineName === '복용 기록 없음'
      ? '약을 등록해주세요'
      : additionalInfo?.medicineName;
  }, [additionalInfo?.medicineName]);

  const insulinName = useMemo(() => {
    return additionalInfo?.insulinName === '투여 기록 없음'
      ? '인슐린을 등록해주세요'
      : additionalInfo?.insulinName;
  }, [additionalInfo?.insulinName]);

  const medicineTime = useMemo(() => {
    if (
      additionalInfo?.medicineTime === '투여 기록 없음' ||
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

  const toggleChecked = useCallback(
    (type: string) => {
      if (type === 'medicine' && !isCheckedMedicine) {
        setIsCheckedMedicine(true);
      }
      if (type === 'insulin' && !isCheckedInsulin) {
        setIsCheckedInsulin(true);
      }
    },
    [isCheckedInsulin, isCheckedMedicine],
  );

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
    toggleMedicine: () => toggleChecked('medicine'),
    toggleInsulin: () => toggleChecked('insulin'),
    isAdditionalInfoSuccess,
  };
}

export function useProtectorMain() {
  const userState = useSelector((state: RootState) => state.user.userState);
  const dispatch = useDispatch();
  const today = useSelector((state: RootState) => state.today.today);

  const [isPushedMedicine, setIsPushedMedicine] = useState(false);
  const [isPushedInsulin, setIsPushedInsulin] = useState(false);
  const [bloodSugarList, setBloodSugarList] = useState<
    {
      time: number;
      minute: number | null;
      value: number | null;
      key: string;
    }[]
  >([]);

  const {
    data: patientInfo,
    isSuccess: isPatientInfoSuccess,
    refetch: patientInfoRefetch,
  } = useGetPatientUserInfoMainPageQuery();
  const {
    data: patientAdditionalInfo,
    isSuccess: isPatientAdditionalInfoSuccess,
    refetch: patientAdditionalRefetch,
  } = useGetPatientAdditionalInfoMainPageQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
  });

  useEffect(() => {
    dispatch(resetToday());
    dispatch(setUserState('Protector'));
    patientInfoRefetch();
    patientAdditionalRefetch();
  }, [patientAdditionalRefetch, dispatch, userState, patientInfoRefetch]);

  useEffect(() => {
    setIsPushedInsulin(patientAdditionalInfo?.insulinAlam || false);
    setIsPushedMedicine(patientAdditionalInfo?.medicationAlam || false);
  }, [
    patientAdditionalInfo?.insulinAlam,
    patientAdditionalInfo?.medicationAlam,
  ]);

  useEffect(() => {
    if (patientAdditionalInfo?.bloodSugarList) {
      const updatedBloodSugarList = mapBloodSugarToGraph(
        patientAdditionalInfo.bloodSugarList,
      );
      setBloodSugarList(updatedBloodSugarList);
    }
  }, [patientAdditionalInfo?.bloodSugarList]);

  useEffect(() => {
    if (patientAdditionalInfo?.medicineName === '복용 기록 없음') {
      setIsPushedMedicine(true);
    }
    if (patientAdditionalInfo?.insulinName === '투여 기록 없음') {
      setIsPushedInsulin(true);
    }
  }, [patientAdditionalInfo?.insulinName, patientAdditionalInfo?.medicineName]);

  const fastingBloodSugar =
    parseInt(patientInfo?.fastingBloodSugarLevel || '0', 10) || 0;
  const currentBloodSugar =
    parseInt(patientInfo?.currentBloodSugarLevel || '0', 10) || 0;

  const medicineName = useMemo(() => {
    return patientAdditionalInfo?.medicineName === '복용 기록 없음'
      ? '약의 정보가 없어요'
      : patientAdditionalInfo?.medicineName;
  }, [patientAdditionalInfo?.medicineName]);

  const insulinName = useMemo(() => {
    return patientAdditionalInfo?.insulinName === '투여 기록 없음'
      ? '인슐린의 정보가 없어요'
      : patientAdditionalInfo?.insulinName;
  }, [patientAdditionalInfo?.insulinName]);

  const handlePush = useCallback(
    (type: string) => {
      if (type === 'medicine' && !isPushedMedicine) {
        setIsPushedMedicine(true);
      }
      if (type === 'insulin' && !isPushedInsulin) {
        setIsPushedInsulin(true);
      }
    },
    [isPushedInsulin, isPushedMedicine],
  );

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
    pushMedicine: () => handlePush('medicine'),
    pushInsulin: () => handlePush('insulin'),
    isPatientAdditionalInfoSuccess,
  };
}
