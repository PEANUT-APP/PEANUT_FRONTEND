export interface GetPatientReturnType {
  birthday: string;
  gender: string;
  name: string;
  phoneNumber: string;
  profileImage: string;
}

export interface GetPatientFormType {
  email: string;
}

export interface UpdateFormType {
  formData: FormData;
  nickname: string;
  height: string;
  weight: string;
}

export interface MyCommunityReturnType {
  comment: number;
  content: string;
  create_At: string;
  like: number;
  title: string;
  userName: string;
}
