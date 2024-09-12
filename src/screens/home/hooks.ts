import {useState} from 'react';
import {
  useGetAdditionalInfoMainPageQuery,
  useGetUserInfoMainPageQuery,
} from '../../services/mainPage/mainPageApi';
import dayjs from 'dayjs';

export default function useMain() {
  // 오늘 날짜
  const [today, setToday] = useState(dayjs());

  // 사용자 정보
  const {data: userInfo, isSuccess: isUserInfoSuccess} =
    useGetUserInfoMainPageQuery();
  // 그래프, 복약, 인슐린 정보
  const {data: additionalInfo, isSuccess: isAdditionalInfoSuccess} =
    useGetAdditionalInfoMainPageQuery({date: today.format('YYYY-MM-DD')});

  console.log(additionalInfo);

  // 숫자 변환 시 NaN이 발생하면 0으로 처리
  if (!userInfo) {
    return {userInfo: null, isUserInfoSuccess: false};
  }
  const fastingBloodSugar = parseInt(userInfo.fastingBloodSugarLevel, 10) || 0;
  const currentBloodSugar = parseInt(userInfo.currentBloodSugarLevel, 10) || 0;

  return {
    currentBloodSugarLevel: currentBloodSugar.toString(),
    fastingBloodSugarLevel: fastingBloodSugar.toString(),
    userName: userInfo.userName,
    isUserInfoSuccess,
    additionalInfo,
    isAdditionalInfoSuccess,
    today,
    setToday,
  };
}
