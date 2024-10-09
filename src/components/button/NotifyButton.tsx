import React from 'react';
import styled from 'styled-components/native';
import BellDisabled from '../../assets/images/bellDisabled.svg';
import BellDefault from '../../assets/images/bellDefault.svg';
import {NotifyButtonType} from './types';
import {Caption2} from '../text/Text';
import {colors} from '../../styles/colors';

const NotifyButtonContainer = styled.TouchableOpacity`
  align-items: center;
  gap: 2px;
`;

const NotifyButtonText = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
`;

export default function NotifyButton({isPushed, onPress}: NotifyButtonType) {
  return (
    <NotifyButtonContainer onPress={onPress} activeOpacity={1}>
      {isPushed ? <BellDisabled /> : <BellDefault />}
      <NotifyButtonText
        color={isPushed ? colors.LineDisabled : colors.primaryNormal}>
        {isPushed ? '완료' : '알림 전송'}
      </NotifyButtonText>
    </NotifyButtonContainer>
  );
}
