import React from 'react';
import {
  RecordBox,
  RecordContainer,
  RecordFormBox,
  RecordTitle,
  RecordTitleBox,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useInsulin} from './hooks';
import RenderInput from '../../modules/renderInput';
import MultiSelectList from '../../components/select/MultiSelectList';
import PrimaryButton from '../../components/button/PrimaryButton';
import TimeInput from '../../components/input/TimeInput';
import {useBackHandler} from '../../modules/commonHooks';
import NotifyListItem from '../../components/list/notify/NotifyListItem';

export default function InsulinRecord() {
  const {handleBack} = useBackHandler();
  const {
    control,
    errors,
    touchedFields,
    trigger,
    intakeTime,
    setIntakeTime,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
  } = useInsulin();

  return (
    <RecordContainer>
      <RecordBox>
        <RecordTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordTitle color={colors.TextNormal} weight="bold">
            인슐린 추가중
          </RecordTitle>
        </RecordTitleBox>
        <RecordFormBox>
          {RenderInput({
            name: 'productName',
            placeholder: '제품명',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          {RenderInput({
            name: 'dosage',
            placeholder: '투여량(U)',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          <MultiSelectList
            selectedItems={intakeTime}
            setSelectedItems={setIntakeTime}
            onAddPress={addInputField}
          />
          {inputs.map((input, index) => (
            <TimeInput
              key={index}
              placeholder={`추가 시간 ${input.id}`}
              value={input.time || ''}
              onChangeText={(text: any) => handleInputChange(text, index)}
              editable={true}
            />
          ))}
          <NotifyListItem isToggleOn={isToggleOn} setIsToggleOn={setIsToggleOn}>
            알림 기능
          </NotifyListItem>
        </RecordFormBox>
      </RecordBox>
      <PrimaryButton
        size="l"
        onPress={handleSubmit}
        disabled={isButtonDisabled}>
        등록하기
      </PrimaryButton>
    </RecordContainer>
  );
}
