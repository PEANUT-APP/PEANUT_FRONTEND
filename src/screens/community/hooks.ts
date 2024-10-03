import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  useCreateCommentMutation,
  useCreateCommunityMutation,
  useDetailsCommunityQuery,
  useGetAllCommunityQuery,
  useLikeMutation,
} from '../../services/community/communityApi';
import {ParamList} from '../../navigation/types';
import {useEffect, useMemo, useState} from 'react';
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

  const handleGoSearch = () => {
    navigation.navigate('CommunitySearch');
  };

  const handleGoWrite = () => {
    navigation.navigate('Write');
  };

  return {
    allCommunityData,
    isAllCommunitySuccess,
    handleGoSearch,
    handleGoWrite,
  };
}

export function useWrite() {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createCommunity] = useCreateCommunityMutation();

  const handleCreate = async () => {
    if (!title || !content) {
      return;
    }

    try {
      await createCommunity({
        title: title,
        content: content,
      }).unwrap();
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

export function useDetail() {
  const route = useRoute<RouteProp<{params: {id: number}}, 'params'>>();
  const {id} = route.params;

  const {
    data: detailData,
    isSuccess: isDetailSuccess,
    refetch: detailRefetch,
  } = useDetailsCommunityQuery({id: id});

  const [like] = useLikeMutation();
  const [createComment] = useCreateCommentMutation();

  const [liked, setLiked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('좋아요순');
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    try {
      await like({
        communityId: id,
        liked: !liked,
      }).unwrap();
      setLiked(!liked);
      detailRefetch();
    } catch (error) {
      console.error(error);
      Alert.alert('좋아요에 실패했습니다.');
    }
  };

  const handleComment = async () => {
    if (!comment) {
      return;
    }

    try {
      await createComment({
        comment,
        id,
      }).unwrap();
      setComment('');
      detailRefetch();
    } catch (error) {
      console.error(error);
      Alert.alert('댓글 작성에 실패했습니다.');
    }
  };

  const sortedComments = useMemo(() => {
    if (!detailData?.comments) {
      return [];
    }
    return selectedFilter === '최신순'
      ? [...detailData.comments].reverse()
      : detailData.comments;
  }, [detailData, selectedFilter]);

  return {
    detailData,
    isDetailSuccess,
    selectedFilter,
    setSelectedFilter,
    sortedComments,
    liked,
    handleLike,
    comment,
    setComment,
    handleComment,
  };
}
