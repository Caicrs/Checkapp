import styled from 'styled-components';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors';
import Navigate from "react-native-safe-area-context"

interface myTypes {
  navigation:any,
  adress:string,
}

const ButtonFirst = ({ navigation}:any) => {

  return (
    <TouchableOpacity
    onPress={() =>
      navigation.push('Homepage')
    }
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
    height:50,
    backgroundColor: colors.secondaryColor,
    borderRadius: 8,
    justifyContent:'center'
  },
  appButtonText: {
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: 'Sora-Bold',
    alignSelf: 'center',
  },
});

export default ButtonFirst;
