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
    handleEditNotice,
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
          setIsToggleOn={setIsPatientToggleOn}
          onToggleChange={(newToggleState: boolean) =>
            handleEditNotice('patient', newToggleState)
          }>
          보호자 전송 알림
        </NotifyListItem>
        <NotifyListItem
          isToggleOn={isMedicineToggleOn}
          setIsToggleOn={setIsMedicineToggleOn}
          onToggleChange={newToggleState =>
            handleEditNotice('medicine', newToggleState)
          }>
          복약 시간 전체 알림
        </NotifyListItem>
        <NotifyListItem
          isToggleOn={isInsulinToggleOn}
          setIsToggleOn={setIsInsulinToggleOn}
          onToggleChange={newToggleState =>
            handleEditNotice('insulin', newToggleState)
          }>
          인슐린 시간 전체 알림
        </NotifyListItem>
      </MyMoreTop>
    </MyMoreContainer>
  );
}
