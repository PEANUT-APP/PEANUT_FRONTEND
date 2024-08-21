import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export const useOnBoarding = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = (screen: keyof ParamList) => {
    navigation.navigate(screen);
  };

  return {onPress};
};
