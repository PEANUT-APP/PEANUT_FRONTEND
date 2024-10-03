import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Body2} from '../../../components/text/Text';

export const MonthReportContainer = styled.View`
  width: 350px;
  gap: 12px;
  padding: 20px;
  border-radius: 6px;
  background-color: ${colors.white};
`;

export const ReportTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const ReportValueText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const BloodReportContainer = styled.View`
  gap: 12px;
`;

export const BloodReportContentBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BloodReportValueBox = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const BloodReportValue = styled.Text`
  font-family: 'Pretendard';
  font-size: 32px;
  font-weight: 700;
  line-height: 30.688px;
  letter-spacing: -0.8px;
  color: ${colors.primaryNormal};
`;

export const BloodReportImage = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 100px;
  background-color: #ffbdbd;
`;

export const BloodFigureContainer = styled.View`
  width: 350px;
  height: 90px;
  padding: 0 20px;
  border-radius: 6px;
  background-color: ${colors.primaryNormal};
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const BloodFigureImage = styled.View`
  width: 56px;
  height: 56px;
  background-color: #d9d9d9;
`;

export const MedicineReportBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const MedicineReportImage = styled.View`
  width: 68px;
  height: 68px;
  border-radius: 100px;
  margin: 5px;
  background-color: #ffbdbd;
`;

export const MedicineReportContent = styled.View`
  width: 225px;
`;

export const MedicineReportButton = styled.View`
  position: absolute;
  bottom: 20px;
  right: 22px;
`;
