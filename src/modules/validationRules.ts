import {BIRTH_VALIDATION_PATTERN, EMAIL_VALIDATION_PATTERN} from './constants';

export const validationRules = {
  email: {
    required: '값이 필요해요!',
    pattern: {
      value: EMAIL_VALIDATION_PATTERN,
      message: '유효한 이메일 형식이 아니에요!',
    },
  },
  verificationCode: {
    required: '값이 필요해요!',
    validate: (value: string) => {
      if (value === '1234') {
        return true;
      }
      return '잘못된 인증번호입니다';
    },
  },
  gender: {
    required: '값이 필요해요!',
    validate: (value: string) =>
      value === '남성' ||
      value === '여성' ||
      '남성/여성 형식으로 작성해주세요!',
  },
  birth: {
    required: '값이 필요해요!',
    pattern: {
      value: BIRTH_VALIDATION_PATTERN,
      message: '생년월일은 YYYY.MM.DD 형식으로 작성해주세요!',
    },
  },
  name: {
    required: '값이 필요해요!',
  },
  password: {
    required: '값이 필요해요!',
  },
};
