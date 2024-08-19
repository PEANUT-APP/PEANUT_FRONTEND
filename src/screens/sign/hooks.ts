import {FieldErrors, useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {FormData} from '../../components/input/types';
import {HandleNextStepProps} from './types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useCallback, useEffect, useState} from 'react';

export const handleFormSubmit = (navigation: any, navigateTo: string) => {
  Alert.alert('성공', '모든 필드가 유효합니다!');
  navigation.navigate(navigateTo);
};

export const handleFormError = (errs: FieldErrors<FormData>) => {
  const firstError = Object.values(errs)[0];
  Alert.alert('실패', firstError?.message || '알 수 없는 오류가 발생했습니다.');
};

export const handleNextStep = async ({
  step,
  setStep,
  fields,
  trigger,
  handleSubmit,
  navigation,
  targetScreen,
  errors,
}: HandleNextStepProps) => {
  const result = await trigger(fields[step]);

  if (result) {
    if (step < fields.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit(
        () => handleFormSubmit(navigation, targetScreen),
        handleFormError,
      )();
    }
  } else {
    handleFormError(errors);
  }
};

export const useSign = (
  verification?: boolean,
  setVerification?: React.Dispatch<React.SetStateAction<boolean>>,
  step?: number,
  setStep?: React.Dispatch<React.SetStateAction<number>>,
) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (verification) {
      setVerification?.(false);
    } else if (step && step > 0) {
      setStep?.(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return {handleBack};
};

export const useSignIn = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [step, setStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const emailWatch = watch('email');

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await trigger('email');
      setIsButtonDisabled(!isValid);
    };
    validateEmail();
  }, [trigger, emailWatch, step]);

  const handleFindPassword = () => {};

  return {
    navigation,
    step,
    setStep,
    isButtonDisabled,
    control,
    handleSubmit,
    errors,
    trigger,
    touchedFields,
    handleFindPassword,
  };
};

export const useSignUp = () => {
  const [verification, setVerification] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [email, setEmail] = useState('');
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);

  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      verificationCode: '',
    },
    mode: 'onBlur',
  });

  const emailWatch = watch('email');
  const verificationWatch = watch('verificationCode');

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await trigger('email');
      setIsButtonDisabled(!isValid);
    };
    validateEmail();
  }, [trigger, emailWatch]);

  useEffect(() => {
    // 인증 코드 유효성 검사
    const validateVerificationCode = async () => {
      if (verification) {
        const isValid = await trigger('verificationCode');
        setIsVerificationCodeValid(isValid);
        if (isValid) {
          setIsTimerActive(false); // 인증 코드가 유효하면 타이머 비활성화
        }
      }
    };
    validateVerificationCode();
  }, [trigger, verification, verificationWatch]);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const verificationTimer = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(verificationTimer);
    } else if (timer === 0) {
      setIsTimerActive(false); // 타이머가 0초가 되면 비활성화
    }
  }, [isTimerActive, timer]);

  // 이메일 전송 처리 및 타이머 초기화
  const handleSendEmail = useCallback(
    (data: {email: string}) => {
      Alert.alert(data.email || email);
      setTimer(180); // 타이머를 180초로 초기화
      setIsTimerActive(true); // 타이머 다시 활성화
    },
    [email],
  );

  const handleSignUpFormSubmit = useCallback(
    (data: {email: string}) => {
      if (!verification) {
        setVerification(true);
        handleSendEmail(data);
        setEmail(data.email);
      } else {
        Alert.alert('인증 성공');
        setVerification(false);
        navigation.navigate('BasicInformation');
      }
    },
    [verification, handleSendEmail, navigation],
  );

  return {
    verification,
    setVerification,
    control,
    handleSubmit,
    handleSignUpFormSubmit,
    errors,
    trigger,
    touchedFields,
    handleFormSubmit,
    timer,
    isTimerActive,
    isButtonDisabled,
    handleSendEmail,
    isVerificationCodeValid,
  };
};

export const useBasicInformation = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [step, setStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    setFocus,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      gender: '',
      birth: '',
      name: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const passwordWatch = watch('password');
  const nameWatch = watch('name');
  const birthWatch = watch('birth');
  const genderWatch = watch('gender');

  useEffect(() => {
    const validateStep = async () => {
      let isValid = false;

      switch (step) {
        case 0:
          isValid = await trigger('password');
          break;
        case 1:
          isValid = await trigger('name');
          break;
        case 2:
          isValid = await trigger('birth');
          break;
        case 3:
          isValid = await trigger('gender');
          break;
        default:
          isValid = false;
      }

      setIsButtonDisabled(!isValid);
    };

    validateStep();
  }, [step, passwordWatch, nameWatch, birthWatch, genderWatch, trigger]);

  return {
    navigation,
    step,
    setStep,
    control,
    handleSubmit,
    trigger,
    errors,
    touchedFields,
    isButtonDisabled,
    setIsButtonDisabled,
    setValue,
    setFocus,
  };
};

export const useAdditionalInformation = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [step, setStep] = useState(0);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      weight: '',
      height: '',
      nickname: '',
    },
    mode: 'onBlur',
  });

  const nicknameWatch = watch('nickname');

  useEffect(() => {
    const validateNickname = async () => {
      if (nicknameWatch) {
        const isValid = await trigger('nickname');
        setIsNicknameValid(isValid);
      } else {
        setIsNicknameValid(false);
      }
    };

    validateNickname();
  }, [nicknameWatch, trigger]);

  return {
    navigation,
    step,
    setStep,
    control,
    handleSubmit,
    trigger,
    errors,
    touchedFields,
    isNicknameValid,
  };
};
