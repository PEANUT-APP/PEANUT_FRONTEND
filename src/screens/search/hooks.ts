import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {FormData} from '../../components/input/types';

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

  const handleSearch = useCallback(() => {
    if (searchFood.trim()) {
      Alert.alert('검색어', searchFood);
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood]);

  return {
    setSearchFood,
    handleSearch,
    control,
    trigger,
    setValue,
    setFocus,
    errors,
    touchedFields,
  };
}
