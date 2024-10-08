import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';

export function useBackHandler() {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {handleBack};
}

export function useKebab() {
  const [showWriter, setShowWriter] = useState(false);

  const handleClickKebab = () => {
    setShowWriter(prev => !prev);
  };

  return {showWriter, handleClickKebab};
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatDateTime(dateString: string | undefined) {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const period = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 || 12;

  return `${year}.${month}.${day} ${period} ${hours}:${minutes}`;
}
