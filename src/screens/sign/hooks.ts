import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {FormData} from '../../components/input/types';
import {HandleNextStepProps} from './types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {useEffect, useState} from 'react';
import {
  useSendSimpleMessageMutation,
  useSignInMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
} from '../../services/sign/signApi';
import {
  AdditionalFormType,
  BasicFormType,
  SendEmailFormType,
  SignInFormType,
  VerifyEmailFormType,
  VerifyFormType,
} from '../../services/sign/types';
import {useDispatch, useSelector} from 'react-redux';
import {updateForm} from '../../slices/formSlice';
import {RootState} from '../../store/store';
import {login} from '../../slices/tokenSlice';
import {handleFormError} from '../../modules/formHandler';
import {useAuth} from '../../modules/useAuth';

export const handleNextStep = async ({
  step,
  setStep,
  fields,
  trigger,
  handleSubmit,
  errors,
  handleBasicFormSubmit,
  handleAdditionalFormSubmit,
  handleSignInFormSubmit,
}: HandleNextStepProps) => {
  const result = await trigger(fields[step]);

  if (result) {
    if (step < fields.length - 1) {
      setStep(step + 1);
    } else if (handleBasicFormSubmit) {
      handleSubmit(handleBasicFormSubmit, handleFormError)();
    } else if (handleAdditionalFormSubmit) {
      handleSubmit(handleAdditionalFormSubmit, handleFormError)();
    } else if (handleSignInFormSubmit) {
      handleSubmit(handleSignInFormSubmit, handleFormError)();
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
  const dispatch = useDispatch();

  const {setIsInitialRender} = useAuth();

  const [signIn] = useSignInMutation();

  const [step, setStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
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

  const handleSignInFormSubmit = async (data: SignInFormType) => {
    try {
      const response = await signIn(data).unwrap();
      dispatch(login(response.token));
      navigation.navigate('Home');
      reset();
      setStep(0);
      setIsInitialRender(false);
    } catch (error) {
      console.log(error);
      Alert.alert('로그인에 실패했습니다!');
    }
  };

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
    handleSignInFormSubmit,
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
  const [verificationCode, setVerificationCode] = useState('');

  const navigation = useNavigation<NavigationProp<ParamList>>();

  const [sendSimpleMessage] = useSendSimpleMessageMutation();
  const [verifyEmail] = useVerifyEmailMutation();

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: {errors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      confirmationCode: '',
    },
    mode: 'onBlur',
  });

  const emailWatch = watch('email');
  const verificationWatch = watch('confirmationCode');

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
        const isValid = await trigger('confirmationCode');
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
  const handleSendEmail = async (data: SendEmailFormType) => {
    try {
      const response = await sendSimpleMessage(data.email || email).unwrap();
      setVerification(true);
      setVerificationCode(response['Confirmation : ']);
      setValue('confirmationCode', '');
      setTimer(180); // 타이머를 180초로 초기화
      setIsTimerActive(true); // 타이머 다시 활성화
      setEmail(data.email);
    } catch (error) {
      console.error(error);
      Alert.alert('인증번호 발송이 실패했습니다.');
    }
  };

  // 인증 처리
  const handleVerify = async (data: VerifyEmailFormType) => {
    try {
      await verifyEmail(data.confirmationCode).unwrap();
      navigation.navigate('BasicInformation');
      setVerification(false);
    } catch (error) {
      console.error(error);
      Alert.alert('인증에 실패했습니다.');
    }
  };

  const handleSignUpFormSubmit = (data: VerifyFormType) => {
    if (!verification) {
      handleSendEmail(data);
    } else {
      handleVerify(data);
    }
  };

  return {
    verification,
    setVerification,
    control,
    handleSubmit,
    handleSignUpFormSubmit,
    errors,
    trigger,
    touchedFields,
    timer,
    isTimerActive,
    isButtonDisabled,
    handleSendEmail,
    isVerificationCodeValid,
    verificationCode,
  };
};

export const useBasicInformation = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
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
  const phoneNumberWatch = watch('phoneNumber');

  useEffect(() => {
    const validateStep = async () => {
      let isValid = false;

      switch (step) {
        case 0:
          isValid = !!getValues('password');
          break;
        case 1:
          isValid = !!getValues('name');
          break;
        case 2:
          isValid = !!getValues('birth');
          break;
        case 3:
          isValid = !!getValues('gender');
          break;
        case 4:
          isValid = !!getValues('phoneNumber');
          break;
        default:
          isValid = false;
      }

      setIsButtonDisabled(!isValid);
    };

    validateStep();
  }, [
    step,
    passwordWatch,
    nameWatch,
    birthWatch,
    genderWatch,
    phoneNumberWatch,
    trigger,
    getValues,
  ]);

  const handleBasicFormSubmit = (data: BasicFormType) => {
    dispatch(updateForm(data));
    navigation.navigate('AdditionalInformation');
  };

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
    handleBasicFormSubmit,
  };
};

export const useAdditionalInformation = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form); // Redux 상태 가져오기

  const [signUp] = useSignUpMutation();

  const [step, setStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    getValues,
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
  const heightWatch = watch('height');
  const weightWatch = watch('weight');

  useEffect(() => {
    const validateStep = async () => {
      let isValid = false;

      switch (step) {
        case 0:
          isValid = !!getValues('nickname');
          break;
        case 1:
          isValid = !!getValues('height');
          break;
        case 2:
          isValid = !!getValues('weight');
          break;
        default:
          isValid = false;
      }

      setIsButtonDisabled(!isValid);
    };

    validateStep();
  }, [step, nicknameWatch, heightWatch, weightWatch, trigger, getValues]);

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

  const handleAdditionalFormSubmit = async (data: AdditionalFormType) => {
    dispatch(updateForm(data));

    try {
      console.log(formData);
      const response = await signUp(formData).unwrap();
      console.log(response);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
      Alert.alert('회원가입에 실패했습니다.');
    }
  };

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
    isNicknameValid,
    handleAdditionalFormSubmit,
  };
};
