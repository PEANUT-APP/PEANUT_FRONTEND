import React from 'react';
import {
  MonthReportContainer,
  BloodReportContainer,
  ReportTitle,
  BloodReportContentBox,
  BloodReportValueBox,
  BloodReportValue,
  ReportValueText,
  BloodReportImage,
  BloodFigureContainer,
  BloodFigureImage,
} from './styles';
import {colors} from '../../../styles/colors';

export default function BloodReport() {
  return (
    <BloodReportContainer>
      <MonthReportContainer>
        <ReportTitle weight="bold" color={colors.TextNormal}>
          월 평균 혈당
        </ReportTitle>
        <BloodReportContentBox>
          <BloodReportValueBox>
            <BloodReportValue>103</BloodReportValue>
            <ReportValueText color={colors.TextDisabled}>mg/dl</ReportValueText>
          </BloodReportValueBox>
          <BloodReportValueBox>
            <BloodReportImage />
            <ReportValueText color={colors.TextNormal}>
              정상 수치
            </ReportValueText>
          </BloodReportValueBox>
        </BloodReportContentBox>
      </MonthReportContainer>
      <BloodFigureContainer>
        <BloodFigureImage />
        <ReportValueText color={colors.white}>
          이번 달은{' '}
          <ReportTitle color={colors.white} weight="bold">
            정상 수치
          </ReportTitle>
          {'를 잘 유지하고 있어요.\n이대로만 유지해주세요!'}
        </ReportValueText>
      </BloodFigureContainer>
    </BloodReportContainer>
  );
}
