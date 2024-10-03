import React from 'react';
import {
  NotifyCardAlarm,
  NotifyCardContainer,
  NotifyCardImage,
  NotifyCardText,
  NotifyCardTitle,
} from './styles';
import {colors} from '../../../styles/colors';
import {NotifyType} from './types';

export function NotifyCard({date, content}: NotifyType) {
  return (
    <NotifyCardContainer>
      <NotifyCardTitle>
        <NotifyCardAlarm>
          <NotifyCardImage />
          <NotifyCardText color={colors.TextNeutral}>
            보호자 알림
          </NotifyCardText>
        </NotifyCardAlarm>
        <NotifyCardText color={colors.TextNeutral}>{date}</NotifyCardText>
      </NotifyCardTitle>
      <NotifyCardText color={colors.TextNormal}>{content}</NotifyCardText>
    </NotifyCardContainer>
  );
}
