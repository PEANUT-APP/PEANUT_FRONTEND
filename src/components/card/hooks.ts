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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const {data: allFoodInfo, isSuccess: isAllFoodInfoSuccess} =
    useGetFoodAllDetailQuery({date: today.format('YYYY-MM-DD')});
  const {
    data: foodByTime,
    isSuccess: isFoodByTimeSuccess,
    refetch,
  } = useGetFoodDetailByEatTimeQuery({
    date: today.format('YYYY-MM-DD'),
    eatTime: selectedTime,
  });

  console.log('전체', allFoodInfo);
  console.log(selectedTime, foodByTime);
  //console.log(foodData);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (selectedTime === '전체') {
        setFoodData(allFoodInfo); // 전체 데이터 사용
        setLoading(false);
      } else {
        await refetch();
        setFoodData(foodByTime); // 가져온 데이터 설정
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTime, allFoodInfo, foodByTime, refetch]);

  const {carbohydrate = 0, fat = 0, protein = 0} = foodData || {};
  const total = carbohydrate + fat + protein;
  const prevTotal = carbohydrate + fat;

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
    prevTotal,
  };
};
