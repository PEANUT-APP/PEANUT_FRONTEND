import React from 'react';
import {
  NotifyCardAlarm,
  NotifyCardContainer,
  NotifyCardText,
  NotifyCardTitle,
} from './styles';
import {colors} from '../../../styles/colors';
import {NotifyType} from './types';
import Guardian from '../../../assets/images/GuardianNotify.svg';
import Meal from '../../../assets/images/MealNotify.svg';
import Medicine from '../../../assets/images/MedicineNotify.svg';
import Blood from '../../../assets/images/BloodNotify.svg';
import Insulin from '../../../assets/images/InsulinNotify.svg';

const getNotifyImage = (title: string) => {
  switch (title) {
    case '보호자':
      return <Guardian />;
    case '식사':
      return <Meal />;
    case '복약':
      return <Medicine />;
    case '혈당':
      return <Blood />;
    case '인슐린':
      return <Insulin />;
    default:
      return null;
  }
};

export function NotifyCard({title, date, content}: NotifyType) {
  const NotifyImage = getNotifyImage(title);

  return (
    <NotifyCardContainer>
      <NotifyCardTitle>
        <NotifyCardAlarm>
          {NotifyImage}
          <NotifyCardText color={colors.TextNeutral}>
            {title} 알림
          </NotifyCardText>
        </NotifyCardAlarm>
        <NotifyCardText color={colors.TextNeutral}>{date}</NotifyCardText>
      </NotifyCardTitle>
      <NotifyCardText color={colors.TextNormal}>{content}</NotifyCardText>
    </NotifyCardContainer>
  );
}
