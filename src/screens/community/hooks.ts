import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  useCreateCommunityMutation,
  useGetAllCommunityQuery,
} from '../../services/community/communityApi';
import {ParamList} from '../../navigation/types';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

export function useCommunity() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    data: allCommunityData,
    isSuccess: isAllCommunitySuccess,
    refetch,
  } = useGetAllCommunityQuery();

  useEffect(() => {
    const communityRefetch = navigation.addListener('focus', () => {
      refetch();
    });

    return communityRefetch;
  }, [navigation, refetch]);

  const handleGoWrite = () => {
    navigation.navigate('Write');
  };

  return {allCommunityData, isAllCommunitySuccess, handleGoWrite};
}

export function useWrite() {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createCommunity] = useCreateCommunityMutation();

  const handleCreate = async () => {
    try {
      const response = await createCommunity({
        title: title,
        content: content,
      }).unwrap();
      console.log(response);
      setTitle('');
      setContent('');
      navigation.push('Community');
    } catch (error) {
      console.error(error);
      Alert.alert('글 등록에 실패했습니다.');
    }
  };

  return {title, setTitle, content, setContent, handleCreate};
}
