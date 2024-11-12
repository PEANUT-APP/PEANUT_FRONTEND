export interface MedicineFormType {
  alarm: boolean;
  intakeDays: string[];
  intakeTime: string[];
  medicineName: string;
}

export interface MedicineRecordReturnType {
  id: number;
  intakeDays: string[];
  intakeTime: string[];
  medicineName: string;
  activeStatus: string;
}

interface DailyStatus {
  recordStatus: string;
  recordDate: string;
}

export interface TransformedMedicineDailyStatus {
  recordStatus: 'great' | 'normal' | 'bad' | string;
  recordDate: string;
}

export interface MedicineReportReturnType {
  dailyStatuses: DailyStatus[];
  monthlyStatusMessage: string;
}

export interface TransformedMedicineReportReturnType {
  dailyStatuses: TransformedMedicineDailyStatus[];
  monthlyStatusMessage: string;
}

export interface MedicineRecordFormType {
  activeStatus: boolean;
  medicineId: number;
}
