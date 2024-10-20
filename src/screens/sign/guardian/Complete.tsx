import React from 'react';
import Guardian from './Guardian';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {CompleteBox} from '../patient/styles';
import {useComplete} from './hooks';
import GuardianCompleteIcon from '../../../assets/images/GuardianCompleteIcon.svg';

export default function GuardianComplete() {
  const {handleGoMy, name} = useComplete();

  return (
    <Guardian
      title="연결이 성공적으로 완료됐어요"
      subTitle={`${name}님의 보호자가 생겼어요.\n앞으로 보호자님과 함께 건강한 혈당 관리 해봐요!`}
      button={
        <PrimaryButton size="l" onPress={handleGoMy}>
          마이 페이지로 돌아가기
        </PrimaryButton>
      }
      isComplete={true}>
      <CompleteBox>
        <GuardianCompleteIcon />
      </CompleteBox>
    </Guardian>
  );
}
