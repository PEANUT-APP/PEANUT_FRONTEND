import React from 'react';
import {
  RecordCardContainer,
  RecordCardContentBox,
  RecordCardDate,
  RecordCardInfoBox,
  RecordCardTitle,
  RecordCardTitleText,
  RecordTagBox,
} from './styles';
import DeleteIcon from '../../../components/icon/DeleteIcon';
import {colors} from '../../../styles/colors';
import Tag from './Tag';
import SecondaryButton from '../../../components/button/SecondaryButton';
import {RecordCardType} from './types';

export default function RecordCard({
  name,
  description,
  time,
  isOngoing,
  onToggle,
  type,
}: RecordCardType) {
  return (
    <RecordCardContainer>
      <RecordCardTitle>
        <RecordCardTitleText>{name}</RecordCardTitleText>
        <DeleteIcon size="l" color={colors.TextDisabled} />
      </RecordCardTitle>
      <RecordCardContentBox>
        <RecordCardInfoBox>
          {isOngoing && <RecordCardDate>{description}</RecordCardDate>}
          <RecordTagBox>
            {isOngoing ? (
              time?.map((t, index) => (
                <Tag isOngoing={true} key={index}>
                  {t}
                </Tag>
              ))
            ) : (
              <Tag isOngoing={false}>
                {type === 'medicine' ? '복약 중단 상태' : '투여 중단 상태'}
              </Tag>
            )}
          </RecordTagBox>
        </RecordCardInfoBox>
        <SecondaryButton size="s" onPress={onToggle}>
          {isOngoing
            ? type === 'medicine'
              ? '복약 중단'
              : '투여 중단'
            : type === 'medicine'
            ? '복약 시작'
            : '투여 시작'}
        </SecondaryButton>
      </RecordCardContentBox>
    </RecordCardContainer>
  );
}
