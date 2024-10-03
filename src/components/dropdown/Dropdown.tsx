import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {DropdownType} from './types';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import Input from '../input/Input';
import {useValidationRules} from '../../modules/validationRules';
import {TouchableOpacity} from 'react-native';
import DropdownField from './DropdownField';
import {useDispatch, useSelector} from 'react-redux';
import {setTime} from '../../slices/todaySlice';
import {RootState} from '../../store/store';

const DropdownContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DropdownList = styled.View<{size: 'm' | 's'; isSearch?: boolean}>`
  width: ${({size}) => (size === 's' ? '152px' : '350px')};
  position: ${({size}) => (size === 's' ? 'absolute' : 'static')};
  top: ${({size, isSearch}) =>
    isSearch ? '-240px' : size === 's' ? '60px' : '0'};
  z-index: ${({size}) => (size === 's' ? '10' : '0')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  border-radius: 4px;
  border: 1px solid ${colors.LineNomal};
  background-color: ${colors.white};
`;

export default function Dropdown({
  control,
  errors,
  touchedFields,
  trigger,
  setValue,
  setFocus,
  name,
  placeholder,
  options,
  size,
  isSearch,
}: DropdownType) {
  const dispatch = useDispatch();

  const validationRules = useValidationRules();

  const mealTime = useSelector((state: RootState) => state.today.time);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [dropType, setDropType] = useState<'dropClose' | 'dropOpen'>(
    'dropClose',
  );
  const [dropColor, setDropColor] =
    useState<keyof typeof colors>('LineDisabled');

  useEffect(() => {
    if (size === 's') {
      setSelectedValue(mealTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(prevState => {
      const newState = !prevState;
      setDropType(newState ? 'dropOpen' : 'dropClose');
      setDropColor(newState ? 'primaryNormal' : 'LineDisabled');
      setFocus(name);
      return newState;
    });
  }, [name, setFocus]);

  const handleSelect = async (value: string) => {
    setSelectedValue(value);
    setIsDropdownVisible(false);
    setDropType('dropClose');

    dispatch(setTime(value));

    setValue(name, value);
    await trigger(name);
  };

  return (
    <DropdownContainer>
      <Input
        placeholder={placeholder}
        name={name}
        control={control}
        rules={validationRules[name]}
        errors={errors}
        editable={false}
        touchedFields={touchedFields}
        returnKeyType="next"
        trigger={trigger}
        secureTextEntry={false}
        value={selectedValue}
        icon={
          <TouchableOpacity onPress={toggleDropdown} activeOpacity={1}>
            <DesignIcon
              type={dropType}
              size={size === 's' ? 'm' : 'l'}
              color={colors[dropColor]}
            />
          </TouchableOpacity>
        }
        drop={true}
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
        pointerEvents="none"
        size={size}
      />
      {isDropdownVisible && (
        <DropdownList size={size} isSearch={isSearch}>
          {options.map((option: string) => (
            <DropdownField
              key={option}
              onPress={() => handleSelect(option)}
              isSelected={selectedValue === option}
              size={size}>
              {option}
            </DropdownField>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}
