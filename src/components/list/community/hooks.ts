import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../navigation/types';

export function useCommunityListItem(id: number) {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const handleClickItem = () => {
    navigation.navigate('Detail', {id});
  };

  return {handleClickItem};
}
