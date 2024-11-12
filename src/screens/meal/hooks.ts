import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormData as MealData} from '../../components/input/types';
import {
  useCreateAIMealInfoMutation,
  useGetFeedbackFoodDetailByEatTimeQuery,
  useGetFoodCheckByDateQuery,
  useGetFoodFeedBackBloodSugarInfoQuery,
  useGetPredictInfoMutation,
  useLazyGetFoodNutritionByNameQuery,
  useRemoveFoodFromSessionMutation,
  useSaveNormalMealInfoImageMutation,
  useSaveNormalMealInfoMutation,
} from '../../services/food/foodApi';
import {Alert, BackHandler} from 'react-native';
import {ParamList} from '../../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {AddMealType} from '../search/types';
import {resetToday, setTime} from '../../slices/todaySlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatDate} from '../../modules/commonHooks';
import moment from 'moment';
import {API_URL} from '@env';

export function useMeal() {
  const today = useSelector((state: RootState) => state.today.today);

  // 날짜에 따른 식사 기록 조회
  const {
    data: foodByDate,
    isSuccess: isFoodByDateSuccess,
    refetch: foodByDateRefetch,
  } = useGetFoodCheckByDateQuery({date: dayjs(today).format('YYYY-MM-DD')});

  return {
    foodByDate,
    isFoodByDateSuccess,
    foodByDateRefetch,
  };
}

