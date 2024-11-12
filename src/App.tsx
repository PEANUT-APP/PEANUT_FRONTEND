import React from 'react';
import Main from './Main';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
