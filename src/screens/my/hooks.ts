import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useForm} from 'react-hook-form';
import {FormData as InputFormData} from '../../components/input/types';
import {useEffect, useState} from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CameraButtonType} from './types';
import {Alert} from 'react-native';
import {useUpdateUserInfoMutation} from '../../services/user/userApi';
import {handleFormError} from '../../modules/formHandler';

export const useCard = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = (navigate: string) => {
    navigation.navigate(navigate);
  };

  return {onPress};
};

export const useMy = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const handleGoEdit = () => {
    navigation.navigate('MyEdit');
  };

  const handleGoNotice = () => {
    navigation.navigate('MyNotice');
  };

  const handleGoAccount = () => {
    navigation.navigate('MyAccount');
  };

  return {handleGoEdit, handleGoNotice, handleGoAccount};
};

export const useMyEdit = () => {
  const {
    control,
    trigger,
    handleSubmit,
    getValues,
    watch,
    formState: {errors, touchedFields},
  } = useForm<InputFormData>({
    mode: 'onBlur',
  });

  const nicknameWatch = watch('nickname');
  const heightWatch = watch('height');
  const weightWatch = watch('weight');

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const [profileImage, setProfileImage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (profileImage && (nicknameWatch || heightWatch || weightWatch)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [profileImage, nicknameWatch, heightWatch, weightWatch]);

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
        console.log(profileImage);
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
  const [isPatientToggleOn, setIsPatientToggleOn] = useState(false);
  const [isMedicineToggleOn, setIsMedicineToggleOn] = useState(false);
  const [isInsulinToggleOn, setIsInsulinToggleOn] = useState(false);

  return {
    isPatientToggleOn,
    setIsPatientToggleOn,
    isMedicineToggleOn,
    setIsMedicineToggleOn,
    isInsulinToggleOn,
    setIsInsulinToggleOn,
  };
};

export const useMyAccount = () => {
  const {
    control,
    trigger,
    setFocus,
    setValue,
    watch,
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
    if (
      phoneNumberWatch ||
      genderWatch ||
      birthWatch ||
      nameWatch ||
      passwordWatch
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [birthWatch, genderWatch, nameWatch, passwordWatch, phoneNumberWatch]);

  return {
    control,
    trigger,
    errors,
    touchedFields,
    setFocus,
    setValue,
    isButtonDisabled,
  };
};
