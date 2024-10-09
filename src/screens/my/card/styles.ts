import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body2, Caption1, Caption2} from '../../../components/text/Text';

export const MyCardContainer = styled.TouchableOpacity`
  width: 110px;
  height: 76px;
  border-radius: 6px;
  background-color: ${colors.white};
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 8px;
`;

export const MyCommentIcon = styled.View`
  margin-top: 8px;
`;

export const CardText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

export const PatientCardContainer = styled.View`
  width: 350px;
  border-radius: 6px;
  background-color: ${colors.white};
  padding: 20px;
  gap: 8px;
`;

export const PatientCardTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PatientCardTitle = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextNormal};
`;

export const PatientCardBox = styled.View`
  align-items: center;
  gap: 4px;
`;

export const PatientCardImage = styled.View`
  width: 78px;
  height: 76px;
  background-color: #d9d9d9;
`;

export const PatientCardInfoBox = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const PatientCardProfile = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: ${colors.SolidTertiaryActive};
`;

export const PatientCardNoneProfile = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: ${colors.SolidTertiaryActive};
`;

export const PatientCardContentBox = styled.View`
  gap: 2px;
`;

export const PatientCardInfo = styled.View`
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

export const PatientCardInfoText = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  color: ${colors.TextNeutral};
`;
