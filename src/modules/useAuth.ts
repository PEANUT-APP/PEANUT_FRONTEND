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

  useEffect(() => {
    if (accessToken) {
      setIsLoggingOut(false);
    } else {
      setIsLoggingOut(true);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isInitialRender) {
      if (!accessToken && !isLoggingOut) {
        Alert.alert('다시 로그인해주세요');
        dispatch(logout());
        navigation.dispatch(
          StackActions.replace('OnBoarding'), // 화면 스택을 교체해서 OnBoarding으로 이동
        );
      }
    }
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
