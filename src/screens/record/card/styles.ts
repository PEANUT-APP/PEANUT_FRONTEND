import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body2, Caption2, Heading} from '../../../components/text/Text';

export const RecordCardContainer = styled.View`
  width: 350px;
  padding: 20px 24px;
  border-radius: 6px;
  background-color: ${colors.white};
  gap: 5px;
`;

export const RecordCardTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RecordCardTitleText = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNormal};
`;

export const RecordCardContentBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const RecordCardInfoBox = styled.View`
  gap: 4px;
`;

export const RecordCardDate = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextNeutral};
`;

export const RecordTagBox = styled.View`
  flex-direction: row;
  gap: 4px;
`;

export const TagBox = styled.View<{isOngoing?: boolean}>`
  height: 21px;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${({isOngoing}) =>
    isOngoing ? colors.SolidSecondaryActive : colors.SolidDisabled};
`;

export const TagText = styled(Caption2)<{isOngoing?: boolean}>`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  color: ${({isOngoing}) =>
    isOngoing ? colors.primaryStrong : colors.TextDisabled};
`;
