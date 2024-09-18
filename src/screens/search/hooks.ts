import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {FormData} from '../../components/input/types';
import {useNavigation} from '@react-navigation/native';

export function useSearch() {
  const navigation = useNavigation();

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

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearch = useCallback(() => {
    if (searchFood.trim()) {
      Alert.alert('검색어', searchFood);
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood]);

  return {
    handleBack,
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
