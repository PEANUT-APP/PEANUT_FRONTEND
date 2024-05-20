import React from 'react';
import {Button} from 'react-native';
import GlobalView from '../../styles/GlobalStyle';
import {NavigationProps} from './types';
import NavigationBar from '../../components/navigation/NavigationBar';

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
      <Button
        title="NavigationButtonTest"
        onPress={() => navigation.navigate('NavigationButtonTest')}
      />
      <Button
        title="CameraButtonTest"
        onPress={() => navigation.navigate('CameraButtonTest')}
      />
      <Button
        title="InputTest"
        onPress={() => navigation.navigate('InputTest')}
      />
      <Button
        title="MainValueTest"
        onPress={() => navigation.navigate('MainValueTest')}
      />
      <Button
        title="ProfileTest"
        onPress={() => navigation.navigate('ProfileTest')}
      />
      <Button
        title="NavigationTest"
        onPress={() => navigation.navigate('NavigationTest')}
      />
      <Button
        title="CalendarTest"
        onPress={() => navigation.navigate('CalendarTest')}
      />
      <NavigationBar />
    </GlobalView>
  );
}
