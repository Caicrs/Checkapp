import React from 'react';
import Icon from '../assets/delivery-icon.svg';
import LogoutIcon from '../assets/logout.svg';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../assets/styles/colors';
import {useAuth} from '../context/AuthContext';
import LoadingComponent from '../components/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const Homepage = ({navigation}) => {
  const {signOut, user, myLocation,playSound, longitude, latitude} = useAuth();

  function Logout() {
    signOut()
  }

  Geolocation.getCurrentPosition(info => {});

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.textUser}>Olá {user}</Text>
          <Text style={styles.textDate}>Segunda, 17 de agosto 2022</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={() => Logout()}>
          <LogoutIcon width={32} height={32} />
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Entregas')}
          style={styles.appButtonContainer}>
          <Icon width={100} height={100} />
          <Text style={styles.appButtonText}>Lista de entregas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  logout: {
    justifyContent: 'flex-end',
  },
  secondContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  subContainer: {
    flex: 1,
  },
  textUser: {
    fontSize: 24,
    color: colors.primaryTextColor,
    fontWeight: 'bold',
  },
  textDate: {
    fontSize: 16,
    color: colors.primaryTextColor,
    fontWeight: '300',
  },
  appButtonContainer: {
    width: '100%',
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: colors.secondaryColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: 'Sora-Bold',
    alignSelf: 'center',
  },
});
