import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {FormData} from '../../components/input/types';
import {useGetFoodNutritionByNameQuery} from '../../services/food/foodApi';

export function useSearch() {
  const {
    control,
    trigger,
    setValue,
    setFocus,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [searchFood, setSearchFood] = useState('');

  const {data: foodByName, isSuccess: isFoodByNameSuccess} =
    useGetFoodNutritionByNameQuery({
      name: searchFood,
    });

  const handleSearch = useCallback(() => {
    if (searchFood.trim()) {
      console.log(foodByName);
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [foodByName, searchFood]);

  return {
    setSearchFood,
    handleSearch,
    control,
    trigger,
    setValue,
    setFocus,
    errors,
    touchedFields,
    foodByName,
    isFoodByNameSuccess,
  };
}
