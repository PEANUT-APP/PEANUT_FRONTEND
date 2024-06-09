import React, {ReactNode, useState} from 'react';
import Sign from './Sign';
import {FormData} from '../../components/input/types';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useForm} from 'react-hook-form';
import Input from '../../components/input/Input';
import {validationRules} from '../../modules/validationRules';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {handleFormError, handleFormSubmit} from '../../modules/formHandler';

export default function BasicInformation() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
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

  const handleNextStep = async () => {
    const fields: (keyof FormData)[] = ['password', 'name', 'birth', 'gender'];
    const result = await trigger(fields[step]);

    if (result) {
      step < 3
        ? setStep(step + 1)
        : handleSubmit(
            () => handleFormSubmit(navigation, 'AdditionalInformation'),
            handleFormError,
          )();
    } else {
      handleFormError(errors);
    }
  };

  const renderInput = (
    name: keyof FormData,
    placeholder: string,
    secureTextEntry = false,
    icon?: ReactNode,
  ) => (
    <Input
      placeholder={placeholder}
      name={name}
      control={control}
      rules={validationRules[name]}
      errors={errors}
      editable={true}
      icon={icon}
      touchedFields={touchedFields}
      returnKeyType="next"
      trigger={trigger}
      secureTextEntry={secureTextEntry}
    />
  );

  return (
    <Sign
      title="기본 정보 입력"
      button={
        <PrimaryButton size="l" onPress={handleNextStep}>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}>
      {step >= 3 &&
        renderInput(
          'gender',
          '성별',
          false,
          <DesignIcon type="drop" size="l" color={colors.TextDisabled} />,
        )}
      {step >= 2 && renderInput('birth', '생년월일')}
      {step >= 1 && renderInput('name', '이름')}
      {step >= 0 && renderInput('password', '비밀번호', true)}
    </Sign>
  );
}
