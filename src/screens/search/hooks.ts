import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Animated, Easing} from 'react-native';
import {FormData} from '../../components/input/types';
import {
  useAddCustomFoodMutation,
  useLazyGetFoodDetailInfoQuery,
  useLazyGetFoodNutritionByNameQuery,
} from '../../services/food/foodApi';
import {FoodDetailReturnType} from '../../services/food/types';
import {AddMealType} from './types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export function useSearch() {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();

  const route =
    useRoute<RouteProp<{params: {isAIProcessing: boolean}}, 'params'>>();
  const {isAIProcessing} = route.params;

  const {
    control,
    trigger,
    setValue,
    setFocus,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [searchFood, setSearchFood] = useState('');
  const [selectedItem, setSelectedItem] = useState<FoodDetailReturnType | null>(
    null,
  );
  const [modalAnimation] = useState(new Animated.Value(0)); // 모달 애니메이션 상태
  const [overlayAnimation] = useState(new Animated.Value(0)); // 배경 애니메이션 상태
  const [servingCount, setServingCount] = useState('1'); // 인분 수 관리
  const [addedMeals, setAddedMeals] = useState<AddMealType[]>([]); // 추가된 식단 배열
  const [isFoodSuccess, setIsFoodSuccess] = useState(false); // 검색 성공 여부

  const [triggerSearch, {data: foodByName, isSuccess: isFoodByNameSuccess}] =
    useLazyGetFoodNutritionByNameQuery();
  const [addCustomFood] = useAddCustomFoodMutation();
  const [getFoodDetailInfo] = useLazyGetFoodDetailInfoQuery();

  // 검색어가 변경될 때 검색 결과 초기화
  useEffect(() => {
    if (!searchFood.trim()) {
      setIsFoodSuccess(false); // 검색 성공 여부 초기화
    }
  }, [searchFood]);

  const handleSearch = useCallback(() => {
    const name: string[] = [];
    name.push(searchFood);
    if (searchFood.trim()) {
      triggerSearch({name: name}).then(({data}) => {
        if (data) {
          setIsFoodSuccess(true);
        } else {
          setIsFoodSuccess(false);
        }
      });
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood, triggerSearch]);

  const handleItemPress = (item: FoodDetailReturnType) => {
    setSelectedItem(item); // 선택한 아이템을 저장
    setServingCount((item.servingCount || 1).toString());
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedItem(null);
    });
  };

  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [615, 0],
  });

  const overlayOpacity = overlayAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // 오늘 식단에 추가하기 버튼 클릭 핸들러
  const handleAddMeal = () => {
    if (selectedItem) {
      const newMeal = {
        name: selectedItem.name,
        carbohydrate: selectedItem.carbohydrate,
        cholesterol: selectedItem.cholesterol,
        fat: selectedItem.fat,
        giIndex: selectedItem.giIndex,
        glIndex: selectedItem.glIndex,
        protein: selectedItem.protein,
        foodId: selectedItem.foodId,
        expectedBloodSugar: selectedItem.expectedBloodSugar,
        servingCount: parseInt(servingCount, 10),
      };
      setAddedMeals([...addedMeals, newMeal]); // 새 음식을 추가
      closeModal();
      setServingCount('1');
      console.log(addedMeals);
    }
  };

  // 식단에 기록하기 버튼 클릭 핸들러
  const handleRecordMeal = async () => {
    if (addedMeals.length !== 0) {
      if (isAIProcessing) {
        try {
          for (const meal of addedMeals) {
            const response = await addCustomFood({
              foodName: meal.name,
              servingCount: meal?.servingCount || 1,
            }).unwrap();
            console.log(response);
          }

          // 잠시 대기 후 getFoodDetailInfo 호출
          setTimeout(async () => {
            const foodDetailResponse = await getFoodDetailInfo().unwrap();
            console.log('음식 추가 후 상태: ', foodDetailResponse);

            // navigation으로 이동
            navigation.navigate('MealRecording', {
              mealNames: foodDetailResponse,
            });
          }, 1000); // 1초 대기
        } catch (error) {
          console.log(error);
        }
      } else {
        navigation.navigate('MealRecording', {
          mealNames: addedMeals,
        });
      }
      setAddedMeals([]);
      setSearchFood('');
    } else {
      Alert.alert('음식을 추가해주세요!');
    }
  };

  return {
    setSearchFood,
    handleSearch,
    control,
    trigger,
    setValue,
    setFocus,
    errors,
    touchedFields,
    foodByName,
    isFoodByNameSuccess,
    selectedItem,
    handleItemPress,
    closeModal,
    modalTranslateY,
    overlayOpacity,
    servingCount,
    setServingCount,
    addedMeals,
    handleAddMeal,
    handleRecordMeal,
    isFoodSuccess,
  };
}

export function useCommunitySearch() {
  const [searchCommunity, setSearchCommunity] = useState('');

  const handleSearch = useCallback(() => {
    console.log(searchCommunity);
  }, [searchCommunity]);

  return {setSearchCommunity, handleSearch};
}
