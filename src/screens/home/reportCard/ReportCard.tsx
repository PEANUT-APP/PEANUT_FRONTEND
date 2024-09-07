import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {CardContainer} from './styles';
import {ReportCardType} from './types';
import {ParamList} from '../../../navigation/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function ReportCard({navigate}: ReportCardType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const handlePress = () => {
    navigation.navigate(navigate);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <CardContainer></CardContainer>
    </TouchableWithoutFeedback>
  );
}
