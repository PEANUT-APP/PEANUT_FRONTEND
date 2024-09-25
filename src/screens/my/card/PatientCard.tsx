import React from 'react';
import {
  CardText,
  PatientCardBox,
  PatientCardContainer,
  PatientCardImage,
  PatientCardTitle,
} from './styles';
import {colors} from '../../../styles/colors';

export default function PatientCard() {
  return (
    <PatientCardContainer>
      <PatientCardTitle>연결된 환자 관리하기</PatientCardTitle>
      <PatientCardBox activeOpacity={1}>
        <PatientCardImage />
        <CardText color={colors.TextNeutral}>
          관리할 환자 직접 등록하러 가기 &gt;
        </CardText>
      </PatientCardBox>
    </PatientCardContainer>
  );
}
