import {useCallback, useEffect, useState} from 'react';
import {FoodReturnType} from '../../services/mainPage/types';
import {
  useGetFoodAllDetailQuery,
  useGetFoodDetailByEatTimeQuery,
} from '../../services/mainPage/mainPageApi';
import dayjs from 'dayjs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export const useMealCard = (today: dayjs.Dayjs) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [selectedTime, setSelectedTime] = useState('전체');
  const [foodData, setFoodData] = useState<FoodReturnType | undefined>(
    undefined,
  );

  const {data: allFoodInfo, isSuccess: isAllFoodInfoSuccess} =
    useGetFoodAllDetailQuery({date: today.format('YYYY-MM-DD')});
  const {data: foodByTime, isSuccess: isFoodByTimeSuccess} =
    useGetFoodDetailByEatTimeQuery(
      {date: today.format('YYYY-MM-DD'), eatTime: selectedTime},
      {skip: selectedTime === '전체'},
    );

  console.log('전체', allFoodInfo);
  console.log(selectedTime, foodByTime);
  //console.log(foodData);

  useEffect(() => {
    if (selectedTime === '전체') {
      // 전체 선택 시 allFoodInfo 사용
      setFoodData(allFoodInfo);
    } else {
      // 시간대별 선택 시 foodByTime 사용
      setFoodData(foodByTime);
    }
  }, [selectedTime, allFoodInfo, foodByTime]);

  const {carbohydrate = 0, fat = 0, protein = 0} = foodData || {};
  const total = carbohydrate + fat + protein;

  const handleTimeChange = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const handleGoToRecord = () => {
    navigation.navigate('MealRecord');
  };

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
  };
};
