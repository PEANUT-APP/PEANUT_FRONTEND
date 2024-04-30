import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test from '../pages/test/Test';
import IconTest from '../pages/test/IconTest';
import {
  PrimaryButtonTest,
  SecondaryButtonTest,
  TertiaryButtonTest,
} from '../pages/test/ButtonTest';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
