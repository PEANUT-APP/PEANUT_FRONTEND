import React, {useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  CardContainer,
  CardGrayBox,
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

export default function ReportCard({
  navigate,
  isChecked,
  onPress,
  name,
}: ReportCardType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const recordName = navigate === 'Medicine' ? '복약' : '인슐린';

  const handlePress = useCallback(() => {
    if (name?.includes('등록해주세요')) {
      if (navigate === 'Medicine' || navigate === 'Insulin') {
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
            <CardSubTitle>
              {isChecked ? '매우 잘하고 있어요!' : '현재 상태 설명 텍스트'}
            </CardSubTitle>
          </CardTopText>
          {!name?.includes('등록해주세요') && onPress && (
            <CheckButton isChecked={isChecked} onPress={onPress} />
          )}
        </CardTop>
        <CardGrayBox />
        <CardMedicineName>{name}</CardMedicineName>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
}
