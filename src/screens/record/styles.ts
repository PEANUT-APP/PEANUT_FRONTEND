import styled from 'styled-components/native';
import {Body1, Title} from '../../components/text/Text';
import {colors} from '../../styles/colors';

export const RecordContainer = styled.View`
  flex: 1;
  padding: 72px 20px 0;
  align-items: center;
  gap: 36px;
  background-color: ${colors.background};
`;

export const RecordBox = styled.View`
  gap: 20px;
  align-items: center;
`;

export const RecordTitleBox = styled.View`
  width: 350px;
  gap: 20px;
`;

export const RecordTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
`;

export const RecordFormBox = styled.View`
  gap: 16px;
  align-items: center;
`;

export const RecordToggle = styled.View`
  width: 346px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RecordToggleText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;
