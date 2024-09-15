import {useState} from 'react';
import {
  useGetAdditionalInfoMainPageQuery,
  useGetUserInfoMainPageQuery,
} from '../../services/mainPage/mainPageApi';
import dayjs from 'dayjs';
import {BloodSugarItem} from '../../services/mainPage/types';
import moment from 'moment';
import {FilteredData} from './types';

// 시간을 기준으로 데이터 포인트를 매핑하는 함수
function mapBloodSugarToGraph(bloodSugarList: BloodSugarItem[] | undefined) {
  const filteredData: FilteredData = {}; // 시간별로 최신 데이터를 저장할 객체

  bloodSugarList?.forEach(item => {
    const bloodSugarValue = parseInt(Object.keys(item)[0], 10); // 혈당 값
    const time = moment(Object.values(item)[0], 'YYYY-MM-DDTHH:mm:ss.SSSSSS'); // 시간 파싱
    const hour = time.hour(); // 시간 (0시 ~ 23시)

    // 6시부터 23시까지 데이터만 처리
    if (hour >= 6 && hour <= 23) {
      // 같은 시간에 여러 개의 데이터가 있을 경우 최신 데이터를 유지
      if (
        !filteredData[hour] ||
        moment(filteredData[hour].time).isBefore(time)
      ) {
        filteredData[hour] = {
          value: bloodSugarValue,
          time: time.toISOString(),
        };
      }
    }
  });

  // 6시부터 23시까지의 시간을 기준으로 데이터 생성, 없는 시간대는 hideDataPoint 처리
  const graphData = [];

  for (let hour = 6; hour <= 23; hour++) {
    if (filteredData[hour]) {
      graphData.push({
        value: filteredData[hour].value,
        hideDataPoint: false,
      });
    } else {
      graphData.push({
        value: null,
        hideDataPoint: true, // 해당 시간대에 데이터가 없으면 포인트를 숨김
      });
    }
  }

  return graphData;
}

export default function useMain() {
  const [today, setToday] = useState(dayjs());
  const [isCheckedMedicine, setIsCheckedMedicine] = useState(false);
  const [isCheckedInsulin, setIsCheckedInsulin] = useState(false);

  const {data: userInfo, isSuccess: isUserInfoSuccess} =
    useGetUserInfoMainPageQuery();
  const {data: additionalInfo, isSuccess: isAdditionalInfoSuccess} =
    useGetAdditionalInfoMainPageQuery({date: today.format('YYYY-MM-DD')});

  console.log(userInfo);
  console.log(additionalInfo);

  const fastingBloodSugar =
    parseInt(userInfo?.fastingBloodSugarLevel || '0', 10) || 0;
  const currentBloodSugar =
    parseInt(userInfo?.currentBloodSugarLevel || '0', 10) || 0;

  const bloodSugarList = mapBloodSugarToGraph(additionalInfo?.bloodSugarList);

  const medicineName =
    additionalInfo?.medicineName === '복용 기록 없음'
      ? '약을 등록해주세요'
      : additionalInfo?.medicineName;

  const insulinName =
    additionalInfo?.insulinName === '투여 기록 없음'
      ? '인슐린을 등록해주세요'
      : additionalInfo?.insulinName;

  const toggleMedicine = () => {
    setIsCheckedMedicine(!isCheckedMedicine);
  };
  const toggleInsulin = () => {
    setIsCheckedInsulin(!isCheckedInsulin);
  };

  return {
    currentBloodSugarLevel: currentBloodSugar.toString(),
    fastingBloodSugarLevel: fastingBloodSugar.toString(),
    userName: userInfo?.userName,
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
