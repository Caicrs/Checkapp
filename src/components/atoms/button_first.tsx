import styled from 'styled-components';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors';

const ButtonFirst = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert('You tapped the Decrypt button!');
      }}
      style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>Entrar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  appButtonContainer: {
    width: "85%",
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 16,
    color: '#2D2D2D',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default ButtonFirst;
