import React from 'react';
import Patient from './Patient';
import RenderInput from '../../../modules/renderInput';
import {useConnect} from './hooks';
import PrimaryButton from '../../../components/button/PrimaryButton';

export default function Connect() {
  const {control, errors, touchedFields, trigger, isButtonDisabled, onSubmit} =
    useConnect();

  return (
    <Patient
      title="환자 연결하기"
      subTitle="환자가 가입할 때 사용한 이메일을 입력해주세요"
      button={
        <PrimaryButton size="l" onPress={onSubmit} disabled={isButtonDisabled}>
          다음
        </PrimaryButton>
      }>
      {RenderInput({
        name: 'email',
        placeholder: '이메일',
        control,
        errors,
        touchedFields,
        trigger,
      })}
    </Patient>
  );
}
