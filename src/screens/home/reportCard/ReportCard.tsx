import React, {useCallback, useMemo} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  CardContainer,
  CardImage,
  CardMedicineName,
  CardSubTitle,
  CardTitle,
  CardTop,
  CardTopText,
} from './styles';
import {ReportCardType} from './types';
import {ParamList} from '../../../navigation/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CheckButton from '../../../components/button/CheckButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import MedicineIcon from '../../../assets/images/medicine.svg';
import InsulinIcon from '../../../assets/images/insulin.svg';
import NotifyButton from '../../../components/button/NotifyButton';

export default function ReportCard({
  navigate,
  isChecked,
  isPushed,
  onPress,
  onPush,
  name,
  time,
}: ReportCardType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const userState = useSelector((state: RootState) => state.user.userState);

  const recordName = useMemo(
    () => (navigate === 'MedicineDocument' ? '복약' : '인슐린'),
    [navigate],
  );

  const handlePress = useCallback(() => {
    if (name?.includes('등록해주세요') && userState === 'Patient') {
      if (navigate === 'MedicineDocument' || navigate === 'InsulinDocument') {
        navigation.navigate(navigate);
      }
    }
  }, [name, navigate, navigation, userState]);

  const subtitleText = useMemo(() => {
    if (userState === 'Patient') {
      return isChecked ? '매우 잘하고 있어요!' : time;
    } else if (userState === 'Protector') {
      if (isPushed) {
        return name?.includes('없어요')
          ? ''
          : recordName === '복약'
          ? '제시간에 섭취했어요'
          : '제시간에 맞았어요';
      }
      return recordName === '복약'
        ? '복용 시간이 지났어요!'
        : '투약 시간이 지났어요!';
    }
  }, [isChecked, isPushed, name, recordName, time, userState]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <CardContainer>
        <CardTop>
          <CardTopText>
            <CardTitle weight="bold">{recordName} 기록</CardTitle>
            <CardSubTitle>{subtitleText}</CardSubTitle>
          </CardTopText>
          {!name?.includes('등록해주세요') &&
            onPress &&
            userState === 'Patient' && (
              <CheckButton isChecked={isChecked || false} onPress={onPress} />
            )}
        </CardTop>
        <CardImage>
          {userState === 'Patient' ? (
            recordName === '복약' ? (
              <MedicineIcon />
            ) : (
              <InsulinIcon />
            )
          ) : (
            onPush && (
              <NotifyButton isPushed={isPushed || false} onPress={onPush} />
            )
          )}
        </CardImage>
        <CardMedicineName>{name}</CardMedicineName>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
}
