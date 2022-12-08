import {createStackNavigator} from '@react-navigation/stack';
import Homepage from '../screens/Homepage';
import Entregas from '../screens/Entregas';
import EntregasDetalhes from '../screens/EntregasDetalhes';
import React from "react";

const Stack = createStackNavigator();

const AppStack = () => {


    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Entregas" component={Entregas} />
            <Stack.Screen name="EntregasDetalhes" component={EntregasDetalhes} />
          </Stack.Navigator>
    )
}

export default AppStack;