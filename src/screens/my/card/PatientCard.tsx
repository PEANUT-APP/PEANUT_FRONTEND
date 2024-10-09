import React from 'react';
import {
  CardText,
  PatientCardBox,
  PatientCardContainer,
  PatientCardContentBox,
  PatientCardImage,
  PatientCardInfo,
  PatientCardInfoBox,
  PatientCardInfoText,
  PatientCardNoneProfile,
  PatientCardProfile,
  PatientCardTitle,
  PatientCardTop,
} from './styles';
import {colors} from '../../../styles/colors';
import {useCard} from '../hooks';
import {TouchableOpacity} from 'react-native';
import {PatientCardType} from './types';
import {PrimaryTextButton} from '../../../components/button/TextButton';

export default function PatientCard({data}: PatientCardType) {
  const {onPress} = useCard();

  return (
    <PatientCardContainer>
      <PatientCardTop>
        <PatientCardTitle>연결된 환자 관리하기</PatientCardTitle>
        {data && <PrimaryTextButton size="s">연결 끊기</PrimaryTextButton>}
      </PatientCardTop>
      <>
        {!data ? (
          <PatientCardBox>
            <PatientCardImage />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => onPress('Connect')}>
              <CardText color={colors.TextNeutral}>
                관리할 환자 직접 등록하러 가기 &gt;
              </CardText>
            </TouchableOpacity>
          </PatientCardBox>
        ) : (
          <PatientCardInfoBox>
            {data.profileUrl ? (
              <PatientCardProfile source={{uri: data.profileUrl}} />
            ) : (
              <PatientCardNoneProfile />
            )}
            <PatientCardContentBox>
              <CardText weight="bold" color={colors.TextNeutral}>
                {data.userName}님
              </CardText>
              <PatientCardInfo>
                <PatientCardInfoText>{data.gender}</PatientCardInfoText>
                <PatientCardInfoText>·</PatientCardInfoText>
                <PatientCardInfoText>{data.birthday}</PatientCardInfoText>
                <PatientCardInfoText>·</PatientCardInfoText>
                <PatientCardInfoText>{data.height}cm</PatientCardInfoText>
                <PatientCardInfoText>·</PatientCardInfoText>
                <PatientCardInfoText>{data.weight}kg</PatientCardInfoText>
              </PatientCardInfo>
            </PatientCardContentBox>
          </PatientCardInfoBox>
        )}
      </>
    </PatientCardContainer>
  );
}
