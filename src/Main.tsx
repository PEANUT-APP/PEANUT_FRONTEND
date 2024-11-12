import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './navigation/Navigation';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './styles/theme';
import {FormProvider, useForm} from 'react-hook-form';
import Toast from './components/toast/Toast';
import {useMessage} from './modules/message';
import {useAuth} from './modules/useAuth';

export default function Main() {
  const methods = useForm();
  useAuth();
  const {toastTitle, toastMessage} = useMessage();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Navigation />
        {toastMessage || toastTitle ? (
          <Toast title={toastTitle} body={toastMessage} />
        ) : null}
      </FormProvider>
    </ThemeProvider>
  );
}
