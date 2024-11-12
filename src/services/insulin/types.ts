export interface InsulinFormType {
  alarm: boolean;
  administrationTime: string[];
  dosage: string;
  productName: string;
}

export interface InsulinRecordReturnType {
  id: number;
  administrationTime: string[];
  dosage: string;
  productName: string;
  activeStatus: string;
}

interface DailyStatus {
  recordStatus: string;
  recordDate: string;
}

export interface TransformedInsulinDailyStatus {
  recordStatus: 'great' | 'normal' | 'bad' | string;
  recordDate: string;
}

export interface InsulinReportReturnType {
  dailyStatuses: DailyStatus[];
  monthlyStatusMessage: string;
}

export interface TransformedInsulinReportReturnType {
  dailyStatuses: TransformedInsulinDailyStatus[];
  monthlyStatusMessage: string;
}

export interface InsulinRecordFormType {
  activeStatus: boolean;
  insulinId: number;
}
