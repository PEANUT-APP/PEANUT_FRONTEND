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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
}
