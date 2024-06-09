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
import NavigationTest from '../pages/test/NavigationTest';
import CalendarTest from '../pages/test/CalendarTest';
import ListTest from '../pages/test/ListTest';
import OnBoarding from '../screens/onBoarding/OnBoarding';
import SignUp from '../screens/sign/SignUp';
import BasicInformation from '../screens/sign/BasicInformation';
import AdditionalInformation from '../screens/sign/AdditionalInformation';
import SignIn from '../screens/sign/SignIn';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BasicInformation"
          component={BasicInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdditionalInformation"
          component={AdditionalInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={IconTest} />
        <Stack.Screen name="Food" component={InputTest} />
        <Stack.Screen name="Community" component={MainValueTest} />
        <Stack.Screen name="My" component={ProfileTest} />
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
        <Stack.Screen name="NavigationTest" component={NavigationTest} />
        <Stack.Screen name="CalendarTest" component={CalendarTest} />
        <Stack.Screen name="ListTest" component={ListTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
