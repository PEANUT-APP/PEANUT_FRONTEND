import React, {Fragment} from 'react';
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
import {splitMessage} from '../hooks';

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
  monthlyMessage,
}: BloodReportType) {
  const koreanStatus = getKoreanStatus(monthlyAvgStatus);
  const messageParts = splitMessage(monthlyMessage || '');

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
          {messageParts.map((part, index) => {
            if (part.includes(koreanStatus)) {
              return (
                <Fragment key={index}>
                  {part.split(koreanStatus).map((text, i) => (
                    <Fragment key={i}>
                      {text}
                      {i === 0 && (
                        <ReportTitle weight="bold" color={colors.primaryNormal}>
                          {koreanStatus}
                        </ReportTitle>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              );
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
          })}
        </ReportValueText>
      </BloodFigureContainer>
    </BloodReportContainer>
  );
}
