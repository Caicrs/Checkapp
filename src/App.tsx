import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import {AuthProvider} from './context/AuthContext';
import AppNav from './navigation/AppNav';

const App = () => {
  return (
  <AuthProvider>
      <AppNav/>
  </AuthProvider>
  );
};

export default App;
