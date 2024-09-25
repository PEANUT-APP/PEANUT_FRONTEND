import React from 'react';
import NullIcon from '../../../components/icon/NullIcon';
import {MyCardContainer, CardText} from './styles';
import {MyCardType} from './types';
import {colors} from '../../../styles/colors';
import {useCard} from '../hooks';

export default function MyCard({children, navigate}: MyCardType) {
  const {onPress} = useCard();

  return (
    <MyCardContainer activeOpacity={1} onPress={() => onPress(navigate)}>
      <NullIcon size="xl" />
      <CardText color={colors.TextNormal}>{children}</CardText>
    </MyCardContainer>
  );
}
