import React, {useMemo} from 'react';
import ScrollLayout from '../layout/ScrollLayout';
import {
  MedicalBox,
  MedicalCalendarBox,
  MedicalChipBox,
  MedicalContainer,
  MedicalTitle,
} from './styles';
import SelectChips from '../../components/select/SelectChips';
import {useMedical} from './hooks';
import MonthCalendar from '../../components/calendar/MonthCalendar';
import BloodReport from './report/BloodReport';
import MedicineReport from './report/MedicineReport';
import Guide from './guide/Guide';

const CHIP_ITEMS = ['혈당', '인슐린', '복약'] as const;

export default function Medical() {
  const {
    currentDate,
    setCurrentDate,
    selectedChip,
    handleSelectChip,
    bloodDailyStatuses,
    bloodMonthlyAvg,
    bloodMonthlyAvgStatus,
    bloodMonthlyMessage,
    insulinDailyStatuses,
    insulinMonthlyAvg,
    insulinMonthlyAvgStatus,
    insulinMonthlyMessage,
    medicineDailyStatuses,
    medicineMonthlyAvg,
    medicineMonthlyAvgStatus,
    medicineMonthlyMessage,
    calendarType,
    refreshing,
    onRefresh,
  } = useMedical();

  const renderReport = useMemo(() => {
    const reportProps = {
      혈당: {
        component: BloodReport,
        monthlyAvg: bloodMonthlyAvg,
        monthlyAvgStatus: bloodMonthlyAvgStatus,
        monthlyMessage: bloodMonthlyMessage,
      },
      인슐린: {
        component: MedicineReport,
        monthlyAvg: insulinMonthlyAvg,
        monthlyAvgStatus: insulinMonthlyAvgStatus,
        monthlyMessage: insulinMonthlyMessage,
      },
      복약: {
        component: MedicineReport,
        monthlyAvg: medicineMonthlyAvg,
        monthlyAvgStatus: medicineMonthlyAvgStatus,
        monthlyMessage: medicineMonthlyMessage,
      },
    };

    const Report = reportProps[selectedChip].component;
    return (
      <Report
        monthlyAvg={reportProps[selectedChip].monthlyAvg}
        monthlyAvgStatus={reportProps[selectedChip].monthlyAvgStatus}
        monthlyMessage={reportProps[selectedChip].monthlyMessage}
      />
    );
  }, [
    selectedChip,
    bloodMonthlyAvg,
    bloodMonthlyAvgStatus,
    bloodMonthlyMessage,
    insulinMonthlyAvg,
    insulinMonthlyAvgStatus,
    insulinMonthlyMessage,
    medicineMonthlyAvg,
    medicineMonthlyAvgStatus,
    medicineMonthlyMessage,
  ]);

  return (
    <ScrollLayout
      paddingBottom={124}
      refreshing={refreshing}
      onRefresh={onRefresh}>
      <MedicalContainer>
        <MedicalTitle weight="bold">진료 노트</MedicalTitle>
        <MedicalBox>
          <MedicalChipBox>
            {CHIP_ITEMS.map(item => (
              <SelectChips
                key={item}
                isSelected={selectedChip === item}
                onPress={() => handleSelectChip(item)}>
                {item}
              </SelectChips>
            ))}
          </MedicalChipBox>
          <MedicalCalendarBox>
            <Guide type={selectedChip === '혈당' ? 'bloodSugar' : 'average'} />
            <MonthCalendar
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              type={calendarType}
              bloodDailyStatuses={bloodDailyStatuses}
              insulinDailyStatuses={insulinDailyStatuses}
              medicineDailyStatuses={medicineDailyStatuses}
            />
          </MedicalCalendarBox>
          {renderReport}
        </MedicalBox>
      </MedicalContainer>
    </ScrollLayout>
  );
}
