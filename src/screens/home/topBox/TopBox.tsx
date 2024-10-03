import React from 'react';
import {TopBoxType} from './types';
import Profile from '../profile/Profile';
import {
  TopBoxBloodSugar,
  TopBoxContainer,
  TopBoxLayout,
  TopBoxText,
  TopBoxName,
} from './styles';
import {View} from 'react-native';
import {colors} from '../../../styles/colors';
import Text from '../text/Text';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

export default function TopBox({
  profileImage,
  userName,
  fastingBloodSugar,
  currentBloodSugar,
}: TopBoxType) {
  const userState = useSelector((state: RootState) => state.user.userState);

  return (
    <TopBoxContainer>
      <Profile source={profileImage} />
      <TopBoxLayout>
        <View>
          <TopBoxName color={colors.white} weight="bold">
            {userName || '사용자'}
            {userState === 'Protector' && ' 보호자'}님
          </TopBoxName>
          <TopBoxText color={colors.white}>
            {userState === 'Protector'
              ? `${userName}님의 오늘 혈당 수치는`
              : '오늘도 함께 열심히 관리해요!'}
          </TopBoxText>
        </View>
        <TopBoxBloodSugar>
          <Text value={fastingBloodSugar} text="공복 혈당 지수" />
          <Text value={currentBloodSugar} text="현재 혈당 지수" />
        </TopBoxBloodSugar>
      </TopBoxLayout>
    </TopBoxContainer>
  );
}
