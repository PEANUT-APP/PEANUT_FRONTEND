/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './navigation/Navigation';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './styles/theme';
import {FormProvider, useForm} from 'react-hook-form';

export default function App() {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Navigation />
      </FormProvider>
    </ThemeProvider>
  );
}
