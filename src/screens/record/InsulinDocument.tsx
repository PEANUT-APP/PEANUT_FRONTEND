import React from 'react';
import {
  DocumentContainer,
  DocumentContent,
  DocumentBox,
  RecordTitle,
  RecordTitleBox,
} from './styles';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FlatList, TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import RecordCard from './card/RecordCard';
import {useInsulin} from './hooks';

export default function InsulinDocument() {
  const {handleBack} = useBackHandler();
  const {toggleInsulinState, handleGoAdd, insulinData} = useInsulin();

  return (
    <DocumentContainer>
      <DocumentBox>
        <RecordTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordTitle color={colors.TextNormal} weight="bold">
            인슐린 기록
          </RecordTitle>
        </RecordTitleBox>
        <FlatList
          data={insulinData}
          renderItem={({item}) => (
            <RecordCard
              name={item.productName}
              description={item.dosage}
              time={item.administrationTime}
              isOngoing={item.isOngoing}
              onToggle={() => toggleInsulinState(item.productName)}
              type="insulin"
            />
          )}
          keyExtractor={item => item.productName}
          ItemSeparatorComponent={DocumentContent}
        />
      </DocumentBox>
      <PrimaryButton size="l" onPress={handleGoAdd}>
        추가하기
      </PrimaryButton>
    </DocumentContainer>
  );
}
