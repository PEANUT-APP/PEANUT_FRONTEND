import {IconType} from '../components/icon/types';
import {colors} from '../styles/colors';

export const getLoadingColorByType = (type: IconType['type']): string => {
  switch (type) {
    case 'primary':
      return colors.white;
    case 'secondary':
    case 'tertiary':
      return colors.LoadingSecondary;
    case 'outline':
      return colors.TextDisabled;
    default:
      return '#000000';
  }
};

export const getNullColorByType = (type: IconType['type']): string => {
  switch (type) {
    case 'primary':
      return colors.white;
    case 'secondary':
    case 'tertiary':
    case 'assistiveText':
      return colors.primaryStrong;
    case 'outline':
      return colors.TextNormal;
    case 'primaryText':
      return colors.TextNeutral;
    case 'primaryDisabled':
    case 'textDisabled':
      return colors.TextDisabled;
    case 'secondaryDisabled':
    case 'tertiaryDisabled':
    case 'outlineDisabled':
      return colors.LineDisabled;
    default:
      return '#000000';
  }
};
