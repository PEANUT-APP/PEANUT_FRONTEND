import React from 'react';
import {GuideBox, GuideContainer, GuidePair, GuideText} from './styles';
import {GuideType} from './types';
import {AverageItem, BloodSugarItem} from '../item/CalendarItem';

export default function Guide({type}: GuideType) {
  return (
    <GuideContainer>
      {type === 'bloodSugar' ? (
        <GuideBox>
          <GuidePair>
            <BloodSugarItem type="guide" name="good" />
            <GuideText>정상 수치</GuideText>
          </GuidePair>
          <GuidePair>
            <BloodSugarItem type="guide" name="high" />
            <GuideText>고혈당 수치</GuideText>
          </GuidePair>
          <GuidePair>
            <BloodSugarItem type="guide" name="low" />
            <GuideText>저혈당 수치</GuideText>
          </GuidePair>
          <GuidePair>
            <BloodSugarItem type="guide" name="danger" />
            <GuideText>위험 수치</GuideText>
          </GuidePair>
        </GuideBox>
      ) : (
        <GuideBox>
          <GuidePair>
            <AverageItem type="guide" name="normal" />
            <GuideText>보통이에요</GuideText>
          </GuidePair>
          <GuidePair>
            <AverageItem type="guide" name="great" />
            <GuideText>참 잘했어요</GuideText>
          </GuidePair>
          <GuidePair>
            <AverageItem type="guide" name="bad" />
            <GuideText>아쉬워요</GuideText>
          </GuidePair>
        </GuideBox>
      )}
    </GuideContainer>
  );
}
