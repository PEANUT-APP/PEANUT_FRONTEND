import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {handleNextStep, useBasicInformation} from './hooks';
import RenderInput from '../../modules/renderInput';
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
    handleBasicFormSubmit,
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
              fields: ['password', 'name', 'birth', 'gender', 'phoneNumber'],
              trigger,
              handleSubmit,
              navigation,
              targetScreen: 'AdditionalInformation',
              errors,
              handleBasicFormSubmit,
            })
          }
          disabled={isButtonDisabled}>
          다음
        </PrimaryButton>
      }
      step={step}
      setStep={setStep}>
      {step >= 4 &&
        RenderInput({
          name: 'phoneNumber',
          placeholder: '전화번호',
          control,
          errors,
          touchedFields,
          trigger,
        })}
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
        RenderInput({
          name: 'birth',
          placeholder: '생년월일',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 1 &&
        RenderInput({
          name: 'name',
          placeholder: '이름',
          control,
          errors,
          touchedFields,
          trigger,
        })}
      {step >= 0 &&
        RenderInput({
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
