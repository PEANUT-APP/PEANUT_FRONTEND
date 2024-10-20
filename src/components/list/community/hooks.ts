import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../navigation/types';
import {useCallback} from 'react';

export function useCommunityListItem(id: number) {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const handleClickItem = useCallback(() => {
    navigation.navigate('Detail', {id});
  }, [id, navigation]);

  return {handleClickItem};
}
