import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Animated, Easing} from 'react-native';
import {FormData} from '../../components/input/types';
import {
  useAddCustomFoodMutation,
  useLazyGetFoodNutritionByNameQuery,
} from '../../services/food/foodApi';
import {FoodDetailReturnType} from '../../services/food/types';
import {AddMealType} from './types';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export function useSearch() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

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

  const [triggerSearch, {data: foodByName, isSuccess: isFoodByNameSuccess}] =
    useLazyGetFoodNutritionByNameQuery();
  const [addCustomFood] = useAddCustomFoodMutation();

  const handleSearch = useCallback(() => {
    const name: string[] = [];
    name.push(searchFood);
    if (searchFood.trim()) {
      triggerSearch({name: name});
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  }, [searchFood, triggerSearch]);

  const handleItemPress = (item: FoodDetailReturnType) => {
    setSelectedItem(item); // 선택한 아이템을 저장
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
        servingCount,
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
        for (const meal of addedMeals) {
          console.log(meal);
          try {
            const response = await addCustomFood({
              foodName: meal.name,
              servingCount: parseInt(meal?.servingCount || '1', 10),
            }).unwrap();
            navigation.navigate('MealRecording', {
              photoUri: undefined,
              mealNames: addedMeals,
            });
            console.log(response);
            setAddedMeals([]);
            setSearchFood('');
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        navigation.navigate('MealRecording', {
          photoUri: undefined,
          mealNames: addedMeals,
        });
        setAddedMeals([]);
        setSearchFood('');
      }
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
  };
}
