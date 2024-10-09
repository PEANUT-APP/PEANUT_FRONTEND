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
}
