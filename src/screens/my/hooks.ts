import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export const useCard = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = (navigate: string) => {
    navigation.navigate(navigate);
  };

  return {onPress};
};
