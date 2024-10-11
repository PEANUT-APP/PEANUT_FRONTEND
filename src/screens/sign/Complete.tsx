import React from 'react';
import Sign from './Sign';
import PrimaryButton from '../../components/button/PrimaryButton';
import {SignCompleteIcon} from './styles';
import SignUpCompleteIcon from '../../assets/images/SignUpCompleteIcon.svg';
import {useSignUpComplete} from './hooks';

export default function SignUpComplete() {
  const {name, handleGoLogin} = useSignUpComplete();

  return (
    <Sign
      title={`${name}님, 환영해요.`}
      subTitle={`피넛에 성공적으로 가입되었어요.${'\n'}앞으로 피넛이 ${name}님의 관리 메이트가 되어드릴게요!`}
      button={
        <PrimaryButton size="l" onPress={handleGoLogin}>
          로그인하러 이동하기
        </PrimaryButton>
      }
      isComplete>
      <SignCompleteIcon>
        <SignUpCompleteIcon />
      </SignCompleteIcon>
    </Sign>
  );
}
