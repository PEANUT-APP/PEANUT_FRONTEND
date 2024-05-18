import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test from '../pages/test/Test';
import IconTest from '../pages/test/IconTest';
import {
  CameraButtonTest,
  NavigationButtonTest,
  OutlineButtonTest,
  PrimaryButtonTest,
  SecondaryButtonTest,
  SelectButtonTest,
  TertiaryButtonTest,
  TextButtonTest,
} from '../pages/test/ButtonTest';
import InputTest from '../pages/test/InputTest';
import MainValueTest from '../pages/test/MainValueTest';
import ProfileTest from '../pages/test/ProfileTest';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="IconTest" component={IconTest} />
        <Stack.Screen name="PrimaryButtonTest" component={PrimaryButtonTest} />
        <Stack.Screen
          name="SecondaryButtonTest"
          component={SecondaryButtonTest}
        />
        <Stack.Screen
          name="TertiaryButtonTest"
          component={TertiaryButtonTest}
        />
        <Stack.Screen name="OutlineButtonTest" component={OutlineButtonTest} />
        <Stack.Screen name="TextButtonTest" component={TextButtonTest} />
        <Stack.Screen name="SelectButtonTest" component={SelectButtonTest} />
        <Stack.Screen
          name="NavigationButtonTest"
          component={NavigationButtonTest}
        />
        <Stack.Screen name="CameraButtonTest" component={CameraButtonTest} />
        <Stack.Screen name="InputTest" component={InputTest} />
        <Stack.Screen name="MainValueTest" component={MainValueTest} />
        <Stack.Screen name="ProfileTest" component={ProfileTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
