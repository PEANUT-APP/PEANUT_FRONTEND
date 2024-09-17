import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormData as MealData} from '../../components/input/types';
import {
  useGetFoodDetailInfoQuery,
  useGetPredictInfoMutation,
} from '../../services/food/foodApi';
import {Alert} from 'react-native';

export const predictions = [
  {
    foodName: '현미밥',
    description: '햇반(210g)',
    giIndex: 20,
  },
  {
    foodName: '소고기 살치살',
    description: '(1인분 150g)',
    giIndex: 50,
  },
  {
    foodName: '고구마',
    description: '(1인분 100g)',
    giIndex: 35,
  },
];

export function useRecording() {
  const navigation = useNavigation();
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

  const [today, setToday] = useState(dayjs()); // 캘린더 날짜 관리
  const [isUpload, setIsUpload] = useState(false); // 버튼 상태 관리
  const [imageSource, setImageSource] = useState(photoUri); // 이미지 상태 관리
  const [foodNames, setFoodNames] = useState<string[]>([]); // 음식 이름 배열 상태 추가
  const [mealListData, setMealListData] = useState<any[] | undefined>([]); // MealList로 전달될 배열 관리

  const [getPredictInfo] = useGetPredictInfoMutation();
  const {data: foodDetail, isSuccess: isFoodDetailSuccess} =
    useGetFoodDetailInfoQuery(
      {
        name: foodNames,
      },
      {
        skip: !isUpload || foodNames.length === 0,
      },
    );

  useEffect(() => {
    if (isFoodDetailSuccess && foodDetail) {
      setMealListData(foodDetail);
    }
  }, [isFoodDetailSuccess, foodDetail]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

  const handleDirectAdd = () => {
    setIsUpload(true);
    setImageSource(photoUri);
    setMealListData([]);
  };

  const handleDeleteItem = (index: number) => {
    setMealListData(prevList => prevList?.filter((_, i) => i !== index));
  };

  return {
    handleBack,
    today,
    setToday,
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
    handleDeleteItem,
  };
}
