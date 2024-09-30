import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../screens/onBoarding/OnBoarding';
import SignUp from '../screens/sign/SignUp';
import BasicInformation from '../screens/sign/BasicInformation';
import AdditionalInformation from '../screens/sign/AdditionalInformation';
import SignIn from '../screens/sign/SignIn';
import Home from '../screens/home/Home';
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
import MyEdit from '../screens/my/MyEdit';
import MyNotice from '../screens/my/MyNotice';
import MyAccount from '../screens/my/MyAccount';
import MyCommunity from '../screens/my/MyCommunity';
import Community from '../screens/community/Community';
import Write from '../screens/community/Write';
import Detail from '../screens/community/Detail';

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
      <Stack.Screen name="MyEdit" component={MyEdit} />
      <Stack.Screen name="MyNotice" component={MyNotice} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="MyArticle" component={MyCommunity} />
      <Stack.Screen name="MyGood" component={MyCommunity} />
      <Stack.Screen name="MyComment" component={MyCommunity} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Write" component={Write} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
