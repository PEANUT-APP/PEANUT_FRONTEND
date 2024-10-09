import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useGetAdditionalInfoMainPageQuery,
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

// 시간을 기준으로 데이터 포인트를 매핑하는 함수
function mapBloodSugarToGraph(bloodSugarList: BloodSugarItem[] | undefined) {
  const graphData: {
    time: number;
    minute: number | null;
    value: number | null;
  }[] = [];

  console.log(bloodSugarList);

  // 6시부터 23시까지의 시간대를 모두 미리 null 값으로 초기화
  for (let hour = 6; hour <= 24; hour++) {
    graphData.push({
      time: hour,
      minute: 0,
      value: null,
    });
  }

  // 혈당 데이터를 변환
  bloodSugarList?.forEach(item => {
    const bloodSugarValue = parseInt(Object.keys(item)[0], 10); // 혈당 값
    const time = moment(Object.values(item)[0], 'YYYY-MM-DDTHH:mm:ss.SSSSSS'); // 시간 파싱
    const hour = time.hour(); // 시간 (0시 ~ 23시)
    const minute = time.minute();

    // 만약 6시부터 23시 사이의 값이면 해당하는 시간에 값 할당
    if (hour >= 6 && hour <= 24) {
      graphData[hour - 6].value = bloodSugarValue;
      graphData[hour - 6].minute = minute;
    }
  });
  console.log(graphData);

  return graphData;
}

export default function useMain() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const dispatch = useDispatch();
  const today = useSelector((state: RootState) => state.today.today);
  const userState = useSelector((state: RootState) => state.user.userState);

  const [isCheckedMedicine, setIsCheckedMedicine] = useState(false);
  const [isCheckedInsulin, setIsCheckedInsulin] = useState(false);
  const [isPushedMedicine, setIsPushedMedicine] = useState(false);
  const [isPushedInsulin, setIsPushedInsulin] = useState(false);

  const {data: userInfo, isSuccess: isUserInfoSuccess} =
    useGetUserInfoMainPageQuery();
  const {
    data: additionalInfo,
    isSuccess: isAdditionalInfoSuccess,
    refetch: additionalRefetch,
  } = useGetAdditionalInfoMainPageQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
  });

  // userInfo의 userId가 있을 때 Redux에 저장
  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(setUserId(userInfo.userId)); // userId를 Redux 상태에 저장
    }
  }, [userInfo, dispatch]);

  // 오늘 날짜로 초기화
  useEffect(() => {
    dispatch(resetToday());
    additionalRefetch();
  }, [additionalRefetch, dispatch]);

  useEffect(() => {
    setIsCheckedInsulin(additionalInfo?.insulinState || false);
    setIsCheckedMedicine(additionalInfo?.medicineState || false);
  }, [additionalInfo?.insulinState, additionalInfo?.medicineState]);

  useEffect(() => {
    setIsPushedInsulin(additionalInfo?.insulinState || false);
    setIsPushedMedicine(additionalInfo?.medicineState || false);
  }, [additionalInfo?.insulinState, additionalInfo?.medicineState]);

  const fastingBloodSugar =
    parseInt(userInfo?.fastingBloodSugarLevel || '0', 10) || 0;
  const currentBloodSugar =
    parseInt(userInfo?.currentBloodSugarLevel || '0', 10) || 0;

  // useMemo로 그래프 데이터를 캐싱
  const bloodSugarList = useMemo(
    () => mapBloodSugarToGraph(additionalInfo?.bloodSugarList),
    [additionalInfo?.bloodSugarList],
  );

  const medicineName = useMemo(() => {
    if (userState === 'Patient') {
      return additionalInfo?.medicineName === '복용 기록 없음'
        ? '약을 등록해주세요'
        : additionalInfo?.medicineName;
    } else {
      return additionalInfo?.medicineName === '복용 기록 없음'
        ? '약의 정보가 없어요'
        : additionalInfo?.medicineName;
    }
  }, [additionalInfo?.medicineName, userState]);

  const insulinName = useMemo(() => {
    if (userState === 'Patient') {
      return additionalInfo?.insulinName === '투여 기록 없음'
        ? '인슐린을 등록해주세요'
        : additionalInfo?.insulinName;
    } else {
      return additionalInfo?.insulinName === '투여 기록 없음'
        ? '인슐린의 정보가 없어요'
        : additionalInfo?.insulinName;
    }
  }, [additionalInfo?.insulinName, userState]);

  // 메모이제이션된 토글 함수
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

  const handleMyPagePress = useCallback(() => {
    dispatch(setUserState(userState === 'Patient' ? 'Protector' : 'Patient'));
  }, [dispatch, userState]);

  const handleNotifyPress = useCallback(() => {
    navigation.navigate('Notify');
  }, [navigation]);

  const handleGotoSearch = useCallback(() => {
    navigation.navigate('MealSearch', {isAIProcessing: false});
  }, [navigation]);

  return {
    currentBloodSugarLevel: currentBloodSugar.toString(),
    fastingBloodSugarLevel: fastingBloodSugar.toString(),
    userName: userInfo?.userName,
    isUserInfoSuccess,
    additionalInfo,
    bloodSugarList,
    medicineName,
    insulinName,
    isAdditionalInfoSuccess,
    additionalRefetch,
    isCheckedMedicine,
    isCheckedInsulin,
    isPushedMedicine,
    isPushedInsulin,
    toggleMedicine: () => toggleChecked('medicine'),
    toggleInsulin: () => toggleChecked('insulin'),
    pushMedicine: () => handlePush('medicine'),
    pushInsulin: () => handlePush('insulin'),
    handleMyPagePress,
    handleNotifyPress,
    handleGotoSearch,
  };
}
