import {BIRTH_VALIDATION_PATTERN, EMAIL_VALIDATION_PATTERN} from './constants';

export const useValidationRules = (
  verificationCodeFromServer?: string | undefined,
) => {
  return {
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
        if (value === verificationCodeFromServer) {
          return true;
        }
        return '잘못된 인증번호입니다';
      },
    },
    phoneNumber: {
      required: '값이 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '숫자로만 작성해주세요!';
        }
        return true;
      },
    },
    gender: {
      required: '값이 필요해요!',
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
    weight: {
      required: '값이 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '몸무게는 숫자여야 합니다!';
        }
        return true;
      },
    },
    height: {
      required: '값이 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '키는 숫자여야 합니다!';
        }
        return true;
      },
    },
    nickname: {
      required: '값이 필요해요!',
      validate: async (value: string) => {
        // 서버와 소통하는 비동기 로직 추가
        // const isUnique = await checkNicknameUnique(value);
        const isUnique = value === '땅콩'; // 서버에서 유일한 값이라는 응답을 받았다고 가정
        if (!isUnique) {
          return '이미 사용 중인 닉네임입니다!';
        }
        return true;
      },
    },
  };
};
