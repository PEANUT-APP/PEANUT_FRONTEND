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
      <Button
        title="PrimaryButtonTest"
        onPress={() => navigation.navigate('PrimaryButtonTest')}
      />
      <Button
        title="SecondaryButtonTest"
        onPress={() => navigation.navigate('SecondaryButtonTest')}
      />
      <Button
        title="TertiaryButtonTest"
        onPress={() => navigation.navigate('TertiaryButtonTest')}
      />
      <Button
        title="OutlineButtonTest"
        onPress={() => navigation.navigate('OutlineButtonTest')}
      />
      <Button
        title="TextButtonTest"
        onPress={() => navigation.navigate('TextButtonTest')}
      />
      <Button
        title="SelectButtonTest"
        onPress={() => navigation.navigate('SelectButtonTest')}
      />
    </GlobalView>
  );
}
