import {useState} from 'react';
import {
  useGetAdditionalInfoMainPageQuery,
  useGetUserInfoMainPageQuery,
} from '../../services/mainPage/mainPageApi';
import dayjs from 'dayjs';
import {BloodSugarItem} from '../../services/mainPage/types';

// 시간을 기준으로 데이터 포인트를 매핑하는 함수
function mapBloodSugarToGraph(bloodSugarList: BloodSugarItem[] | undefined) {
  return bloodSugarList?.map(item => {
    const bloodSugarValue = parseInt(Object.keys(item)[0], 10);
    // const time = moment(Object.values(item)[0], 'YYYY-MM-DDTHH:mm:ss.SSSSSS');
    // const formattedTime = `${time.hour()}시`; // HH시 형식으로 출력
    return {value: bloodSugarValue};
  });
}

export default function useMain() {
  // 오늘 날짜
  const [today, setToday] = useState(dayjs());
  // 복약 체크 유무
  const [isCheckedMedicine, setIsCheckedMedicine] = useState(false);
  // 인슐린 체크 유무
  const [isCheckedInsulin, setIsCheckedInsulin] = useState(false);

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

  const bloodSugarList = mapBloodSugarToGraph(additionalInfo?.bloodSugarList);

  // 복약 체크 토글 함수
  const toggleMedicine = () => {
    setIsCheckedMedicine(!isCheckedMedicine);
  };
  // 인슐린 체크 토글 함수
  const toggleInsulin = () => {
    setIsCheckedInsulin(!isCheckedInsulin);
  };

  const medicineName =
    additionalInfo?.medicineName === '복용 기록 없음'
      ? '약을 등록해주세요'
      : additionalInfo?.medicineName;

  const insulinName =
    additionalInfo?.insulinName === '투여 기록 없음'
      ? '인슐린을 등록해주세요'
      : additionalInfo?.insulinName;

  return {
    currentBloodSugarLevel: currentBloodSugar.toString(),
    fastingBloodSugarLevel: fastingBloodSugar.toString(),
    userName: userInfo.userName,
    isUserInfoSuccess,
    additionalInfo,
    bloodSugarList,
    medicineName,
    insulinName,
    isAdditionalInfoSuccess,
    today,
    setToday,
    isCheckedMedicine,
    isCheckedInsulin,
    toggleMedicine,
    toggleInsulin,
  };
}