export function useRecording() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const searchNavigation = useNavigation<StackNavigationProp<ParamList>>();

  const route = useRoute<
    RouteProp<
      {
        params: {
          photoUri: string;
          mealNames: AddMealType[];
        };
      },
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

  const token = useSelector((state: RootState) => state.token.accessToken);

  const [isUpload, setIsUpload] = useState(false); // 버튼 상태 관리
  const [imageSource, setImageSource] = useState<string | null>(photoUri); // 이미지 상태 관리
  const [mealListData, setMealListData] = useState<AddMealType[] | undefined>(
    [],
  ); // MealList로 전달될 배열 관리
  const [isImageSaved, setIsImageSaved] = useState(false); // 이미지 저장 여부 상태
  const [isAIProcessing, setIsAIProcessing] = useState(false);

  // 기본 영양 성분 조회
  const [getFoodNutritionByName] = useLazyGetFoodNutritionByNameQuery();
  // 기본 이미지 등록
  const [saveNormalMealInfoImage] = useSaveNormalMealInfoImageMutation();
  // 기본 식사 등록
  const [saveNormalMealInfo] = useSaveNormalMealInfoMutation();
  // AI 인식
  const [getPredictInfo] = useGetPredictInfoMutation();
  // AI 영양 성분 조회
  /*const {data: foodDetailInfo, refetch: foodDetailInfoRefetch} =
    useGetFoodDetailInfoQuery(undefined, {
      skip: !isUpload || !isAIProcessing, // 조건에 따라 호출을 생략
      refetchOnMountOrArgChange: true,
    });*/
  // AI 식사 등록
  const [createAIMealInfo] = useCreateAIMealInfoMutation();
  // 식사 삭제
  const [removeFoodFromSession] = useRemoveFoodFromSessionMutation();

  // photoUri가 변경되면 imageSource 업데이트
  useEffect(() => {
    if (!isUpload) {
      if (foodByDate?.[mealTime]?.imageUrl) {
        setImageSource(foodByDate?.[mealTime]?.imageUrl);
      } else if (route.params?.photoUri) {
        setImageSource(route.params.photoUri);
      } else {
        setImageSource(null);
      }
    } else {
      setImageSource(imageSource);
    }
  }, [
    foodByDate,
    imageSource,
    isAIProcessing,
    isUpload,
    mealTime,
    route.params.photoUri,
  ]);

  // foodByDate 배열(업로드 전)을 순회하여 각각 API 요청을 보내는 함수
  useEffect(() => {
    const fetchMealDetailsByMealTime = async () => {
      const results: AddMealType[] = [];

      // foodByDate에 해당하는 mealTime의 데이터를 확인
      const mealDataForCurrentTime = foodByDate?.[mealTime];

      // mealTime에 해당하는 foodName이 존재하는 경우
      if (mealDataForCurrentTime) {
        try {
          // getFoodNutritionByName API 호출
          const response = await getFoodNutritionByName({
            name: mealDataForCurrentTime.foodName,
          }).unwrap();
          results.push(...response); // 결과 배열에 추가
          setImageSource(mealDataForCurrentTime.imageUrl);
        } catch (error) {
          console.error(error);
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

  // AI 인식, 영양 성분 조회 (AI로 식사 추가하기 버튼)
  const handleFoodPredict = async () => {
    const formData = createFormData();

    try {
      const response = await getPredictInfo(formData).unwrap();
      setImageSource(response.image_url);
      setIsUpload(true);
      setMealListData([]);
      setIsAIProcessing(true);
    } catch (error) {
      console.error(error);
      Alert.alert('이미지 인식에 실패했습니다.');
    }
  };

  // AI 영양 성분 조회
  /*useEffect(() => {
    const updateMealListData = async () => {
      if (isAIProcessing) {
        if (mealNames) {
          // mealNames가 있으면 그 데이터로 설정
          await foodDetailInfoRefetch();
          foodApi.util.invalidateTags(['AI']);
          setMealListData(foodDetailInfo);
          console.log(foodDetailInfo);
          console.log('음식 추가 후 돌아와서: ', mealNames);
          console.log('음식 추가 후 돌아와서2: ', foodDetailInfo);
        } else {
          // 데이터 리패치하고, 캐시 무효화 후 데이터 설정
          await foodDetailInfoRefetch();
          foodApi.util.invalidateTags(['AI']);
          console.log(foodDetailInfo);
          setMealListData(foodDetailInfo);
        }
        try {
          const response = await fetch(`${API_URL}food/ai/details`, {
            method: 'GET',
            headers: {
              'X-AUTH-TOKEN': token || '',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch food details');
          }

          const data = await response.json(); // 응답을 JSON 형식으로 파싱
          setMealListData(data); // 받은 데이터를 상태에 설정
          console.log(data);
          console.log('음식 추가 후 돌아와서: ', mealNames);
          console.log('음식 추가 후 돌아와서2: ', data);
        } catch (error) {
          console.error('Error fetching food details:', error);
        }
      }
    };

    updateMealListData();
  }, [foodDetailInfo, foodDetailInfoRefetch, isAIProcessing, mealNames, token]);*/

  useFocusEffect(
    useCallback(() => {
      const updateMealListData = async () => {
        if (isAIProcessing) {
          try {
            const response = await fetch(`${API_URL}food/ai/details`, {
              method: 'GET',
              headers: {
                'X-AUTH-TOKEN': token || '',
                'Cache-Control': 'no-store',
                Pragma: 'no-cache',
                Expires: '0',
              },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch food details');
            }

            const data = await response.json(); // 응답을 JSON 형식으로 파싱
            setMealListData(data); // 받은 데이터를 상태에 설정
            console.log(data);
          } catch (error) {
            console.error('Error fetching food details:', error);
          }
        }
      };

      updateMealListData(); // 화면 포커스를 받을 때마다 데이터 업데이트
    }, [isAIProcessing, token]), // 의존성 배열에 필요한 값만 추가
  );

  // 직접 추가하기 버튼 (이미지 업로드)
  const handleDirectAdd = async () => {
    if (photoUri) {
      const formData = createFormData();

      try {
        await saveNormalMealInfoImage(formData).unwrap();
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

  // mealNames 배열(검색을 통해 가져온 데이터)을 순회하여 각각 API 요청을 보내는 함수
  useEffect(() => {
    const fetchMealDetails = async () => {
      const results: AddMealType[] = [];

      // 만약 photoUri가 없는 상태
      if (!photoUri) {
        setIsImageSaved(false); // 이미지가 아직 저장되지 않은 상태로 설정
      }

      // mealNames 배열에서 name 필드만 추출하여 배열로 만듦
      const mealNameArray = mealNames.map(meal => meal.name);

      try {
        const response = await getFoodNutritionByName({
          name: mealNameArray,
        }).unwrap();

        // 응답에 인분 추가
        response.forEach((mealData, index) => {
          results.push({
            ...mealData,
            servingCount: mealNames[index].servingCount,
          });
        });

        console.log('일반식사 조회');
        setMealListData(prevList => [...(prevList || []), ...results]);
      } catch (error) {
        Alert.alert('음식 추가에 실패했습니다!');
        console.error(error);
      }
    };

    if (mealNames && !isAIProcessing) {
      fetchMealDetails();
      setIsUpload(true);
    }
  }, [mealNames, getFoodNutritionByName, photoUri, isAIProcessing]);

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

  // 음식 추가하기 버튼
  const handleAddMeal = useCallback(() => {
    if (isAIProcessing) {
      Alert.alert('아직 준비중입니다!');
    } else {
      searchNavigation.push('MealSearch', {isAIProcessing});
    }
  }, [isAIProcessing, searchNavigation]);

  // AI 식사 등록
  const handleCreateAIMeal = async () => {
    const data = {
      mealTime: mealTime,
    };
    try {
      const response = await createAIMealInfo(data).unwrap();
      navigation.navigate('MealFeedback');
      console.log('ai 식사 등록', response);
    } catch (error) {
      console.error(error);
      Alert.alert('식단 등록에 실패했습니다.');
    }
  };

  // 일반 식사 저장
  const handleCreateNormalMeal = async () => {
    // 이미지가 아직 저장되지 않은 경우, saveNormalMealInfoImage 먼저 실행
    // 이미지 업로드 성공 후 mealListData에서 servingCount 추출
    const servingData = mealListData
      ?.map(meal => meal.servingCount || 1)
      .filter(serving => !isNaN(serving)); // NaN 값 필터링

    if (!isImageSaved && photoUri) {
      const formData = createFormData();
      try {
        await saveNormalMealInfoImage(formData).unwrap();

        await saveNormalMealInfo({
          mealTime: mealTime,
          servingCount: servingData || [],
        }).unwrap();

        navigation.navigate('MealFeedback');
      } catch (error) {
        console.error('Image upload failed:', error);
        Alert.alert('이미지 업로드에 실패했습니다.');
        return;
      }
    } else {
      try {
        const response = await saveNormalMealInfo({
          mealTime: mealTime,
          servingCount: servingData || [],
        }).unwrap();
        console.log(response);
        navigation.navigate('MealFeedback');
      } catch (error) {
        Alert.alert('식단 저장에 실패했습니다!');
        console.log(error);
      }
    }
  };

  // 오늘 식단 등록하기 버튼
  const handleRegisterMeal = () => {
    if (isAIProcessing) {
      handleCreateAIMeal();
    } else {
      handleCreateNormalMeal();
    }
  };

  // 음식 아이템 삭제
  const handleDeleteItem = async (index: number, name: string) => {
    if (isUpload) {
      if (isAIProcessing) {
        try {
          const response = await removeFoodFromSession(name).unwrap();
          setMealListData(prevList => prevList?.filter((_, i) => i !== index));
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        setMealListData(prevList => prevList?.filter((_, i) => i !== index));
      }
    }
  };

  return {
    control,
    errors,
    touchedFields,
    trigger,
    setValue,
    setFocus,
    isUpload,
    imageSource,
    mealListData,
    handleFoodPredict,
    handleDirectAdd,
    handleCreateAIMeal,
    handleDeleteItem,
    handleAddMeal,
    handleRegisterMeal,
  };
}

export function useRecord() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const dispatch = useDispatch();

  const {foodByDate, foodByDateRefetch} = useMeal();

  const foodData = {
    아침: {
      meal: foodByDate?.아침?.foodName.join(', ') || '',
      feedback1: foodByDate?.아침?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.아침?.feedBack.split('. ')[1] || '',
      imageUrl: foodByDate?.아침?.imageUrl || '',
    },
    점심: {
      meal: foodByDate?.점심?.foodName.join(', ') || '',
      feedback1: foodByDate?.점심?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.점심?.feedBack.split('. ')[1] || '',
      imageUrl: foodByDate?.점심?.imageUrl || '',
    },
    저녁: {
      meal: foodByDate?.저녁?.foodName.join(', ') || '',
      feedback1: foodByDate?.저녁?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.저녁?.feedBack.split('. ')[1] || '',
      imageUrl: foodByDate?.저녁?.imageUrl || '',
    },
    간식: {
      meal: foodByDate?.간식?.foodName.join(', ') || '',
      feedback1: foodByDate?.간식?.feedBack.split('. ')[0] || '',
      feedback2: foodByDate?.간식?.feedBack.split('. ')[1] || '',
      imageUrl: foodByDate?.간식?.imageUrl || '',
    },
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    try {
      dispatch(resetToday());
      foodByDateRefetch();
    } catch (error) {
      console.error('데이터 새로 고치는 중 오류 발생', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, foodByDateRefetch]);

  const handleAddMore = () => {
    dispatch(setTime('간식'));
    navigation.navigate('MealRecording', {
      photoUri: undefined,
    });
  };

  return {foodByDate, foodData, handleAddMore, refreshing, onRefresh};
}

export function useFeedback() {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();

  const today = useSelector((state: RootState) => state.today.today);
  const time = useSelector((state: RootState) => state.today.time) as
    | '아침'
    | '점심'
    | '저녁'
    | '간식';

  // 선택된 Chip의 상태를 관리
  const [selectedChip, setSelectedChip] = useState<string>(time || '전체');

  const {
    data: feedbackFoodData,
    isSuccess: isFeedbackFoodByTimeSuccess,
    refetch: feedbackFoodByTimeRefetch,
  } = useGetFeedbackFoodDetailByEatTimeQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
    eatTime: selectedChip,
  });

  const {
    data: feedbackBloodSugarData,
    isSuccess: isFeedbackBloodSugarSuccess,
    refetch: feedbackBloodSugarRefetch,
  } = useGetFoodFeedBackBloodSugarInfoQuery({
    date: dayjs(today).format('YYYY-MM-DD'),
    eatTime: selectedChip,
  });

  console.log(feedbackBloodSugarData, feedbackFoodData);

  useEffect(() => {
    feedbackBloodSugarRefetch();
    feedbackFoodByTimeRefetch();
  }, [selectedChip, feedbackBloodSugarRefetch, feedbackFoodByTimeRefetch]);

  useEffect(() => {
    const handleBackPress = () => {
      // 두 단계 뒤로 가기
      navigation.pop(2);
      return true; // 기본 동작 방지
    };

    // BackHandler에 이벤트 추가
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.pop(2);
  }, [navigation]);

  const handleSelectChip = (chip: string) => {
    setSelectedChip(chip);
  };

  const handleComplete = () => {
    navigation.navigate('MealRecord');
  };

  const formattedToday = formatDate(today);

  const formattedFoodName = useMemo(() => {
    return feedbackFoodData?.foodName?.join(', ') || ''; // 배열이 있으면 쉼표로 연결, 없으면 빈 문자열
  }, [feedbackFoodData]);

  const graphData = useMemo(() => {
    const data = [];
    for (let hour = 6; hour <= 24; hour++) {
      data.push({value: null, time: hour, minute: null, key: ''});
    }

    if (feedbackBloodSugarData?.beforeBloodSugar) {
      const beforeBloodSugar = feedbackBloodSugarData.beforeBloodSugar;
      const bloodSugarValue = Number(Object.keys(beforeBloodSugar)[0]);
      const timestamp = Object.values(beforeBloodSugar)[0];
      const time = moment(timestamp);
      let hour = time.hour();
      const minute = time.minute();

      if (hour >= 1 && hour <= 5) {
        hour = 6;
      }

      if (hour >= 6 && hour <= 24) {
        data[hour - 6] = {
          value: bloodSugarValue,
          time: hour,
          minute: minute,
          key: 'beforeBloodSugar',
        };
      }
    }

    if (feedbackBloodSugarData?.afterBloodSugar) {
      const afterBloodSugar = feedbackBloodSugarData.afterBloodSugar;
      const bloodSugarValue = Number(Object.keys(afterBloodSugar)[0]);
      const timestamp = Object.values(afterBloodSugar)[0];
      const time = moment(timestamp);
      let hour = time.hour();
      const minute = time.minute();

      if (hour >= 1 && hour <= 5) {
        hour = 24;
      }

      if (hour >= 6 && hour <= 24) {
        data[hour - 6] = {
          value: bloodSugarValue,
          time: hour,
          minute: minute,
          key: 'afterBloodSugar',
        };
      }
    }

    return data;
  }, [feedbackBloodSugarData]);

  const handleMealUpdate = () => {
    Alert.alert('아직 준비중입니다!');
  };

  return {
    formattedToday,
    selectedChip,
    handleSelectChip,
    isFeedbackFoodByTimeSuccess,
    formattedFoodName,
    graphData,
    feedbackBloodSugarData,
    isFeedbackBloodSugarSuccess,
    handleComplete,
    handleBack,
    handleMealUpdate,
  };
}
