export interface VerifyFormType {
  email: string;
  confirmationCode: string;
}

export interface SendEmailFormType {
  email: string;
}

export interface SendEmailReturnType {
  'Confirmation : ': string;
}

export interface VerifyEmailFormType {
  confirmationCode: string;
}

export interface BasicFormType {
  birth: string;
  gender: string;
  name: string;
  password: string;
  phoneNumber: string;
}

export interface AdditionalFormType {
  nickname: string;
  weight: string;
  height: string;
}

export interface SignUpFormType {
  birth: string;
  gender: string;
  height: string;
  name: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  weight: string;
}

export interface SignInFormType {
  email: string;
  password: string;
  fcmToken: string | null;
}
