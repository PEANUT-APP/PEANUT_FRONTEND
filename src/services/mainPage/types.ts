export interface UserInfoReturnType {
  currentBloodSugarLevel: string;
  fastingBloodSugarLevel: string;
  profileUrl: string;
  userId: number;
  userName: string;
}

export interface BloodSugarRecord {
  value: number; // 혈당 값
  time: string; // 기록된 시간
}

export interface BloodSugarItem {
  [key: string]: BloodSugarRecord;
}

export interface AdditionalInfoReturnType {
  bloodSugarList: BloodSugarItem[] | [];
  insulinState: boolean;
  insulinName: string;
  insulinDosage: string;
  insulinTime: string;
  medicationState: boolean;
  medicineName: string;
  medicineTime: string;
}

export interface SaveStatusFormType {
  date: string;
  insulinStatus: boolean;
  medicineStatus: boolean;
}

export interface PatientAdditionalInfoReturnType {
  bloodSugarList: BloodSugarItem[];
  insulinAlam: boolean;
  insulinName: string;
  medicationAlam: boolean;
  medicineName: string;
}

export interface FoodReturnType {
  carbohydrate: number;
  fat: number;
  protein: number;
}
