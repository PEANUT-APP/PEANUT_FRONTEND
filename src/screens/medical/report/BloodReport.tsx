import React from 'react';
import {
  MonthReportContainer,
  BloodReportContainer,
  ReportTitle,
  BloodReportContentBox,
  BloodReportValueBox,
  BloodReportValue,
  ReportValueText,
  BloodFigureContainer,
} from './styles';
import {colors} from '../../../styles/colors';
import {BloodSugarItem} from '../item/CalendarItem';
import {BloodSugarImageItem} from '../item/ImageItem';

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
            <BloodSugarItem type="report" name="good" />
            <ReportValueText color={colors.TextNormal}>
              정상 수치
            </ReportValueText>
          </BloodReportValueBox>
        </BloodReportContentBox>
      </MonthReportContainer>
      <BloodFigureContainer>
        <BloodSugarImageItem name="good" />
        <ReportValueText color={colors.TextNormal}>
          이번 달은{' '}
          <ReportTitle color={colors.primaryNormal} weight="bold">
            정상 수치
          </ReportTitle>
          {'를 잘 유지하고 있어요.\n이대로만 유지해주세요!'}
        </ReportValueText>
      </BloodFigureContainer>
    </BloodReportContainer>
  );
}
