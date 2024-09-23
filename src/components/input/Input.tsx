import React, {useState} from 'react';
import {InputType} from './types';
import {Controller} from 'react-hook-form';
import {colors} from '../../styles/colors';
import OutlineButton from '../button/OutlineButton';
import {View} from 'react-native';
import {
  InputBox,
  InputLabel,
  InputMessage,
  InputText,
  InputTimer,
  InputTimerMessage,
} from './styles';

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
  timer,
  isTimerActive,
  handleSendEmail,
  isVerificationCodeValid,
  isNicknameValid,
  autoFocus,
  keyboardType,
  size,
}: InputType) {
  const [isFocused, setIsFocused] = useState(false);

  const isError = !!icon && editable && errors[name] && touchedFields[name];
  const isValid =
    (!!icon && editable && !errors[name] && touchedFields[name]) ||
    isVerificationCodeValid ||
    isNicknameValid;

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
            (!editable && !drop)) &&
            !(size === 's') && (
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
            isDropdownVisible={isDropdownVisible}
            size={size}>
            <InputText
              autoFocus={autoFocus}
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
              keyboardType={keyboardType}
            />
            {icon && (isValid || !message) && icon}
            {button && !isValid && (
              <OutlineButton
                size="s"
                disabled={(!editable || isTimerActive) && true}
                onPress={handleSendEmail}>
                {buttonText}
              </OutlineButton>
            )}
          </InputBox>
          {((isError && !isTimerActive) || (isValid && !!message)) &&
            !isFocused && (
              <InputMessage isError={isError}>
                {isValid ? message : errors[name]?.message}
              </InputMessage>
            )}
          {((button && !isValid) || !isError) && isTimerActive && (
            <InputTimer>
              <InputTimerMessage color={colors.TextDisabled}>
                이메일로 인증번호가 전송되었습니다
              </InputTimerMessage>
              <InputTimerMessage color={colors.primaryNormal}>
                {`${String(Math.floor((timer || 0) / 60)).padStart(
                  2,
                  '0',
                )}:${String((timer || 0) % 60).padStart(2, '0')}`}
              </InputTimerMessage>
            </InputTimer>
          )}
        </View>
      )}
      name={name}
    />
  );
}
