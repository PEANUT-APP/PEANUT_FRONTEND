import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setFcmToken} from '../slices/tokenSlice';
import notifee, {AndroidImportance} from '@notifee/react-native';

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
        dispatch(setFcmToken(token));
      });

    // Foreground 메시지 리스너 설정
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title || '제목 없음'; // 기본 제목 설정
      const body = remoteMessage.notification?.body || '내용 없음'; // 기본 내용 설정

      setToastTitle(title);
      setToastMessage(body);

      console.log(title, body);

      setTimeout(() => setToastMessage(''), 3000);
    });

    /*messaging().setBackgroundMessageHandler(async remoteMessage => {
      let iconName = 'guardianicon';
      const title = remoteMessage.notification?.title || '제목 없음';
      const body = remoteMessage.notification?.body || '내용 없음';

      if (title && title.includes('보호자')) {
        iconName = 'guardianicon';
      } else if (title && title.includes('식사')) {
        iconName = 'mealicon';
      } else if (title && title.includes('복약')) {
        iconName = 'medicineicon';
      } else if (title && title.includes('혈당')) {
        iconName = 'bloodicon';
      } else if (title && title.includes('인슐린')) {
        iconName = 'insulinicon';
      }

      const channelId = await notifee.createChannel({
        id: 'peanut_channel',
        name: 'Peanut Notifications',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          smallIcon: iconName,
        },
      });
    });*/

    return unsubscribe;
  }, [dispatch]);

  const requestUserPermission = async () => {
    await messaging().requestPermission();
  };

  return {toastTitle, toastMessage};
};
