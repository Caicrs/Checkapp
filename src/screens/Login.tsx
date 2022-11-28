import React from 'react';
import {colors} from '../assets/styles/colors';
import Logo from '../assets/logo.svg';
import InputFirst from '../components/atoms/input_first';
import ButtonFirst from '../components/atoms/button_first';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      <Box>
        <Logo fill="#EAEAEA" width={50} height={50} />
        <Title>Login</Title>
      </Box>
      <BoxInput>
        <Inputs>
          <InputFirst placeholder={"Insira seu usuário"} />
          <InputFirst placeholder={"Insira sua senha"} />
        </Inputs>

        <ButtonFirst />
      </BoxInput>
    </Container>
  );
};

const Icon = styled(Image)``;

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
  font-weight: 700;
  padding: 25% 0 20% 0;
  font-size: 20px;
  color: ${colors.primaryTextColor};
  text-align: center;
`;

export default Login;
