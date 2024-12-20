import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useForm} from 'react-hook-form';
import {FormData as InputFormData} from '../../components/input/types';
import {useCallback, useEffect, useState} from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CameraButtonType} from './types';
import {Alert} from 'react-native';
import {
  useGetConnectingInfoQuery,
  useGetPatientInfoQuery,
  useGetUpdateUserInfoQuery,
  useGetUserAlamInfoQuery,
  useGetUserInfoMyPageQuery,
  useLazyGetCommentAllCommunityByUserQuery,
  useLazyGetCreateCommunityByUserQuery,
  useLazyGetLikeCommunityByUserQuery,
  useSaveUserAlamInfoMutation,
  useUpdateUserAddInfoMutation,
  useUpdateUserInfoMutation,
} from '../../services/user/userApi';
import {handleFormError} from '../../modules/formHandler';
import {MyCommunityReturnType} from '../../services/user/types';

export const useCard = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = useCallback(
    (navigate: string, title?: string) => {
      navigation.navigate(navigate, {title});
    },
    [navigation],
  );

  return {onPress};
};

export const useMy = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    data: userInfo,
    isSuccess: isUserInfoSuccess,
    refetch: userInfoRefetch,
  } = useGetUserInfoMyPageQuery();
  const {
    data: patientInfo,
    isSuccess: isPatientSuccess,
    refetch: patientInfoRetch,
  } = useGetPatientInfoQuery();
  const {
    data: connectingInfo,
    isSuccess: isConnectingSuccess,
    refetch: connectingInfoRetch,
  } = useGetConnectingInfoQuery();

  const [isGuardianConnected, setIsGuardianConnected] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isConnectingSuccess && connectingInfo.length !== 0) {
      setIsGuardianConnected(connectingInfo[0].status === '대기중');
    }
  }, [connectingInfo, isConnectingSuccess, isGuardianConnected]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    try {
      userInfoRefetch();
      patientInfoRetch();
      connectingInfoRetch();
    } catch (error) {
      console.error('데이터 새로 고치는 중 오류 발생', error);
    } finally {
      setRefreshing(false);
    }
  }, [connectingInfoRetch, patientInfoRetch, userInfoRefetch]);

  const handleGoConnectGuardian = useCallback(() => {
    navigation.navigate('GuardianConnect', {
      name: userInfo?.username || '사용자',
    });
  }, [navigation, userInfo?.username]);

  const handleGoEdit = useCallback(() => {
    navigation.navigate('MyEdit');
  }, [navigation]);

  const handleGoNotice = useCallback(() => {
    navigation.navigate('MyNotice');
  }, [navigation]);

  const handleGoAccount = useCallback(() => {
    navigation.navigate('MyAccount');
  }, [navigation]);

  return {
    handleGoConnectGuardian,
    handleGoEdit,
    handleGoNotice,
    handleGoAccount,
    userInfo,
    isUserInfoSuccess,
    patientInfo,
    isPatientSuccess,
    isGuardianConnected,
    refreshing,
    onRefresh,
  };
};

