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
  useUpdateCommunityMutation,
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
    navigation.navigate('Write', {});
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

  const route =
    useRoute<
      RouteProp<
        {params: {id: number; editTitle: string; editContent: string}},
        'params'
      >
    >();
  const {id, editTitle, editContent} = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [createCommunity] = useCreateCommunityMutation();
  const [updateCommunity] = useUpdateCommunityMutation();

  useEffect(() => {
    if (editTitle && editContent) {
      setIsButtonDisabled(title === editTitle && content === editContent);
    } else {
      setIsButtonDisabled(!title || !content);
    }
  }, [content, editContent, editTitle, title]);

  useEffect(() => {
    if (editTitle && editContent) {
      setTitle(editTitle);
      setContent(editContent);
    }
  }, [editContent, editTitle]);

  const handleRegister = async () => {
    if (!title || !content) {
      return;
    }

    try {
      if (editTitle && editContent && id) {
        await updateCommunity({
          id,
          title,
          content,
        }).unwrap();
        navigation.push('Detail', {id});
      } else {
        await createCommunity({
          title: title,
          content: content,
        }).unwrap();
        navigation.push('Community');
      }
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      Alert.alert('글 등록에 실패했습니다.');
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    handleRegister,
    isButtonDisabled,
  };
}

export function useDetail(liked?: boolean) {
  const route = useRoute<RouteProp<{params: {id: number}}, 'params'>>();
  const {id} = route.params;

  const {
    data: detailData,
    isSuccess: isDetailSuccess,
    refetch: detailRefetch,
  } = useDetailsCommunityQuery({id});

  const [like] = useLikeMutation();
  const [createComment] = useCreateCommentMutation();

  const [isLike, setIsLike] = useState(liked);
  const [selectedFilter, setSelectedFilter] = useState('좋아요순');
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    try {
      await like({
        communityId: id,
        liked: !isLike,
      }).unwrap();
      setIsLike(!isLike);
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
    isLike,
    handleLike,
    comment,
    setComment,
    handleComment,
  };
}
