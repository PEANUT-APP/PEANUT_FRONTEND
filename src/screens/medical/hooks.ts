import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback, useMemo, useState} from 'react';
import {ParamList} from '../../navigation/types';
import {useGetMonthlyBloodSugarStatusQuery} from '../../services/bloodSugar/bloodSugarApi';
import dayjs from 'dayjs';
import {useGetInsulinInfoReportListQuery} from '../../services/insulin/InsulinApi';
import {useGetMedicineInfoReportListQuery} from '../../services/medicine/medicineApi';

export const mapStatus = (status: string) => {
  switch (status) {
    case '보통이에요':
      return 'normal';
    case '참 잘했어요':
      return 'great';
    case '아쉬워요':
      return 'bad';
    default:
      return 'unknown'; // 알 수 없는 상태 처리
  }
};

export const splitMessage = (message: string) => {
  // 마침표나 느낌표를 기준으로 줄바꿈 처리
  const sentences = message
    .split(/(?<=[.!?])\s+/g)
    .map(sentence => sentence + '\n');
  return sentences;
};

const extractedDay = (message: string) => {
  const match = message.match(/(\d+)일/); // 숫자와 '일' 추출
  return match ? parseInt(match[1], 10) : null; // 추출한 숫자를 정수로 변환
};

const monthlyAvgStatus = (days: number | null) => {
  if (days === null) {
    return 'unknown';
  }
  if (days >= 0 && days <= 10) {
    return 'bad';
  }
  if (days > 10 && days <= 20) {
    return 'normal';
  }
  if (days > 20 && days <= 31) {
    return 'great';
  }
};

export function useMedical() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [currentDate, setCurrentDate] = useState(dayjs().add(9, 'hour'));
  // 선택된 Chip의 상태를 관리
  const [selectedChip, setSelectedChip] = useState<'혈당' | '인슐린' | '복약'>(
    '혈당',
  );

  // 년, 월 추출
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  // API 데이터 가져오기
  const {data: bloodSugarData} = useGetMonthlyBloodSugarStatusQuery(
    {
      year,
      month,
    },
    {refetchOnMountOrArgChange: true},
  );
  const {data: insulinData} = useGetInsulinInfoReportListQuery({
    year,
    month,
  });
  const {data: medicineData} = useGetMedicineInfoReportListQuery({
    year,
    month,
  });

  // 인슐린 및 복약 상태 계산
  const insulinMonthlyAvg = extractedDay(
    insulinData?.monthlyStatusMessage || '',
  );
  const medicineMonthlyAvg = extractedDay(
    medicineData?.monthlyStatusMessage || '',
  );

  // Chip 선택 시 호출되는 핸들러
  const handleSelectChip = useCallback((chip: '혈당' | '인슐린' | '복약') => {
    setSelectedChip(chip); // 선택된 Chip 상태 업데이트
  }, []);

  // 알림 설정 이동 핸들러
  const handleGoAlarm = useCallback(() => {
    navigation.navigate('MyNotice');
  }, [navigation]);

  // 캘린더 타입
  const calendarType = useMemo<'bloodSugar' | 'insulin' | 'medicine'>(() => {
    switch (selectedChip) {
      case '혈당':
        return 'bloodSugar';
      case '인슐린':
        return 'insulin';
      default:
        return 'medicine';
    }
  }, [selectedChip]);

  return {
    currentDate,
    setCurrentDate,
    selectedChip,
    handleSelectChip,
    handleGoAlarm,
    bloodDailyStatuses: bloodSugarData?.dailyStatuses,
    bloodMonthlyAvg: Math.floor(bloodSugarData?.monthlyAvg || 0),
    bloodMonthlyAvgStatus: bloodSugarData?.monthlyAvgStatus,
    bloodMonthlyMessage: bloodSugarData?.monthlyStatusMessage,
    insulinDailyStatuses: insulinData?.dailyStatuses,
    insulinMonthlyAvg,
    insulinMonthlyAvgStatus: monthlyAvgStatus(insulinMonthlyAvg),
    insulinMonthlyMessage: insulinData?.monthlyStatusMessage,
    medicineDailyStatuses: medicineData?.dailyStatuses,
    medicineMonthlyAvg,
    medicineMonthlyAvgStatus: monthlyAvgStatus(medicineMonthlyAvg),
    medicineMonthlyMessage: medicineData?.monthlyStatusMessage,
    calendarType,
  };
}

export function useBloodSugar() {}
