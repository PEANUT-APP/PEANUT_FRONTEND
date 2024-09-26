import {ParamListBase} from '@react-navigation/native';
import {AddMealType} from '../screens/search/types';
import {GetPatientReturnType} from '../services/user/types';

export interface ParamList extends ParamListBase {
  onBoarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  BasicInformation: undefined;
  AdditionalInformation: undefined;
  Home: undefined;
  Medicine: undefined;
  Insulin: undefined;
  BloodSugar: undefined;
  Search: {isAIProcessing?: boolean};
  MealRecording: {
    photoUri?: string | undefined;
    mealNames?: AddMealType[] | undefined;
  };
  MealRecord: undefined;
  MealFeedback: undefined;
  Connect: undefined;
  Confirm: {data: GetPatientReturnType};
  Complete: undefined;
  MyEdit: undefined;
  Test: undefined;
  IconTest: undefined;
  PrimaryButtonTest: undefined;
  SecondaryButtonTest: undefined;
  TertiaryButtonTest: undefined;
  OutlineButtonTest: undefined;
  TextButtonTest: undefined;
  SelectButtonTest: undefined;
  NavigationButtonTest: undefined;
  CameraButtonTest: undefined;
  InputTest: undefined;
  MainValueTest: undefined;
  ProfileTest: undefined;
  NavigationTest: undefined;
  CalendarTest: undefined;
  ListTest: undefined;
}

export interface NavigationList extends ParamListBase {
  Home: undefined;
  Medical: undefined;
  Community: undefined;
  My: undefined;
}
