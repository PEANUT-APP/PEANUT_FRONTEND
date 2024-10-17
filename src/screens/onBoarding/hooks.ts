import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {loginWithKakaoAccount} from '@react-native-seoul/kakao-login';
import {Alert} from 'react-native';

export const useOnBoarding = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleKakaoLogin = async () => {
    try {
      const result = await loginWithKakaoAccount();
      if (result) {
        console.log(result.accessToken);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('로그인실패', '카카오 로그인을 실패했습니다.');
    }
  };

  return {onPress, handleKakaoLogin};
};
