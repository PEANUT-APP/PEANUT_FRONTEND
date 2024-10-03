import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ParamList} from '../../navigation/types';

export function useMedical() {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  // 선택된 Chip의 상태를 관리
  const [selectedChip, setSelectedChip] = useState<string>('혈당');

  // Chip 선택 시 호출되는 핸들러
  const handleSelectChip = useCallback((chip: string) => {
    setSelectedChip(chip); // 선택된 Chip 상태 업데이트
  }, []);

  const handleGoAlarm = useCallback(() => {
    navigation.navigate('MyNotice');
  }, [navigation]);

  return {selectedChip, handleSelectChip, handleGoAlarm};
}
