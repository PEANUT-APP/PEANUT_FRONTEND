import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ParamList} from '../../navigation/types';
import {useGetMonthlyBloodSugarStatusQuery} from '../../services/bloodSugar/bloodSugarApi';
import dayjs from 'dayjs';

export function useMedical() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [currentDate, setCurrentDate] = useState(dayjs().add(9, 'hour'));
  // 선택된 Chip의 상태를 관리
  const [selectedChip, setSelectedChip] = useState<string>('혈당');
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  const {data: bloodSugarData} = useGetMonthlyBloodSugarStatusQuery(
    {
      year,
      month,
    },
    {refetchOnMountOrArgChange: true},
  );

  // Chip 선택 시 호출되는 핸들러
  const handleSelectChip = useCallback((chip: string) => {
    setSelectedChip(chip); // 선택된 Chip 상태 업데이트
  }, []);

  const handleGoAlarm = useCallback(() => {
    navigation.navigate('MyNotice');
  }, [navigation]);

  return {
    currentDate,
    setCurrentDate,
    selectedChip,
    handleSelectChip,
    handleGoAlarm,
    bloodDailyStatuses: bloodSugarData?.dailyStatuses,
    bloodMonthlyAvg: Math.floor(bloodSugarData?.monthlyAvg || 0),
    bloodMonthlyAvgStatus: bloodSugarData?.monthlyAvgStatus,
  };
}

export function useBloodSugar() {}
