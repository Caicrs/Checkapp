import {createStackNavigator} from '@react-navigation/stack';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
import React from 'react';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const AuthStack = () => {
  
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
    )
}

export default AuthStack;