import React from 'react';
import {ToastBody, ToastContainer} from './styles';
import {ToastType} from './types';
import Guardian from '../../assets/images/GuardianNotify.svg';
import Meal from '../../assets/images/MealNotify.svg';
import Medicine from '../../assets/images/MedicineNotify.svg';
import Blood from '../../assets/images/BloodNotify.svg';
import Insulin from '../../assets/images/InsulinNotify.svg';

const getNotifyImage = (title: string) => {
  switch (title) {
    case '보호자 알림':
      return <Guardian />;
    case '식사 알림':
      return <Meal />;
    case '복약 알림':
      return <Medicine />;
    case '혈당 알림':
      return <Blood />;
    case '인슐린 알림':
      return <Insulin />;
    default:
      return null;
  }
};

export default function Toast({title, body}: ToastType) {
  const NotifyImage = getNotifyImage(title);

  return (
    <ToastContainer>
      {NotifyImage}
      <ToastBody ellipsizeMode="tail" numberOfLines={2}>
        {body}
      </ToastBody>
    </ToastContainer>
  );
}
