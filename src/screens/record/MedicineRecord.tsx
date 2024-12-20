import React from 'react';
import {
  RecordBox,
  RecordContainer,
  RecordFormBox,
  RecordTitle,
  RecordTitleBox,
  RecordToggle,
  RecordToggleText,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useMedicine} from './hooks';
import RenderInput from '../../modules/renderInput';
import MultiSelectList from '../../components/select/MultiSelectList';
import Toggle from '../../components/toggle/Toggle';
import PrimaryButton from '../../components/button/PrimaryButton';
import TimeInput from '../../components/input/TimeInput';
import DayListItem from './day/DayListItem';
import {useBackHandler} from '../../modules/commonHooks';

export default function MedicineRecord() {
  const {handleBack} = useBackHandler();
  const {
    control,
    errors,
    touchedFields,
    trigger,
    intakeDays,
    setIntakeDays,
    intakeTime,
    setIntakeTime,
    isToggleOn,
    setIsToggleOn,
    inputs,
    addInputField,
    handleInputChange,
    handleSubmit,
    isButtonDisabled,
  } = useMedicine();

  return (
    <RecordContainer>
      <RecordBox>
        <RecordTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordTitle color={colors.TextNormal} weight="bold">
            복약 추가중
          </RecordTitle>
        </RecordTitleBox>
        <RecordFormBox>
          {RenderInput({
            name: 'medicineName',
            placeholder: '약물명',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          <DayListItem intakeDays={intakeDays} setIntakeDays={setIntakeDays} />
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
          <RecordToggle>
            <RecordToggleText>알림 기능</RecordToggleText>
            <Toggle isToggleOn={isToggleOn} setIsToggleOn={setIsToggleOn} />
          </RecordToggle>
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
