import {EMAIL_VALIDATION_PATTERN} from './constants';

export const useValidationRules = (
  verificationCodeFromServer?: string | undefined,
) => {
  return {
    email: {
      required: '이메일이 필요해요!',
      pattern: {
        value: EMAIL_VALIDATION_PATTERN,
        message: '유효한 이메일 형식이 아니에요!',
      },
    },
    confirmationCode: {
      required: '인증번호가 필요해요!',
      validate: (value: string) => {
        if (value === verificationCodeFromServer) {
          return true;
        }
        return '잘못된 인증번호입니다';
      },
    },
    phoneNumber: {
      required: '전화번호가 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '전화번호는 숫자로만 작성해주세요!';
        }
        return true;
      },
    },
    gender: {
      required: '성별이 필요해요!',
    },
    birth: {
      required: '생일이 필요해요!',
    },
    name: {
      required: '이름이 필요해요!',
    },
    password: {
      required: '비밀번호가 필요해요!',
    },
    weight: {
      required: '몸무게 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '몸무게는 숫자여야 합니다!';
        }
        return true;
      },
    },
    height: {
      required: '키가 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '키는 숫자여야 합니다!';
        }
        return true;
      },
    },
    nickname: {
      required: '닉네임이 필요해요!',
      /*validate: async (value: string) => {
        // 서버와 소통하는 비동기 로직 추가
        // const isUnique = await checkNicknameUnique(value);
        const isUnique = value === '땅콩'; // 서버에서 유일한 값이라는 응답을 받았다고 가정
        if (!isUnique) {
          return '이미 사용 중인 닉네임입니다!';
        }
        return true;
      },*/
    },
    medicineName: {
      required: '약 이름이 필요해요!',
    },
    productName: {
      required: '인슐린 이름이 필요해요!',
    },
    dosage: {
      required: '투여량이 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '투여량은 숫자로 입력해주세요!';
        }
        return true;
      },
    },
    bloodSugar: {
      required: '혈당값이 필요해요!',
      validate: (value: string) => {
        const numberValue = parseFloat(value);
        if (!value || isNaN(numberValue) || numberValue <= 0) {
          return '혈당은 숫자로 입력해주세요!';
        }
        return true;
      },
    },
    measurementCondition: {
      required: '값이 필요해요!',
    },
    memo: {},
    foodTime: {},
  };
};
