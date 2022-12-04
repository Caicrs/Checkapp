import React from 'react';
import Icon from '../assets/delivery-icon.svg';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../assets/styles/colors';

const Homepage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.textUser}>Olá Pedro</Text>
        <Text style={styles.textDate}>Segunda, 17 de agosto 2022</Text>
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
  secondContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 40,
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
    alignItems:'center',
  },
  appButtonText: {
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: 'Sora-Bold',
    alignSelf: 'center',
  },
});
