import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {logout} from '../slices/tokenSlice';
import {RootState} from '../store/store';
import {useEffect} from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isLoggedOut = useSelector(
    (state: RootState) => !state.token.accessToken,
  );

  useEffect(() => {
    if (isLoggedOut) {
      navigation.dispatch(StackActions.replace('OnBoarding'));
    }
  }, [isLoggedOut, navigation]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.dispatch(
      StackActions.replace('OnBoarding'), // 화면 스택을 교체해서 OnBoarding으로 이동
    );
  };

  return {handleLogout};
};
