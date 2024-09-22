import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Title} from '../../components/text/Text';

const Container = styled.View`
  flex: 1;
  padding: 72px 20px 0;
  align-items: center;
  gap: 28px;
  background-color: ${colors.background};
`;

const Box = styled.View`
  align-items: center;
`;

export const RecordingContainer = styled(Container)<{isData: boolean}>`
  gap: ${({isData}) => (isData ? '20px' : '28px')};
`;

export const RecordContainer = styled(Container)`
  gap: 16px;
`;

export const RecordingBox = styled(Box)`
  gap: 20px;
`;

export const RecordBox = styled(Box)`
  gap: 18px;
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

export const RecordContentBox = styled.View`
  gap: 8px;
`;

export const RecordingContent = styled.View`
  gap: 12px;
`;

export const RecordingButtonPair = styled.View`
  gap: 8px;
`;
