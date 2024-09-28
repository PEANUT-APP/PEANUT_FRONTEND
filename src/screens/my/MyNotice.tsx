import React from 'react';
import {colors} from '../../styles/colors';
import {MyMoreContainer, MyMoreTitle, MyMoreTop} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {useBackHandler} from '../../modules/commonHooks';
import {useMyNotice} from './hooks';
import NotifyListItem from '../../components/list/notify/NotifyListItem';

export default function MyNotice() {
  const {handleBack} = useBackHandler();
  const {
    isPatientToggleOn,
    setIsPatientToggleOn,
    isMedicineToggleOn,
    setIsMedicineToggleOn,
    isInsulinToggleOn,
    setIsInsulinToggleOn,
  } = useMyNotice();

  return (
    <MyMoreContainer color={colors.background}>
      <MyMoreTop>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </TouchableOpacity>
        <MyMoreTitle weight="bold">알림 설정</MyMoreTitle>
        <NotifyListItem
          isToggleOn={isPatientToggleOn}
          setIsToggleOn={setIsPatientToggleOn}>
          보호자 전송 알림
        </NotifyListItem>
        <NotifyListItem
          isToggleOn={isMedicineToggleOn}
          setIsToggleOn={setIsMedicineToggleOn}>
          복약 시간 전체 알림
        </NotifyListItem>
        <NotifyListItem
          isToggleOn={isInsulinToggleOn}
          setIsToggleOn={setIsInsulinToggleOn}>
          인슐린 시간 전체 알림
        </NotifyListItem>
      </MyMoreTop>
    </MyMoreContainer>
  );
}
