import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormData as MealData} from '../../components/input/types';
import {
  useCreateAIMealInfoMutation,
  useGetFoodDetailInfoQuery,
  useGetPredictInfoMutation,
} from '../../services/food/foodApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';

export function useMeal() {
  const [today, setToday] = useState(dayjs()); // 캘린더 날짜 관리

  return {today, setToday};
}

export function useRecording() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const route = useRoute<RouteProp<{params: {photoUri: string}}, 'params'>>();
  const {photoUri} = route.params;

  const {
    control,
    trigger,
    setValue,
    setFocus,
    formState: {errors, touchedFields},
  } = useForm<MealData>({
    mode: 'onBlur',
  });

  const [isUpload, setIsUpload] = useState(false); // 버튼 상태 관리
  const [imageSource, setImageSource] = useState(photoUri); // 이미지 상태 관리
  const [foodNames, setFoodNames] = useState<string[]>([]); // 음식 이름 배열 상태 추가
  const [mealListData, setMealListData] = useState<any[] | undefined>([]); // MealList로 전달될 배열 관리

  // AI 인식
  const [getPredictInfo] = useGetPredictInfoMutation();

  // AI 영양 성분 조회
  const {data: foodDetail, isSuccess: isFoodDetailSuccess} =
    useGetFoodDetailInfoQuery(
      {
        name: foodNames,
      },
      {
        skip: !isUpload || foodNames.length === 0,
      },
    );

  // AI 식사 등록
  const [createAIMealInfo] = useCreateAIMealInfoMutation();

  useEffect(() => {
    if (isFoodDetailSuccess && foodDetail) {
      setMealListData(foodDetail);
    }
  }, [isFoodDetailSuccess, foodDetail]);

  // AI 인식, 영양 성분 조회
  const handleFoodPredict = async () => {
    const formData = new FormData();

    // 로컬 파일 경로에서 파일명과 확장자를 추출
    const fileUri = photoUri;
    const fileName = fileUri.split('/').pop(); // 파일 이름
    const fileType = fileName?.split('.').pop(); // 파일 타입 (예: jpg)

    // FormData에 foodImage 필드로 파일 추가
    formData.append('foodImage', {
      uri: fileUri,
      name: fileName,
      type: `image/${fileType}`, // MIME 타입 설정
    });

    try {
      const response = await getPredictInfo(formData).unwrap();
      setImageSource(response.image_url);
      const extractedFoodNames = response.predictions.map(
        (item: {foodName: string}) => item.foodName,
      );
      setFoodNames(extractedFoodNames);
      setIsUpload(true);
      console.log(response);
      console.log(extractedFoodNames);
    } catch (error) {
      console.error(error);
      Alert.alert('이미지 업로드에 실패했습니다.');
    }
  };

  // 직접 추가하기 버튼
  const handleDirectAdd = useCallback(() => {
    setIsUpload(true);
    setImageSource(photoUri);
    setMealListData([]);
  }, [photoUri]);

  // 음식 추가하기 버튼
  const handleAddMeal = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  // AI 식사 등록
  const handleCreateAIMeal = async () => {
    const data = {
      mealTime: '아침',
    };

    try {
      const response = await createAIMealInfo(data).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
      Alert.alert('식사 등록에 실패했습니다.');
    }
  };

  // 음식 아이템 삭제
  const handleDeleteItem = useCallback((index: number) => {
    setMealListData(prevList => prevList?.filter((_, i) => i !== index));
  }, []);

  return {
    photoUri,
    control,
    errors,
    touchedFields,
    trigger,
    setValue,
    setFocus,
    isUpload,
    imageSource,
    isFoodDetailSuccess,
    mealListData,
    handleFoodPredict,
    handleDirectAdd,
    handleCreateAIMeal,
    handleDeleteItem,
    handleAddMeal,
  };
}
