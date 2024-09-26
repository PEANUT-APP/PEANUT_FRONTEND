import React from 'react';
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
import Home from '../screens/home/Home';
import DietLog from '../screens/dietLog/DietLog';
import DropdownTest from '../pages/test/DropdownTest';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import MedicineRecord from '../screens/record/MedicineRecord';
import InsulinRecord from '../screens/record/InsulinRecord';
import BloodSugarRecord from '../screens/record/BloodSugarRecord';
import MealRecording from '../screens/meal/MealRecording';
import MealRecord from '../screens/meal/MealRecord';
import MealSearch from '../screens/search/MealSearch';
import MealFeedback from '../screens/meal/MealFeedback';
import My from '../screens/my/My';
import Connect from '../screens/sign/patient/Connect';
import Confirm from '../screens/sign/patient/Confirm';
import Complete from '../screens/sign/patient/Complete';
import {useAuth} from '../modules/useAuth';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const accessToken = useSelector(
    (state: RootState) => state.token.accessToken,
  );

  useAuth();

  return (
    <Stack.Navigator
      initialRouteName={accessToken ? 'Home' : 'OnBoarding'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="BasicInformation" component={BasicInformation} />
      <Stack.Screen
        name="AdditionalInformation"
        component={AdditionalInformation}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="My" component={My} />
      <Stack.Screen name="Medicine" component={MedicineRecord} />
      <Stack.Screen name="Insulin" component={InsulinRecord} />
      <Stack.Screen name="BloodSugar" component={BloodSugarRecord} />
      <Stack.Screen name="Search" component={MealSearch} />
      <Stack.Screen name="MealRecording" component={MealRecording} />
      <Stack.Screen name="MealRecord" component={MealRecord} />
      <Stack.Screen name="MealFeedback" component={MealFeedback} />
      <Stack.Screen name="Connect" component={Connect} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Complete" component={Complete} />
      <Stack.Screen name="DietLog" component={DietLog} />
      <Stack.Screen name="Food" component={InputTest} />
      <Stack.Screen name="Community" component={MainValueTest} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="IconTest" component={IconTest} />
      <Stack.Screen name="PrimaryButtonTest" component={PrimaryButtonTest} />
      <Stack.Screen
        name="SecondaryButtonTest"
        component={SecondaryButtonTest}
      />
      <Stack.Screen name="TertiaryButtonTest" component={TertiaryButtonTest} />
      <Stack.Screen name="OutlineButtonTest" component={OutlineButtonTest} />
      <Stack.Screen name="TextButtonTest" component={TextButtonTest} />
      <Stack.Screen name="InputTest" component={InputTest} />
      <Stack.Screen name="SelectButtonTest" component={SelectButtonTest} />
      <Stack.Screen
        name="NavigationButtonTest"
        component={NavigationButtonTest}
      />
      <Stack.Screen name="CameraButtonTest" component={CameraButtonTest} />
      <Stack.Screen name="MainValueTest" component={MainValueTest} />
      <Stack.Screen name="ProfileTest" component={ProfileTest} />
      <Stack.Screen name="NavigationTest" component={NavigationTest} />
      <Stack.Screen name="CalendarTest" component={CalendarTest} />
      <Stack.Screen name="ListTest" component={ListTest} />
      <Stack.Screen name="DropdownTest" component={DropdownTest} />
    </Stack.Navigator>
  );
}