export const useMyEdit = () => {
  const {
    control,
    trigger,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: {errors, touchedFields},
  } = useForm<InputFormData>({
    mode: 'onBlur',
  });

  const nicknameWatch = watch('nickname');
  const heightWatch = watch('height');
  const weightWatch = watch('weight');

  const {data: userInfo, refetch: userInfoRefetch} =
    useGetUserInfoMyPageQuery();

  const [updateUserAddInfo] = useUpdateUserAddInfoMutation();

  const [profileImage, setProfileImage] = useState<string | undefined>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setProfileImage(userInfo.profileUrl);
      setValue('nickname', userInfo.username || '');
      setValue('height', userInfo.height || '');
      setValue('weight', userInfo.weight || '');
    }
  }, [setValue, userInfo]);

  useEffect(() => {
    const hasChanges =
      profileImage !== userInfo?.profileUrl ||
      nicknameWatch !== userInfo?.username ||
      heightWatch !== userInfo?.height ||
      weightWatch !== userInfo?.weight;

    setIsButtonDisabled(!hasChanges);
  }, [profileImage, nicknameWatch, heightWatch, weightWatch, userInfo]);

  const handleProfilePress = async () => {
    const options: CameraButtonType = {
      mediaType: 'photo',
      quality: 0.8,
    };

    try {
      const result = await new Promise<ImagePickerResponse | null>(resolve => {
        launchImageLibrary(options, resolve); // 갤러리 열기
      });

      if (result?.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri || '';
        setProfileImage(selectedImageUri); // 선택한 이미지 URI를 상태에 저장
      } else if (result?.errorCode) {
        console.log(result.errorMessage);
        Alert.alert('이미지 선택 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('이미지 선택 중 오류가 발생했습니다.');
    }
  };

  const handleUpdate = async () => {
    const {nickname, height, weight} = getValues();

    const formData: any = new FormData();

    if (profileImage) {
      const fileName = profileImage.split('/').pop();
      const fileType = fileName?.split('.').pop();

      formData.append('image', {
        uri: profileImage,
        name: fileName,
        type: `image/${fileType}`,
      });
    }
    try {
      await updateUserAddInfo({
        formData,
        nickname,
        height,
        weight,
      }).unwrap();
      userInfoRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    trigger,
    errors,
    touchedFields,
    handleProfilePress,
    profileImage,
    onSubmit: handleSubmit(handleUpdate, handleFormError),
    isButtonDisabled,
  };
};

export const useMyNotice = () => {
  const {data: alarmInfo} = useGetUserAlamInfoQuery();
  const [saveUserAlamInfo] = useSaveUserAlamInfoMutation();

  const [isPatientToggleOn, setIsPatientToggleOn] = useState(false);
  const [isMedicineToggleOn, setIsMedicineToggleOn] = useState(false);
  const [isInsulinToggleOn, setIsInsulinToggleOn] = useState(false);

  useEffect(() => {
    if (alarmInfo) {
      setIsPatientToggleOn(alarmInfo.guardianAlam);
      setIsMedicineToggleOn(alarmInfo.medicationAlam);
      setIsInsulinToggleOn(alarmInfo.insulinAlam);
    }
  }, [alarmInfo]);

  const handleEditNotice = async (type: string, newToggleState: boolean) => {
    try {
      await saveUserAlamInfo({
        guardianAlam: type === 'patient' ? newToggleState : isPatientToggleOn,
        insulinAlam: type === 'insulin' ? newToggleState : isInsulinToggleOn,
        medicationAlam:
          type === 'medicine' ? newToggleState : isMedicineToggleOn,
      }).unwrap();
    } catch (error) {
      console.log(error);
      Alert.alert('알림 업데이트에 실패했습니다!');
    }
  };

  return {
    isPatientToggleOn,
    setIsPatientToggleOn,
    isMedicineToggleOn,
    setIsMedicineToggleOn,
    isInsulinToggleOn,
    setIsInsulinToggleOn,
    handleEditNotice,
  };
};

export const useMyAccount = () => {
  const {
    control,
    trigger,
    setFocus,
    setValue,
    watch,
    handleSubmit,
    getValues,
    formState: {errors, touchedFields},
  } = useForm<InputFormData>({
    mode: 'onBlur',
  });

  const {data: userInfo, refetch: userInfoRefetch} =
    useGetUpdateUserInfoQuery();

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const phoneNumberWatch = watch('phoneNumber');
  const genderWatch = watch('gender');
  const birthWatch = watch('birth');
  const nameWatch = watch('name');
  const passwordWatch = watch('passwordCheck');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setValue('phoneNumber', userInfo.phoneNumber || '');
      setValue('gender', userInfo.gender || '');
      setValue('birth', userInfo.birthday || '');
      setValue('name', userInfo.userName || '');
    }
  }, [setValue, userInfo]);

  useEffect(() => {
    const hasChanges =
      phoneNumberWatch !== userInfo?.phoneNumber ||
      genderWatch !== userInfo?.gender ||
      birthWatch !== userInfo?.birthday ||
      nameWatch !== userInfo?.userName ||
      passwordWatch;

    setIsButtonDisabled(!hasChanges);
  }, [
    birthWatch,
    genderWatch,
    nameWatch,
    phoneNumberWatch,
    passwordWatch,
    userInfo?.phoneNumber,
    userInfo?.gender,
    userInfo?.birthday,
    userInfo?.userName,
  ]);

  const handleUpdate = async () => {
    const {birth, gender, passwordCheck, phoneNumber, name} = getValues();

    try {
      await updateUserInfo({
        birthday: birth,
        gender,
        password: passwordCheck,
        phoneNumber,
        userName: name,
      }).unwrap();
      userInfoRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    trigger,
    errors,
    touchedFields,
    setFocus,
    setValue,
    isButtonDisabled,
    handleSubmit,
    handleUpdate,
    birth: userInfo?.birthday,
    gender: userInfo?.gender,
  };
};

export const useMyCommunity = () => {
  const {params} = useRoute<RouteProp<{params: {title: string}}, 'params'>>();

  const [fetchCreateCommunity, {data: createCommunity}] =
    useLazyGetCreateCommunityByUserQuery();
  const [fetchLikeCommunity, {data: likeCommunity}] =
    useLazyGetLikeCommunityByUserQuery();
  const [fetchCommentCommunity, {data: commentCommunity}] =
    useLazyGetCommentAllCommunityByUserQuery();

  let communityData: MyCommunityReturnType[] = [];

  useEffect(() => {
    if (params.title === '작성한 글') {
      fetchCreateCommunity();
    } else if (params.title === '좋아요한 글') {
      fetchLikeCommunity();
    } else if (params.title === '댓글 단 글') {
      fetchCommentCommunity();
    }
  }, [
    fetchCommentCommunity,
    fetchCreateCommunity,
    fetchLikeCommunity,
    params.title,
  ]);

  if (params.title === '작성한 글') {
    communityData = createCommunity || [];
  } else if (params.title === '좋아요한 글') {
    communityData = likeCommunity || [];
  } else if (params.title === '댓글 단 글') {
    communityData = commentCommunity || [];
  }

  console.log(communityData);
  return {title: params.title, communityData};
};
