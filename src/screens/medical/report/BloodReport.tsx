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
import {BloodReportType} from './types';

const getKoreanStatus = (status: string | undefined) => {
  switch (status) {
    case 'good':
      return '정상 수치';
    case 'high':
      return '고혈당 수치';
    case 'low':
      return '저혈당 수치';
    case 'danger':
      return '위험 수치';
    default:
      return '';
  }
};

export default function BloodReport({
  monthlyAvg,
  monthlyAvgStatus,
}: BloodReportType) {
  const koreanStatus = getKoreanStatus(monthlyAvgStatus);

  return (
    <BloodReportContainer>
      <MonthReportContainer>
        <ReportTitle weight="bold" color={colors.TextNormal}>
          월 평균 혈당
        </ReportTitle>
        <BloodReportContentBox>
          <BloodReportValueBox>
            <BloodReportValue>{monthlyAvg}</BloodReportValue>
            <ReportValueText color={colors.TextDisabled}>mg/dl</ReportValueText>
          </BloodReportValueBox>
          <BloodReportValueBox>
            <BloodSugarItem type="report" name={monthlyAvgStatus} />
            <ReportValueText color={colors.TextNormal}>
              {koreanStatus}
            </ReportValueText>
          </BloodReportValueBox>
        </BloodReportContentBox>
      </MonthReportContainer>
      <BloodFigureContainer>
        <BloodSugarImageItem name={monthlyAvgStatus} />
        <ReportValueText color={colors.TextNormal}>
          이번 달은{' '}
          <ReportTitle color={colors.primaryNormal} weight="bold">
            {koreanStatus}
          </ReportTitle>
          {'를 잘 유지하고 있어요.\n이대로만 유지해주세요!'}
        </ReportValueText>
      </BloodFigureContainer>
    </BloodReportContainer>
  );
}
