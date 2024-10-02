import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Heading, Title} from '../../components/text/Text';

const Container = styled.View`
  flex: 1;
  padding: 72px 20px 0;
  align-items: center;
  background-color: ${colors.background};
`;

const Box = styled.View`
  align-items: center;
`;

export const MealBack = styled.TouchableOpacity`
  width: 350px;
`;

export const RecordingContainer = styled(Container)`
  gap: 20px;
`;

export const RecordContainer = styled(Container)`
  gap: 12px;
`;

export const FeedbackContainer = styled(Container)`
  gap: 20px;
`;

export const RecordingBox = styled(Box)`
  gap: 20px;
`;

export const RecordBox = styled(Box)`
  gap: 35px;
`;

export const FeedbackBox = styled(Box)`
  margin-top: 20px;
  gap: 8px;
`;

export const RecordingTitleBox = styled.View`
  width: 350px;
  gap: 20px;
`;

export const MealTitle = styled(Title)`
  width: 350px;
  line-height: 32.016px;
  letter-spacing: -0.6px;
  color: ${colors.TextNormal};
`;

export const RecordingContentBox = styled.View`
  gap: 4px;
`;

export const RecordContentBox = styled.View`
  gap: 8px;
`;

export const MealContent = styled.View`
  gap: 12px;
`;

export const RecordingButtonPair = styled.View<{isData: boolean}>`
  margin-top: ${({isData}) => (isData ? '20px' : '28px')};
  gap: 8px;
`;

export const FeedbackSelectBox = styled.View`
  flex-direction: row;
  gap: 4px;
`;

export const FeedbackFoodBox = styled.View`
  width: 350px;
  height: 88px;
  border-radius: 6px;
  background-color: ${colors.white};
  padding: 0 24px;
  justify-content: center;
  gap: 7px;
`;

export const FeedbackFoodText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const FeedbackTextBox = styled.View`
  width: 350px;
  padding: 20px 24px;
  justify-content: center;
  gap: 12px;
  border-radius: 8px;
  background-color: ${colors.primaryNormal};
`;

export const FeedbackTextTitle = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.white};
`;

export const FeedbackText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.white};
`;
