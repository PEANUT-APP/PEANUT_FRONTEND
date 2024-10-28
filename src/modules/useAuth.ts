import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {RootState} from '../store/store';
import {logout} from '../slices/tokenSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accessToken = useSelector(
    (state: RootState) => state.token.accessToken,
  );

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // 주기적으로 토큰 상태를 감시하는 함수
  useEffect(() => {
    const checkAuth = () => {
      if (!isInitialRender && !accessToken && !isLoggingOut) {
        Alert.alert('다시 로그인해주세요');
        dispatch(logout());
        navigation.dispatch(StackActions.replace('OnBoarding'));
      }
    };

    // 초기 렌더 후 체크
    checkAuth();

    const intervalId = setInterval(checkAuth, 5000); // 5초마다 체크

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, [accessToken, dispatch, isInitialRender, isLoggingOut, navigation]);

  const handleLogout = () => {
    setIsInitialRender(true);
    setIsLoggingOut(true);
    dispatch(logout());
    navigation.dispatch(
      StackActions.replace('OnBoarding'), // 화면 스택을 교체해서 OnBoarding으로 이동
    );
  };

  return {handleLogout, setIsInitialRender};
};
