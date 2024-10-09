import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import PatientHome from './PatientHome';
import ProtectorHome from './ProtectorHome';
import {setUserState} from '../../slices/userSlice';

export default function Home() {
  const userState = useSelector((state: RootState) => state.user.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserState('Patient'));
  }, [dispatch]);

  return <>{userState === 'Patient' ? <PatientHome /> : <ProtectorHome />}</>;
}
