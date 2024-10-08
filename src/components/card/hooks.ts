import {useCallback, useEffect, useState} from 'react';
import {FoodReturnType} from '../../services/mainPage/types';
import {
  useGetFoodAllDetailQuery,
  useGetFoodDetailByEatTimeQuery,
} from '../../services/mainPage/mainPageApi';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import dayjs from 'dayjs';
import {setTime} from '../../slices/todaySlice';

export const useMealCard = (size: 's' | 'm', time?: string) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const today = useSelector((state: RootState) => state.today.today);

  const [selectedTime, setSelectedTime] = useState('전체');
  const [foodData, setFoodData] = useState<FoodReturnType | undefined>(
    undefined,
  );

  const {isSuccess: isAllFoodInfoSuccess, refetch: allFoodRefetch} =
    useGetFoodAllDetailQuery({date: dayjs(today).format('YYYY-MM-DD')});
  const {isSuccess: isFoodByTimeSuccess, refetch: foodByTimeRefetch} =
    useGetFoodDetailByEatTimeQuery({
      date: dayjs(today).format('YYYY-MM-DD'),
      eatTime: size === 's' && time ? time : selectedTime,
    });

  useEffect(() => {
    const fetchData = async () => {
      let newFoodData;

      if (size === 's') {
        if (time === '전체') {
          const result = await allFoodRefetch();
          newFoodData = result.data;
        } else {
          const result = await foodByTimeRefetch();
          newFoodData = result.data;
        }
      } else {
        if (selectedTime === '전체' || !selectedTime) {
          const result = await allFoodRefetch();
          newFoodData = result.data;
        } else {
          const result = await foodByTimeRefetch();
          newFoodData = result.data;
        }
      }

      setFoodData(newFoodData);
    };

    fetchData();
  }, [allFoodRefetch, foodByTimeRefetch, selectedTime, size, time, today]);

  const {carbohydrate = 0, fat = 0, protein = 0} = foodData || {};
  const total = carbohydrate + fat + protein;
  const prevTotal = carbohydrate + fat;

  // 시간대 변경 핸들러
  const handleTimeChange = (changedTime: string) => {
    if (size === 'm') {
      setSelectedTime(changedTime);
    }
  };

  // 기록 화면으로 이동하는 핸들러
  const handleGoToRecord = useCallback(() => {
    if (size === 'm') {
      navigation.navigate('MealFeedback');
    }
  }, [navigation, size]);

  return {
    selectedTime,
    foodData,
    isAllFoodInfoSuccess,
    isFoodByTimeSuccess,
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
