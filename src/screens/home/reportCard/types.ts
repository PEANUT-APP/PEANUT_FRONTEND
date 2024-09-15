import {CheckButtonType} from '../../../components/button/types';
import {ParamList} from '../../../navigation/types';

export interface ReportCardType extends CheckButtonType {
  navigate: keyof ParamList;
  name: string | undefined;
}
