import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback, useMemo, useState} from 'react';
import {ParamList} from '../../navigation/types';
import {
  useGetGuardianMonthlyBloodSugarStatusQuery,
  useGetMonthlyBloodSugarStatusQuery,
} from '../../services/bloodSugar/bloodSugarApi';
import dayjs from 'dayjs';
import {
  useGetGuardianInsulinInfoReportListQuery,
  useGetInsulinInfoReportListQuery,
} from '../../services/insulin/InsulinApi';
import {
  useGetGuardianMedicineInfoListQuery,
  useGetMedicineInfoReportListQuery,
} from '../../services/medicine/medicineApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

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
  const userState = useSelector((state: RootState) => state.user.userState);

  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [currentDate, setCurrentDate] = useState(dayjs().add(9, 'hour'));
  // 선택된 Chip의 상태를 관리
  const [selectedChip, setSelectedChip] = useState<'혈당' | '인슐린' | '복약'>(
    '혈당',
  );
  const [refreshing, setRefreshing] = useState(false);

  // 년, 월 추출
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  // API 데이터 가져오기
  const {data: patientBloodSugarData, refetch: patientBloodSugarRefetch} =
    useGetMonthlyBloodSugarStatusQuery({
      year,
      month,
    });
  const {data: guardianBloodSugarData, refetch: guardianBloodSugarRefetch} =
    useGetGuardianMonthlyBloodSugarStatusQuery({year, month});

  const {data: patientInsulinData, refetch: patientInsulinRefetch} =
    useGetInsulinInfoReportListQuery({
      year,
      month,
    });
  const {data: guardianInsulinData, refetch: guardianInsulinRefetch} =
    useGetGuardianInsulinInfoReportListQuery({year, month});

  const {data: patientMedicineData, refetch: patientMedicineRefetch} =
    useGetMedicineInfoReportListQuery({
      year,
      month,
    });
  const {data: guardianMedicineData, refetch: guardianMedicineRefetch} =
    useGetGuardianMedicineInfoListQuery({year, month});

  const bloodSugarData =
    userState === 'Patient' ? patientBloodSugarData : guardianBloodSugarData;
  const insulinData =
    userState === 'Patient' ? patientInsulinData : guardianInsulinData;
  const medicineData =
    userState === 'Patient' ? patientMedicineData : guardianMedicineData;

  const bloodSugarRefetch =
    userState === 'Patient'
      ? patientBloodSugarRefetch
      : guardianBloodSugarRefetch;
  const insulinRefetch =
    userState === 'Patient' ? patientInsulinRefetch : guardianInsulinRefetch;
  const medicineRefetch =
    userState === 'Patient' ? patientMedicineRefetch : guardianMedicineRefetch;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const newDate = dayjs().add(9, 'hour');
    setCurrentDate(newDate);

    try {
      if (selectedChip === '혈당') {
        bloodSugarRefetch();
      } else if (selectedChip === '인슐린') {
        insulinRefetch();
      } else if (selectedChip === '복약') {
        medicineRefetch();
      }
    } catch (error) {
      console.error('데이터 새로 고치는 중 오류 발생', error);
    } finally {
      setRefreshing(false);
    }
  }, [bloodSugarRefetch, insulinRefetch, medicineRefetch, selectedChip]);

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
    refreshing,
    onRefresh,
  };
}
