import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {DropdownType} from './types';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import Input from '../input/Input';
import {useValidationRules} from '../../modules/validationRules';
import {TouchableOpacity} from 'react-native';
import DropdownField from './DropdownField';

const DropdownContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DropdownList = styled.View`
  width: 350px;
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
}: DropdownType) {
  const validationRules = useValidationRules();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [dropType, setDropType] = useState<'dropClose' | 'dropOpen'>(
    'dropClose',
  );

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(prevState => {
      const newState = !prevState;
      setDropType(newState ? 'dropOpen' : 'dropClose');
      setFocus(name);
      return newState;
    });
  }, [name, setFocus]);

  const handleSelect = async (value: string) => {
    setSelectedValue(value);
    setIsDropdownVisible(false);
    setDropType('dropClose');

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
            <DesignIcon type={dropType} size="l" />
          </TouchableOpacity>
        }
        drop={true}
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
        pointerEvents="none"
      />
      {isDropdownVisible && (
        <DropdownList>
          {options.map((option: string) => (
            <DropdownField
              key={option}
              onPress={() => handleSelect(option)}
              isSelected={selectedValue === option}>
              {option}
            </DropdownField>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}
