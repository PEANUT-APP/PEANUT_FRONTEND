import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setFcmToken} from '../slices/tokenSlice';

export const useMessage = () => {
  const dispatch = useDispatch();

  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // 권한 요청
    requestUserPermission();

    // FCM 토큰 가져오기
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        dispatch(setFcmToken(token));
      });

    // Foreground 메시지 리스너 설정
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title || '제목 없음'; // 기본 제목 설정
      const body = remoteMessage.notification?.body || '내용 없음'; // 기본 내용 설정

      setToastTitle(title);
      setToastMessage(body);

      setTimeout(() => setToastMessage(''), 3000);
    });

    return unsubscribe;
  }, [dispatch]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  return {toastTitle, toastMessage};
};
