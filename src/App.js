/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';
import store from './store';
import { SplashScreen } from './screens'
import Router from './routes';

const App = () => {

  LogBox.ignoreLogs(['Setting a timer'])

  return (
    <Provider store={store} >
      <StatusBar barStyle='light-content' />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  )
};


export default App;
