import {ImageSourcePropType} from 'react-native';

export interface TopBoxType {
  profileImage: ImageSourcePropType;
  userName?: string;
  fastingBloodSugar?: number;
  currentBloodSugar?: number;
}
