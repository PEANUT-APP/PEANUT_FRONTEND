import {ParamList} from '../../../navigation/types';

export interface ReportCardType {
  navigate?: keyof ParamList;
  name: string | undefined;
  time?: string | undefined;
  isChecked?: boolean;
  onPress?: () => void;
  isPushed?: boolean;
  onPush?: () => void;
}
