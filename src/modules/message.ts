import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Alert} from 'react-native';

export const useMessage = () => {
  useEffect(() => {
    // 권한 요청
    requestUserPermission();

    // FCM 토큰 가져오기
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      });

    // Foreground 메시지 리스너 설정
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title || '제목 없음'; // 기본 제목 설정
      const body = remoteMessage.notification?.body || '내용 없음'; // 기본 내용 설정

      Alert.alert(title, body);
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  return;
};
