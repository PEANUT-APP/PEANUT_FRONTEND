import React from 'react';
import {Button} from 'react-native';
import GlobalView from '../../styles/GlobalStyle';
import {NavigationProps} from './types';

export default function Test({navigation}: NavigationProps) {
  return (
    <GlobalView>
      <Button
        title="IconTest"
        onPress={() => navigation.navigate('IconTest')}
      />
    </GlobalView>
  );
}
