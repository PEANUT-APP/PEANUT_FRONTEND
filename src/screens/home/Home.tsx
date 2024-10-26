import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import PatientHome from './PatientHome';
import ProtectorHome from './ProtectorHome';
import {setUserState} from '../../slices/userSlice';
import {BackHandler} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export default function Home() {
  const userState = useSelector((state: RootState) => state.user.userState);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(setUserState('Patient'));

    const handleBackPress = () => {
      if (isFocused) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [dispatch, isFocused]);

  return <>{userState === 'Patient' ? <PatientHome /> : <ProtectorHome />}</>;
}
