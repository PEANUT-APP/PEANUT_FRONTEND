import {ParamList} from '../../../navigation/types';

export interface ReportCardType {
  navigate: keyof ParamList;
  name: string | undefined;
  isChecked: boolean;
  onPress?: () => void | undefined;
}
