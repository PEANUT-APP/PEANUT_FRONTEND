import React, {useCallback} from 'react';
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

export default function ReportCard({
  navigate,
  isChecked,
  onPress,
  name,
}: ReportCardType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const userState = useSelector((state: RootState) => state.user.userState);

  const recordName = navigate === 'MedicineDocument' ? '복약' : '인슐린';

  const handlePress = useCallback(() => {
    if (name?.includes('등록해주세요')) {
      if (navigate === 'MedicineDocument' || navigate === 'InsulinDocument') {
        navigation.navigate(navigate);
      }
    } else {
      return;
    }
  }, [name, navigate, navigation]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <CardContainer>
        <CardTop>
          <CardTopText>
            <CardTitle weight="bold">{recordName} 기록</CardTitle>
            {userState === 'Patient' ? (
              <CardSubTitle>
                {isChecked ? '매우 잘하고 있어요!' : '현재 상태 설명 텍스트'}
              </CardSubTitle>
            ) : (
              <CardSubTitle>
                {isChecked
                  ? recordName === '복약'
                    ? '제시간에 섭취했어요'
                    : '제시간에 맞았어요'
                  : recordName === '복약'
                  ? '복용 시간이 지났어요!'
                  : '투약 시간이 지났어요!'}
              </CardSubTitle>
            )}
          </CardTopText>
          {!name?.includes('등록해주세요') && onPress && (
            <CheckButton isChecked={isChecked} onPress={onPress} />
          )}
        </CardTop>
        <CardImage>
          {recordName === '복약' ? <MedicineIcon /> : <InsulinIcon />}
        </CardImage>
        <CardMedicineName>{name}</CardMedicineName>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
}
