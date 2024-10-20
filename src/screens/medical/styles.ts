import styled from 'styled-components/native';
import {Title} from '../../components/text/Text';
import {colors} from '../../styles/colors';

export const MedicalContainer = styled.View`
  flex: 1;
  padding: 72px 20px 0;
  align-items: center;
  gap: 20px;
`;

export const MedicalTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  color: ${colors.TextNormal};
  width: 350px;
`;

export const MedicalBox = styled.View`
  flex: 1;
  gap: 12px;
`;

export const MedicalChipBox = styled.View`
  width: 350px;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const MedicalCalendarBox = styled.View`
  gap: 8px;
  margin-bottom: 4px;
`;
