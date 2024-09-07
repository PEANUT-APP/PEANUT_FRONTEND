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

export default function TopBox({
  profileImage,
  userName,
  firstBloodSugar,
  nowBloodSugar,
}: TopBoxType) {
  return (
    <TopBoxContainer>
      <Profile source={profileImage} />
      <TopBoxLayout>
        <View>
          <TopBoxName color={colors.white} weight="bold">
            {userName || '사용자'}님
          </TopBoxName>
          <TopBoxText color={colors.white}>
            오늘도 함께 열심히 관리해요!
          </TopBoxText>
        </View>
        <TopBoxBloodSugar>
          <Text value={firstBloodSugar} text="공복 혈당 지수" />
          <Text value={nowBloodSugar} text="현재 혈당 지수" />
        </TopBoxBloodSugar>
      </TopBoxLayout>
    </TopBoxContainer>
  );
}
