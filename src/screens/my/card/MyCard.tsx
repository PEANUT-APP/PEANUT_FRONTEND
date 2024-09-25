import React from 'react';
import NullIcon from '../../../components/icon/NullIcon';
import {MyCardContainer, CardText} from './styles';
import {MyCardType} from './types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../navigation/types';
import {colors} from '../../../styles/colors';

export default function MyCard({children, navigate}: MyCardType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onPress = () => {
    navigation.navigate(navigate);
  };

  return (
    <MyCardContainer activeOpacity={1} onPress={onPress}>
      <NullIcon size="xl" />
      <CardText color={colors.TextNormal}>{children}</CardText>
    </MyCardContainer>
  );
}
