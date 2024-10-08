/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
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
import {useMedical} from '../hooks';
import {AverageImageItem} from '../item/ImageItem';

export default function MedicineReport() {
  const {handleGoAlarm} = useMedical();

  return (
    <MonthReportContainer>
      <ReportTitle weight="bold" color={colors.TextNormal}>
        월 평균 리포트
      </ReportTitle>
      <MedicineReportBox>
        <AverageImageItem name="bad" />
        <MedicineReportContent>
          <ReportValueText color={colors.TextNormal}>
            총 투여량의{' '}
            <ReportValueText weight="bold" color={colors.primaryStrong}>
              50%
            </ReportValueText>
            를 투여했어요.{'\n'}다음부턴 까먹지 말고 목표치에 도달할 수 있도록
            해요.
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
