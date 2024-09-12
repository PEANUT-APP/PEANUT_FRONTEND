import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body2, Caption1} from '../../../components/text/Text';

export const PickerContainer = styled.TouchableOpacity<{status: boolean}>`
  width: 36px;
  height: 36px;
  border-width: ${({status}) => (status ? '0' : '1px')};
  border-color: ${({status}) => (status ? 'transparent' : colors.LineDisabled)};
  background-color: ${({status}) =>
    status ? colors.primaryNormal : 'transparent'};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

export const PickerText = styled(Body2)<{status: boolean}>`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${({status}) => (status ? colors.white : colors.TextDisabled)};
`;

export const ListItemContainer = styled.View`
  width: 350px;
  gap: 12px;
`;

export const ListItemTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ListItemLabel = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;

export const CheckBoxWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ListItemContent = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;
