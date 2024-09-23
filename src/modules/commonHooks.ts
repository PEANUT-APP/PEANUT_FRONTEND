import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

export function useBackHandler() {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {handleBack};
}
