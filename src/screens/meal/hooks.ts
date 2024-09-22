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
  useGetFoodCheckByDateQuery,
  useGetFoodDetailInfoQuery,
  useGetPredictInfoMutation,
  useLazyGetFoodNutritionByNameQuery,
  useSaveNormalMealInfoImageMutation,
} from '../../services/food/foodApi';
import {Alert} from 'react-native';
import {ParamList} from '../../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {AddMealType} from '../search/types';
import {FoodDetailReturnType} from '../../services/food/types';

export function useMeal() {
  const today = useSelector((state: RootState) => state.today.today);

  // 날짜에 따른 식사 기록 조회
  const {data: foodByDate, isSuccess: isFoodByDateSuccess} =
    useGetFoodCheckByDateQuery({date: dayjs(today).format('YYYY-MM-DD')});

  return {
    foodByDate,
    isFoodByDateSuccess,
  };
}

export function useRecording() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const route =
    useRoute<
      RouteProp<
        {params: {photoUri: string; mealNames: AddMealType[]}},
        'params'
      >
    >();
  const {photoUri, mealNames} = route.params;

  const mealTime = useSelector((state: RootState) => state.today.time) as
    | '아침'
    | '점심'
    | '저녁'
    | '간식';

  const {foodByDate} = useMeal();

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
  const [foodNames, setFoodNames] = useState<string[]>([]); // AI 음식 이름 배열 상태 추가
  const [mealListData, setMealListData] = useState<AddMealType[] | undefined>(
    [],
  ); // MealList로 전달될 배열 관리
  const [isImageSaved, setIsImageSaved] = useState(false); // 이미지 저장 여부 상태

  // 기본 영양 성분 조회
  const [getFoodNutritionByName] = useLazyGetFoodNutritionByNameQuery();
  // 기본 이미지 등록
  const [saveNormalMealInfoImage] = useSaveNormalMealInfoImageMutation();
  // AI 인식
  const [getPredictInfo] = useGetPredictInfoMutation();
  // AI 식사 등록
  const [createAIMealInfo] = useCreateAIMealInfoMutation();

  // AI 영양 성분 조회
  const {data: foodDetail, isSuccess: isFoodDetailSuccess} =
    useGetFoodDetailInfoQuery(
      {
        name: foodNames,
      },
      {
        skip: !isUpload && foodNames.length === 0 && !mealNames,
      },
    );

  // photoUri가 변경되면 imageSource 업데이트
  useEffect(() => {
    if (route.params?.photoUri) {
      setImageSource(route.params.photoUri); // imageSource를 새로운 사진 URI로 업데이트
    }
  }, [route.params.photoUri]); // route.params.photoUri가 변경될 때만 실행

  // foodByDate 배열(업로드 전)을 순회하여 각각 API 요청을 보내는 함수
  useEffect(() => {
    const fetchMealDetailsByMealTime = async () => {
      const results: AddMealType[] = [];

      // foodByDate에 해당하는 mealTime의 데이터를 확인
      const mealDataForCurrentTime = foodByDate?.[mealTime];

      // mealTime에 해당하는 foodName이 존재하는 경우
      if (
        mealDataForCurrentTime &&
        mealDataForCurrentTime.foodName.length > 0
      ) {
        for (const name of mealDataForCurrentTime.foodName) {
          try {
            // getFoodNutritionByName API 호출
            const response = await getFoodNutritionByName({name}).unwrap();
            results.push(response[0]); // 결과 배열에 추가
          } catch (error) {
            console.error(`Failed to fetch details for ${name}:`, error);
          }
        }

        // 모든 API 요청 완료 후 mealListData 업데이트
        setMealListData(results);
      } else {
        setMealListData([]);
      }
    };

    // isUpload가 false일 때만 동작하도록 조건 설정
    if (!isUpload) {
      fetchMealDetailsByMealTime();
    }
  }, [getFoodNutritionByName, foodByDate, mealTime, isUpload]);

  // mealNames 배열(검색을 통해 가져온 데이터)을 순회하여 각각 API 요청을 보내는 함수
  useEffect(() => {
    const fetchMealDetails = async () => {
      const results: AddMealType[] = [];

      // 만약 photoUri가 없는 상태
      if (!photoUri) {
        setIsImageSaved(false); // 이미지가 아직 저장되지 않은 상태로 설정
      }

      // mealNames 배열을 순회하면서 각각의 음식 이름으로 API 요청
      for (const mealName of mealNames) {
        try {
          const response = await getFoodNutritionByName({
            name: mealName.name,
          }).unwrap();

          // API 응답에 인분(servingCount)을 추가하여 결과 배열에 저장
          const mealWithServingCount = {
            ...response[0], // 기존 API 응답 데이터
            servingCount: mealName.servingCount,
          };
          console.log(mealWithServingCount);
          results.push(mealWithServingCount); // 결과 배열에 추가
        } catch (error) {
          console.error(`Failed to fetch details for ${mealName}:`, error);
        }
      }

      // 모든 API 요청 완료 후 mealListData 업데이트
      setMealListData(prevList => [...(prevList || []), ...results]);

      if (photoUri) {
        setIsImageSaved(true);
      }
    };

    if (mealNames) {
      fetchMealDetails(); // mealNames가 있을 때만 요청 시작
      setIsUpload(true);
    }
  }, [mealNames, getFoodNutritionByName, photoUri]);

  // AI 영양 성분 조회 결과 저장 (인분 추가해서)
  useEffect(() => {
    if (isFoodDetailSuccess && foodDetail && !mealNames) {
      const mealDataWithServingCount = foodDetail.map(
        (item: FoodDetailReturnType) => ({
          ...item,
          servingCount: '1', // 인분 추가
        }),
      );
      setMealListData(prevList => [
        ...(prevList || []),
        ...mealDataWithServingCount,
      ]); // AI 조회된 결과를 mealListData에 저장
    }
  }, [isFoodDetailSuccess, foodDetail, mealNames]);

  // 폼 데이터 생성 함수
  const createFormData = () => {
    const formData: any = new FormData();
    const fileUri = photoUri;
    const fileName = fileUri.split('/').pop();
    const fileType = fileName?.split('.').pop();

    formData.append('foodImage', {
      uri: fileUri,
      name: fileName,
      type: `image/${fileType}`,
    });

    return formData;
  };

  // AI 인식, 영양 성분 조회
  const handleFoodPredict = async () => {
    const formData = createFormData();

    try {
      const response = await getPredictInfo(formData).unwrap();
      setImageSource(response.image_url);
      const extractedFoodNames = response.predictions.map(
        (item: {foodName: string}) => item.foodName,
      );
      setFoodNames(extractedFoodNames);
      setIsUpload(true);
    } catch (error) {
      console.error(error);
      Alert.alert('이미지 업로드에 실패했습니다.');
    }
  };

  // 직접 추가하기 버튼 (이미지 업로드)
  const handleDirectAdd = async () => {
    if (photoUri) {
      const formData = createFormData();

      try {
        const response = await saveNormalMealInfoImage(formData).unwrap();
        console.log(response);
        setImageSource(photoUri);
        setIsUpload(true);
        setMealListData([]);
        setIsImageSaved(true);
      } catch (error) {
        console.error(error);
        Alert.alert('이미지 업로드에 실패했습니다.');
      }
    } else {
      Alert.alert('이미지를 업로드해주세요!');
    }
  };

  // 음식 추가하기 버튼
  const handleAddMeal = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  // AI 식사 등록
  const handleCreateAIMeal = async () => {
    const data = {
      mealTime: mealTime,
    };

    try {
      const response = await createAIMealInfo(data).unwrap();
      console.log(response);
      setMealListData([]);
      console.log('ai 식사 저장');
    } catch (error) {
      console.error(error);
      Alert.alert('식사 등록에 실패했습니다.');
    }
  };

  // 일반 식사 저장
  const handleCreateNormalMeal = async () => {
    // 이미지가 아직 저장되지 않은 경우, saveNormalMealInfoImage 먼저 실행
    if (!isImageSaved && photoUri) {
      const formData = createFormData();
      try {
        const response = await saveNormalMealInfoImage(formData).unwrap();
        console.log('Image saved:', response);
        setMealListData([]);
        console.log('일반 식사 저장');
      } catch (error) {
        console.error('Image upload failed:', error);
        Alert.alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }
  };

  // 음식 아이템 삭제
  const handleDeleteItem = useCallback((index: number) => {
    setMealListData(prevList => prevList?.filter((_, i) => i !== index));
  }, []);

  return {
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
    handleCreateNormalMeal,
  };
}

export function useRecord() {
  const {foodByDate} = useMeal();

  const foodData = {
    아침: {
      meal: foodByDate?.아침?.foodName.join(', ') || '',
      feedback1: foodByDate?.아침?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.아침?.feedBack.split('. ')[1] || '',
    },
    점심: {
      meal: foodByDate?.점심?.foodName.join(', ') || '',
      feedback1: foodByDate?.점심?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.점심?.feedBack.split('. ')[1] || '',
    },
    저녁: {
      meal: foodByDate?.저녁?.foodName.join(', ') || '',
      feedback1: foodByDate?.저녁?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.저녁?.feedBack.split('. ')[1] || '',
    },
  };

  return {foodData};
}
