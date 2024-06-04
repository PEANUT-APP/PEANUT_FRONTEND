import {FieldErrors} from 'react-hook-form';
import {Alert} from 'react-native';

export const handleFormSubmit = (navigation: any, navigateTo: string) => {
  Alert.alert('성공', '모든 필드가 유효합니다!');
  navigation.navigate(navigateTo);
};

export const handleFormError = (errs: FieldErrors<FormData>) => {
  const firstError = Object.values(errs)[0];
  Alert.alert('실패', firstError?.message || '알 수 없는 오류가 발생했습니다.');
};
