import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { colors } from '../assets/styles/colors';
import Logo from '../assets/logo.svg';
import LoadingComponent from '../components/loading';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, Loading } = useAuth();

  AsyncStorage.getItem('username').then((s) => {
    setUsername(s??'');
  }).catch((e) => console.error(e));

  AsyncStorage.getItem('password').then((s) => {
    setPassword(s??'');
  }).catch((e) => console.error(e));

  async function Submit() {

    console.log(username)
    console.log(password)

    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);

    signIn(username, password);
  }

  if (Loading) {
    return <LoadingComponent />;
  } else {
    return (
      <Container>
        <Box>
          <Logo fill={colors.white} width={50} height={50} />
          <Title>Login</Title>
        </Box>
        <BoxInput>
          <Inputs>
            <View style={styles.box}>
              <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
                placeholder={'Insira seu usuário'}
                placeholderTextColor="#2D2D2D"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.box}>
              <TextInput
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholder={'Insira sua senha'}
                placeholderTextColor="#2D2D2D"
                autoCapitalize="none"
              />
            </View>
          </Inputs>

          <TouchableOpacity
            onPress={ async () => Submit()}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Entrar</Text>
          </TouchableOpacity>
        </BoxInput>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  appButtonContainer: {
    width: '85%',
    height: 50,
    backgroundColor: colors.secondaryColor,
    borderRadius: 8,
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: 'Sora-Bold',
    alignSelf: 'center',
  },
  box: {
    width: '85%',
  },
  input: {
    color: '#2D2D2D',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 8,
    height: 50,
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: 'Sora-Regular',
    backgroundColor: colors.primaryTextColor,
  },
});

const Container = styled(View)`
  margin: 0;
  padding: 0;
  align-items: center;
  flex: 1;
  background: ${colors.primaryColor};
`;

const Box = styled(View)`
  width: 100%;
  padding: 5% 0 0 0;
  justify-content: center;
  align-items: center;
`;

const BoxInput = styled(View)`
  flex: 1;
  width: 100%;
  padding: 0;
  align-items: center;
`;

const Inputs = styled(View)`
  width: 100%;
  padding: 0 0 20% 0;
  align-items: center;
`;

const Title = styled(Text)`
  padding: 25% 0 20% 0;
  font-size: 28px;
  fontfamily: 'Sora-Bold';
  color: ${colors.primaryTextColor};
  text-align: center;
`;

export default Login;
