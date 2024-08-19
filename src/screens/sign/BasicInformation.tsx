import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {handleNextStep, useBasicInformation} from './hooks';
import renderInput from './renderInput';
import Dropdown from '../../components/dropdown/Dropdown';

export default function BasicInformation() {
  const {
    navigation,
    step,
    setStep,
    control,
    handleSubmit,
    trigger,
    errors,
    touchedFields,
    isButtonDisabled,
    setValue,
    setFocus,
  } = useBasicInformation();

  return (
    <Sign
      title="기본 정보 입력"
      button={
        <PrimaryButton
          size="l"
          onPress={() =>
            handleNextStep({
              step,
              setStep,
              fields: ['password', 'name', 'birth', 'gender'],
              trigger,
              handleSubmit,
              navigation,
              targetScreen: 'AdditionalInformation',
              errors,
            })
          }
          disabled={isButtonDisabled}>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}
      type="SignUp">
      {step >= 3 && (
        <Dropdown
          control={control}
          errors={errors}
          touchedFields={touchedFields}
          trigger={trigger}
          setValue={setValue}
          setFocus={setFocus}
        />
      )}
      {step >= 2 &&
        renderInput({
          name: 'birth',
          placeholder: '생년월일',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 1 &&
        renderInput({
          name: 'name',
          placeholder: '이름',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 0 &&
        renderInput({
          name: 'password',
          placeholder: '비밀번호',
          control,
          errors,
          touchedFields,
          trigger,
          secureTextEntry: true,
        })}
    </Sign>
  );
}
