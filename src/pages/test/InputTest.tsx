import React from 'react';
import styled from 'styled-components/native';

const ViewContainer = styled.View`
  background-color: #fff;
  gap: 10px;
`;
const InputContainer = styled.View`
  gap: 10px;
  align-items: center;
`;

export default function InputTest() {
  /*const {
    control,
    handleSubmit,
    formState: {errors: LabelErrors, touchedFields},
  } = useForm<FormData>({
    defaultValues: {
      Label: '',
      Label2: '',
      Label3: '',
      Label4: '',
      Label5: '',
      Label6: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: FormData) => {
    Keyboard.dismiss();
    const dataString = Object.entries(data)
      .filter((_, index) => index % 2 === 0)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    Alert.alert('입력된 데이터', dataString);
  };*/

  return (
    <ViewContainer>
      <InputContainer>
        {/*<Input
          placeholder="Label"
          name="Label"
          control={control}
          rules={{
            required: '값이 필요해요!',
            validate: (value: string) => {
              if (value.length > 10) {
                return '10자를 넘기지 마세요.';
              }
              return true;
            },
          }}
          errors={LabelErrors}
          buttonText="버튼"
          editable={true}
          touchedFields={touchedFields}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Label2"
          name="Label2"
          control={control}
          rules={{
            required: '값이 필요해요!',
            validate: (value: string) => {
              if (value.length > 10) {
                return '10자를 넘기지 마세요.';
              }
              return true;
            },
          }}
          errors={LabelErrors}
          buttonText="버튼"
          editable={false}
          defaultValue="변경 불가능한 정보"
          touchedFields={touchedFields}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Label3"
          name="Label3"
          control={control}
          rules={{
            required: '값이 필요해요!',
            validate: (value: string) => {
              if (value.length > 10) {
                return '10자를 넘기지 마세요.';
              }
              return true;
            },
          }}
          errors={LabelErrors}
          buttonText="버튼"
          editable={true}
          icon
          message="확인 메세지입니다."
          touchedFields={touchedFields}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Label4"
          name="Label4"
          control={control}
          rules={{
            required: '값이 필요해요!',
            validate: (value: string) => {
              if (value.length > 10) {
                return '10자를 넘기지 마세요.';
              }
              return true;
            },
          }}
          errors={LabelErrors}
          buttonText="버튼"
          editable={false}
          defaultValue="변경 불가능한 정보"
          icon
          message="확인 메세지입니다."
          touchedFields={touchedFields}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Label5"
          name="Label5"
          control={control}
          rules={{
            required: '값이 필요해요!',
            validate: (value: string) => {
              if (value.length > 10) {
                return '10자를 넘기지 마세요.';
              }
              return true;
            },
          }}
          errors={LabelErrors}
          buttonText="버튼"
          editable={true}
          button
          touchedFields={touchedFields}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Label6"
          name="Label6"
          control={control}
          rules={{
            required: '값이 필요해요!',
            validate: (value: string) => {
              if (value.length > 10) {
                return '10자를 넘기지 마세요.';
              }
              return true;
            },
          }}
          errors={LabelErrors}
          buttonText="버튼"
          editable={false}
          defaultValue="변경 불가능한 정보"
          button
          touchedFields={touchedFields}
        />*/}
      </InputContainer>
      {/*<Button title="Submit" onPress={handleSubmit(onSubmit)} />*/}
    </ViewContainer>
  );
}
