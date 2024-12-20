import React from 'react';
import Patient from './Patient';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {CompleteBox} from './styles';
import {useComplete} from './hooks';
import PatientCompleteIcon from '../../../assets/images/PatientCompleteIcon.svg';

export default function Complete() {
  const {handleGoMy} = useComplete();

  return (
    <Patient
      title="연결 요청을 보냈어요!"
      subTitle={`방금 입력하신 이메일 계정으로 코드를 전송하였어요.${'\n'}상대방이 코드를 입력하면 성공적으로 연결돼요.`}
      button={
        <PrimaryButton size="l" onPress={handleGoMy}>
          마이 페이지로 돌아가기
        </PrimaryButton>
      }
      isComplete={true}>
      <CompleteBox>
        <PatientCompleteIcon />
      </CompleteBox>
    </Patient>
  );
}
