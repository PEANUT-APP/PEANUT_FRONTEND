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
        {data.length !== 0 && (
          <PrimaryTextButton size="s">연결 끊기</PrimaryTextButton>
        )}
      </PatientCardTop>
      <>
        {data.length === 0 ? (
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
            {data[0].profileUrl ? (
              <PatientCardProfile source={{uri: data[0].profileUrl}} />
            ) : (
              <PatientCardNoneProfile />
            )}
            <PatientCardContentBox>
              <CardText weight="bold" color={colors.TextNeutral}>
                {data[0].userName}님
              </CardText>
              <PatientCardInfo>
                <PatientCardInfoText>{data[0].gender}</PatientCardInfoText>
                <PatientCardInfoText>·</PatientCardInfoText>
                <PatientCardInfoText>{data[0].birthday}</PatientCardInfoText>
                <PatientCardInfoText>·</PatientCardInfoText>
                <PatientCardInfoText>{data[0].height}cm</PatientCardInfoText>
                <PatientCardInfoText>·</PatientCardInfoText>
                <PatientCardInfoText>{data[0].weight}kg</PatientCardInfoText>
              </PatientCardInfo>
            </PatientCardContentBox>
          </PatientCardInfoBox>
        )}
      </>
    </PatientCardContainer>
  );
}
