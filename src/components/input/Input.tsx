import React, {useState} from 'react';
import styled from 'styled-components/native';
import {InputStyleType, InputType} from './types';
import {Controller} from 'react-hook-form';
import {colors} from '../../styles/colors';
import {Caption1, Caption2} from '../text/Text';
import OutlineButton from '../button/OutlineButton';
import {View} from 'react-native';

const determineBorderColor = ({
  isFocused,
  isError,
  isValid,
  icon,
  message,
  isDropdownVisible,
}: InputStyleType) => {
  if (isDropdownVisible || isFocused) {
    return colors.primaryNormal;
  } else if (icon) {
    if (isError) {
      return colors.TextError;
    } else if (message && isValid) {
      return colors.primaryNormal;
    }
  }
  return colors.TextDisabled;
};

const InputBox = styled.View<InputStyleType>`
  width: 350px;
  height: 52px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${determineBorderColor};
  background-color: ${({editable, drop}) =>
    editable || drop ? 'transparent' : colors.SolidDisabled};
`;

const InputText = styled.TextInput<InputStyleType>`
  flex: 1;
  padding-right: ${({icon, button}) => (icon || button) && '16px'};
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${({editable, drop}) =>
    editable || drop ? colors.TextNormal : colors.TextDisabled};
`;

const InputLabel = styled(Caption1)`
  padding: 0 4px;
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

const InputMessage = styled(Caption2)<InputStyleType>`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  margin-top: 5.5px;
  margin-left: 16px;
  color: ${({isError}) => (isError ? colors.TextError : colors.primaryNormal)};
`;

export default function Input({
  placeholder,
  name,
  control,
  rules,
  errors,
  buttonText,
  editable,
  defaultValue,
  icon,
  button,
  message,
  touchedFields,
  returnKeyType,
  trigger,
  secureTextEntry,
  onSubmitEditing,
  drop = false,
  value,
  isDropdownVisible,
  setIsDropdownVisible,
  pointerEvents,
}: InputType) {
  const [isFocused, setIsFocused] = useState(false);

  const isError = !!icon && editable && errors[name] && touchedFields[name];
  const isValid = !!icon && editable && !errors[name] && touchedFields[name];

  return (
    <Controller
      control={control}
      rules={rules}
      render={({field}) => (
        <View>
          {(isDropdownVisible ||
            value ||
            isFocused ||
            field.value ||
            (!editable && !drop)) && (
            <InputLabel color={colors.TextNeutral}>{placeholder}</InputLabel>
          )}
          <InputBox
            isFocused={isFocused}
            editable={editable}
            icon={!!icon}
            isError={isError}
            isValid={isValid}
            message={!!message}
            drop={drop}
            isDropdownVisible={isDropdownVisible}>
            <InputText
              placeholder={isFocused || isDropdownVisible ? '' : placeholder}
              placeholderTextColor={colors.TextNeutral}
              onChangeText={field.onChange}
              onFocus={() => {
                setIsFocused(true);
                setIsDropdownVisible?.(true);
              }}
              onBlur={() => {
                field.onBlur();
                setIsFocused(false);
                setIsDropdownVisible?.(false);
                trigger(name);
              }}
              value={value || (editable ? field.value : defaultValue)}
              editable={editable}
              icon={!!icon}
              button={button}
              returnKeyType={returnKeyType}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={onSubmitEditing}
              drop={drop}
              pointerEvents={pointerEvents}
            />
            {!button && icon && (isValid || !message) && icon}
            {button && !icon && (
              <OutlineButton size="s" disabled={!editable && true}>
                {buttonText}
              </OutlineButton>
            )}
          </InputBox>
          {(isError || (isValid && !!message)) && !isFocused && (
            <InputMessage isError={isError}>
              {isValid ? message : errors[name]?.message}
            </InputMessage>
          )}
        </View>
      )}
      name={name}
      shouldUnregister={true}
    />
  );
}
