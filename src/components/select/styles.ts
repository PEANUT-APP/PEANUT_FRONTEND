import styled from 'styled-components/native';
import {AddStyleType, MultiSelectStyleType} from './types';
import {Body2, Caption1} from '../text/Text';
import {colors} from '../../styles/colors';

const getBorderColor = (isSelected: boolean) =>
  isSelected ? colors.primaryStrong : colors.LineDisabled;
const getBackgroundColor = (isSelected: boolean) =>
  isSelected ? colors.SolidSecondaryActive : colors.background;
const getTextColor = (isSelected: boolean) =>
  isSelected ? colors.primaryStrong : colors.TextDisabled;

const ChipsContainer = styled.TouchableOpacity`
  display: inline-flex;
  flex-direction: row;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border-radius: 20px;
`;

const ChipsText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const MultiChipsContainer = styled(ChipsContainer)<MultiSelectStyleType>`
  border: 1px solid ${({isSelected}) => getBorderColor(isSelected)};
  background-color: ${({isSelected}) => getBackgroundColor(isSelected)};
`;

export const MultiChipsText = styled(ChipsText)<MultiSelectStyleType>`
  color: ${({isSelected}) => getTextColor(isSelected)};
`;

export const MultiListContainer = styled.View`
  max-width: 350px;
  gap: 8px;
`;

export const MultiListLabel = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  margin-left: 4px;
  color: ${colors.TextNeutral};
`;

export const MultiListBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;

export const AddChipsContainer = styled(ChipsContainer)<AddStyleType>`
  border: 1px solid ${({isActive}) => getBorderColor(isActive)};
  background-color: ${({isActive}) => getBackgroundColor(isActive)};
`;

export const AddChipsText = styled(ChipsText)<AddStyleType>`
  color: ${({isActive}) => getTextColor(isActive)};
`;
