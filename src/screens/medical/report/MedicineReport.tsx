/* eslint-disable react/no-unstable-nested-components */
import React, {Fragment} from 'react';
import {
  MedicineReportBox,
  MedicineReportButton,
  MedicineReportContent,
  MonthReportContainer,
  ReportTitle,
  ReportValueText,
} from './styles';
import {colors} from '../../../styles/colors';
import {PrimaryTextButton} from '../../../components/button/TextButton';
import DesignIcon from '../../../components/icon/DesignIcon';
import {splitMessage, useMedical} from '../hooks';
import {AverageImageItem} from '../item/ImageItem';
import {MedicineReportType} from './types';

export default function MedicineReport({
  monthlyAvg,
  monthlyAvgStatus,
  monthlyMessage,
}: MedicineReportType) {
  const {handleGoAlarm} = useMedical();
  const messageParts = splitMessage(monthlyMessage || '');

  return (
    <MonthReportContainer>
      <ReportTitle weight="bold" color={colors.TextNormal}>
        월 평균 리포트
      </ReportTitle>
      <MedicineReportBox>
        <AverageImageItem name={monthlyAvgStatus} />
        <MedicineReportContent>
          <ReportValueText>
            {messageParts.map((part, index) => (
              <Fragment key={index}>
                {monthlyAvg !== null && part.includes(`${monthlyAvg}일`)
                  ? part.split(`${monthlyAvg}일`).map((text, i) => (
                      <Fragment key={i}>
                        {text}
                        {i === 0 && (
                          <ReportValueText
                            weight="bold"
                            color={colors.primaryNormal}>
                            {` ${monthlyAvg}일`}
                          </ReportValueText>
                        )}
                      </Fragment>
                    ))
                  : part}
              </Fragment>
            ))}
          </ReportValueText>
        </MedicineReportContent>
      </MedicineReportBox>
      <MedicineReportButton>
        <PrimaryTextButton
          size="s"
          right={true}
          icon={({size}) => (
            <DesignIcon type="front" size={size} color={colors.TextDisabled} />
          )}
          onPress={handleGoAlarm}>
          까먹지 않게 알림 설정하기
        </PrimaryTextButton>
      </MedicineReportButton>
    </MonthReportContainer>
  );
}
