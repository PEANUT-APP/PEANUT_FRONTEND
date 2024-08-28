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
import {Provider} from 'react-redux';
import {store} from './store/store';

export default function App() {
  const methods = useForm();

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
