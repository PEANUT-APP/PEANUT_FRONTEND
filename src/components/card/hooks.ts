import {useCallback, useEffect, useState} from 'react';
import {FoodReturnType} from '../../services/mainPage/types';
import {
  useGetFoodAllDetailQuery,
  useGetFoodDetailByEatTimeQuery,
  useGetPatientFoodAllDetailQuery,
  useGetPatientFoodDetailByEatTimeQuery,
} from '../../services/mainPage/mainPageApi';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import dayjs from 'dayjs';
import {setTime} from '../../slices/todaySlice';
import {useGetFeedbackFoodDetailByEatTimeQuery} from '../../services/food/foodApi';

export const useMealCard = (size: 's' | 'm', time?: string) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const today = useSelector((state: RootState) => state.today.today);
  const userState = useSelector((state: RootState) => state.user.userState);

  const [selectedTime, setSelectedTime] = useState('전체');
  const [foodData, setFoodData] = useState<FoodReturnType | undefined>(
    undefined,
  );

  // Patient용
  const {isSuccess: isAllFoodInfoSuccess, refetch: allFoodRefetch} =
    useGetFoodAllDetailQuery({date: dayjs(today).format('YYYY-MM-DD')});
  const {isSuccess: isFoodByTimeSuccess, refetch: foodByTimeRefetch} =
    useGetFoodDetailByEatTimeQuery({
      date: dayjs(today).format('YYYY-MM-DD'),
      eatTime: size === 's' && time ? time : selectedTime,
    });
  // Protector 용
  const {
    isSuccess: isPatientAllFoodInfoSuccess,
    refetch: patientAllFoodRefetch,
  } = useGetPatientFoodAllDetailQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
  });
  const {
    isSuccess: isPatientFoodByTimeSuccess,
    refetch: patientFoodByTimeRefetch,
  } = useGetPatientFoodDetailByEatTimeQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
    eatTime: size === 's' && time ? time : selectedTime,
  });
  // feedback 용
  const {
    isSuccess: isFeedbackFoodByTimeSuccess,
    refetch: feedbackFoodByTimeRefetch,
  } = useGetFeedbackFoodDetailByEatTimeQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
    eatTime: size === 's' && time ? time : selectedTime,
  });

  // 데이터를 가져오는 함수
  const fetchData = useCallback(async () => {
    let newFoodData: FoodReturnType | undefined;
    try {
      if (userState === 'Patient') {
        if (size === 's') {
          const result = await feedbackFoodByTimeRefetch();
          newFoodData = {
            fat: result.data?.totalFat || 0,
            carbohydrate: result.data?.carbohydrate || 0,
            protein: result.data?.protein || 0,
          };
        } else {
          if (selectedTime === '전체' || !selectedTime) {
            const result = await allFoodRefetch();
            newFoodData = result.data;
          } else {
            const result = await foodByTimeRefetch();
            newFoodData = result.data;
          }
        }
      } else if (userState === 'Protector') {
        if (size === 'm') {
          if (selectedTime === '전체' || !selectedTime) {
            const result = await patientAllFoodRefetch();
            newFoodData = result.data;
          } else {
            const result = await patientFoodByTimeRefetch();
            newFoodData = result.data;
          }
        }
      }
      setFoodData(newFoodData);
    } catch (error) {
      console.error(error);
    }
  }, [
    allFoodRefetch,
    feedbackFoodByTimeRefetch,
    foodByTimeRefetch,
    patientAllFoodRefetch,
    patientFoodByTimeRefetch,
    selectedTime,
    size,
    userState,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData, today, selectedTime, time]);

  // 시간대 변경 핸들러
  const handleTimeChange = (changedTime: string) => {
    if (size === 'm') {
      setSelectedTime(changedTime);
    }
  };

  // 기록 화면으로 이동하는 핸들러
  const handleGoToRecord = useCallback(() => {
    if (size === 'm' && userState === 'Patient') {
      navigation.navigate('MealRecord');
    }
  }, [navigation, size, userState]);

  const {carbohydrate = 0, fat = 0, protein = 0} = foodData || {};
  const total = carbohydrate + fat + protein;
  const prevTotal = carbohydrate + fat;

  return {
    selectedTime,
    foodData,
    isAllFoodInfoSuccess,
    isFoodByTimeSuccess,
    isPatientAllFoodInfoSuccess,
    isPatientFoodByTimeSuccess,
    isFeedbackFoodByTimeSuccess,
    handleTimeChange,
    handleGoToRecord,
    carbohydrate,
    fat,
    protein,
    total,
    prevTotal,
  };
};

export const useDayMealCard = (time: string) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const dispatch = useDispatch();

  // 식사 기록중 화면으로 이동하는 핸들러
  const handleGoToRecording = useCallback(() => {
    if (time) {
      dispatch(setTime(time));
    }
    navigation.navigate('MealRecording', {photoUri: undefined});
  }, [dispatch, navigation, time]);

  return {handleGoToRecording};
};
