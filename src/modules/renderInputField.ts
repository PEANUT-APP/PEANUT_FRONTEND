import Input from '../components/input/Input';

export const renderInputField = (
  name: keyof FormData,
  placeholder: string,
  message?: string,
) => (
  <Input
    placeholder={placeholder}
    name={name}
    control={control}
    rules={validationRules[name]}
    errors={errors}
    editable={true}
    icon={name === 'verificationCode'}
    touchedFields={touchedFields}
    returnKeyType="next"
    trigger={trigger}
    message={message}
  />
);
