import React from 'react';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import Login from './screens/Login';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from './screens/Homepage';
import Entregas from './screens/Entregas';
import EntregasDetalhes from './screens/EntregasDetalhes';

const Stack = createStackNavigator();

function Test() {
  return (
    <View>
      <Text>TEST PAGE</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Entregas" component={Entregas} />
        <Stack.Screen name="EntregasDetalhes" component={EntregasDetalhes} />
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
