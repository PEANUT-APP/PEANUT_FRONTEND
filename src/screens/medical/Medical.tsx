import React, {useMemo} from 'react';
import ScrollLayout from '../layout/ScrollLayout';
import {
  MedicalBox,
  MedicalChipBox,
  MedicalContainer,
  MedicalTitle,
} from './styles';
import SelectChips from '../../components/select/SelectChips';
import {useMedical} from './hooks';
import MonthCalendar from '../../components/calendar/MonthCalendar';
import BloodReport from './report/BloodReport';
import MedicineReport from './report/MedicineReport';

export default function Medical() {
  const {selectedChip, handleSelectChip} = useMedical();

  const chipItems = useMemo(() => ['혈당', '인슐린', '복약'], []);

  const ReportComponent =
    selectedChip === '혈당' ? BloodReport : MedicineReport;

  return (
    <ScrollLayout paddingBottom={124}>
      <MedicalContainer>
        <MedicalTitle weight="bold">진료 노트</MedicalTitle>
        <MedicalBox>
          <MedicalChipBox>
            {chipItems.map(item => (
              <SelectChips
                key={item}
                isSelected={selectedChip === item}
                onPress={() => handleSelectChip(item)}>
                {item}
              </SelectChips>
            ))}
          </MedicalChipBox>
          <MonthCalendar />
          <ReportComponent />
        </MedicalBox>
      </MedicalContainer>
    </ScrollLayout>
  );
}