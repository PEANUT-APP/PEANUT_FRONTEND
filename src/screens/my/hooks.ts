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
  useGetUserInfoMyPageQuery,
  useLazyGetCommentAllCommunityByUserQuery,
  useLazyGetCreateCommunityByUserQuery,
  useLazyGetLikeCommunityByUserQuery,
  useUpdateUserInfoMutation,
  useUserAlamInfoMutation,
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

  const {data: userInfo, isSuccess: isUserInfoSuccess} =
    useGetUserInfoMyPageQuery();
  const {data: patientInfo, isSuccess: isPatientSuccess} =
    useGetPatientInfoQuery();
  const {data: connectingInfo, isSuccess: isConnectingSuccess} =
    useGetConnectingInfoQuery();

  const [isGuardianConnected, setIsGuardianConnected] =
    useState<boolean>(false);

  useEffect(() => {
    if (isConnectingSuccess && connectingInfo.length !== 0) {
      setIsGuardianConnected(connectingInfo[0].status === '대기중');
    }
  }, [connectingInfo, isConnectingSuccess, isGuardianConnected]);

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

  const [updateUserInfo] = useUpdateUserInfoMutation();

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
      profileImage !== '' ||
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
      await updateUserInfo({
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
  const [userAlamInfo] = useUserAlamInfoMutation();

  const [isPatientToggleOn, setIsPatientToggleOn] = useState(false);
  const [isMedicineToggleOn, setIsMedicineToggleOn] = useState(false);
  const [isInsulinToggleOn, setIsInsulinToggleOn] = useState(false);

  const handleEditNotice = async (type: string, newToggleState: boolean) => {
    try {
      await userAlamInfo({
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
    formState: {errors, touchedFields},
  } = useForm<InputFormData>({
    mode: 'onBlur',
  });

  const phoneNumberWatch = watch('phoneNumber');
  const genderWatch = watch('gender');
  const birthWatch = watch('birth');
  const nameWatch = watch('name');
  const passwordWatch = watch('password');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(
      !(
        phoneNumberWatch ||
        genderWatch ||
        birthWatch ||
        nameWatch ||
        passwordWatch
      ),
    );
  }, [birthWatch, genderWatch, nameWatch, passwordWatch, phoneNumberWatch]);

  const handleUpdate = (data: InputFormData) => {
    console.log(data);
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
