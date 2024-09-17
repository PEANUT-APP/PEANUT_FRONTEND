import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Title} from '../../components/text/Text';

export const RecordingContainer = styled.View`
  flex: 1;
  padding: 72px 20px 0;
  align-items: center;
  gap: 28px;
  background-color: ${colors.background};
`;

export const RecordingBox = styled.View`
  gap: 20px;
  align-items: center;
`;

export const RecordingTitleBox = styled.View`
  width: 350px;
  gap: 20px;
`;

export const RecordingTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
`;

export const RecordingContentBox = styled.View`
  gap: 4px;
`;

export const RecordingContent = styled.View`
  gap: 12px;
`;

export const RecordingButtonPair = styled.View`
  gap: 8px;
`;
