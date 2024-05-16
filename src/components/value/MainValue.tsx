import React from 'react';
import {LargeMainValueType, MainValueType} from './types';
import {colors} from '../../styles/colors';
import {TouchableWithoutFeedback} from 'react-native';
import {
  MainValueContent,
  MainValueDefaultContainer,
  MainValueLargeContainer,
  MainValueNone,
  MainValueText,
  MainValueTitle,
} from './styles';

const MainValueDisplay = ({value, text}: MainValueType) => {
  if (value === undefined) {
    return (
      <TouchableWithoutFeedback>
        <MainValueNone color={colors.primaryStrong}>
          클릭하여 수치를 입력하세요!
        </MainValueNone>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <MainValueContent>
      {text && <MainValueText>{text}</MainValueText>}
      <MainValueText weight="bold">{value}</MainValueText>
    </MainValueContent>
  );
};

function MainValue({title, value, text}: MainValueType) {
  return (
    <MainValueDefaultContainer>
      <MainValueTitle color={colors.TextNeutral} weight="bold">
        {title}
      </MainValueTitle>
      <MainValueDisplay value={value} text={text} />
    </MainValueDefaultContainer>
  );
}

function LargeMainValue({title, children, text}: LargeMainValueType) {
  return (
    <MainValueLargeContainer>
      <MainValueTitle>{title}</MainValueTitle>
      <MainValueContent isChildren={!!children}>
        {children || (
          <MainValueNone color={colors.primaryStrong}>{text}</MainValueNone>
        )}
      </MainValueContent>
    </MainValueLargeContainer>
  );
}

export {MainValue, LargeMainValue};
