import {ParamListBase} from '@react-navigation/native';
import {AddMealType} from '../screens/search/types';

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
  MealRecording: {
    photoUri?: string | undefined;
    mealNames?: AddMealType[] | undefined;
  };
  MealRecord: undefined;
  MealFeedback: undefined;
  Search: {isAIProcessing?: boolean};
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

export interface NavigationList {
  Home: undefined;
  Medical: undefined;
  Community: undefined;
  My: undefined;
}
