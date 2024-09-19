import {useCallback, useEffect, useState} from 'react';
import {FoodReturnType} from '../../services/mainPage/types';
import {
  useGetFoodAllDetailQuery,
  useGetFoodDetailByEatTimeQuery,
} from '../../services/mainPage/mainPageApi';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import dayjs from 'dayjs';

export const useMealCard = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const today = dayjs(useSelector((state: RootState) => state.today.today));

  const [selectedTime, setSelectedTime] = useState('전체');
  const [foodData, setFoodData] = useState<FoodReturnType | undefined>(
    undefined,
  );

  const {isSuccess: isAllFoodInfoSuccess, refetch: allFoodRefetch} =
    useGetFoodAllDetailQuery({date: today.format('YYYY-MM-DD')});
  const {isSuccess: isFoodByTimeSuccess, refetch: foodByTimeRefetch} =
    useGetFoodDetailByEatTimeQuery({
      date: today.format('YYYY-MM-DD'),
      eatTime: selectedTime,
    });

  useEffect(() => {
    const fetchData = async () => {
      let newFoodData;

      if (selectedTime === '전체' || !selectedTime) {
        const result = await allFoodRefetch();
        newFoodData = result.data;
      } else {
        const result = await foodByTimeRefetch();
        newFoodData = result.data;
      }

      setFoodData(newFoodData);
    };

    fetchData();
  }, [selectedTime, allFoodRefetch, foodByTimeRefetch, today]);

  const {carbohydrate = 0, fat = 0, protein = 0} = foodData || {};
  const total = carbohydrate + fat + protein;
  const prevTotal = carbohydrate + fat;

  // 시간대 변경 핸들러
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  // 기록 화면으로 이동하는 핸들러
  const handleGoToRecord = useCallback(() => {
    navigation.navigate('MealRecord');
  }, [navigation]);

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
