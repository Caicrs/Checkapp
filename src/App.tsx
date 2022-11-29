import React from 'react';
import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import Login from './screens/Login';
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './screens/Homepage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

    <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
