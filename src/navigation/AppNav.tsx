import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext, useAuth } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';



const AppNav = () => {
  const {token,user} = useAuth()
  return (
    <NavigationContainer>
     {token ? <AppStack/> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;

//  {token.current != '' ? <AppStack/> : <AuthStack />}
