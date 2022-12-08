import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/Api';
import {AllToast} from '../components/toast';
import axios from 'axios';

interface AuthContextData {
  token: any;
  user: any;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  GetAllPedidos: () => Promise<any>;
  Loading: any;
  setLoading: any;
  pedidos: any;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

interface AuthProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProps> = ({children}) => {
  const [token, setToken] = useState<any>(false);
  const [user, setUser] = useState<any>('');
  const [Loading, setLoading] = useState<any>(false);
  const [pedidos, setPedidos] = useState<any>(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  // SignIn function
  async function signIn(username: string, password: string) {
    const data = {
      userName: username,
      password: password,
    };
    try {
      const res = await api.post('/api/v1/login/Mobile', data);
      setToken(res.data.data.token);
      setUser(res.data.data.nome);
      console.log('signed');
      await AsyncStorage.setItem('Token', JSON.stringify(res.data.data.token));
      await AsyncStorage.setItem(
        'User',
        JSON.stringify(res.data.data.nome).replace(/["]+/g, ''),
      );
      return res;
    } catch (error: any) {
      console.log(error);
      Loading.current = false;
      AllToast.ToastError(
        'Usuário ou senha incorretos...confira novamente por favor',
      );
    }
  }

    // SignOut function
  async function signOut(): Promise<void> {
    setToken(false);
    setUser(false);
    AsyncStorage.removeItem('Token');
    AsyncStorage.removeItem('User');
  }

    // Get All Pedidos function
  async function GetAllPedidos() {
    console.log('get all -----------');
    try {
      const res = await axios.get('https://sisconfweb-api.azurewebsites.net/api/v1/AppDesktop/cargas-entrada', {
        headers: {
          Authorization: 'Bearer ' + token.replace(/["]+/g),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setPedidos(res.data);
      return res;
    } catch (error: any) {
      console.log(error);
      AllToast.ToastError('Desculpe...ocorreu um erro');
    }
  }

  // Load datas from storage function
  // This function get the token and user saveds on AsyncStorage always that app initialize
  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('Token');
    const name = await AsyncStorage.getItem('User');
    setUser(name);
    if (auth) {
      setToken(auth);
    }
  }

  // Joining all variables that we want to export 
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        Loading,
        setLoading,
        signIn,
        signOut,
        pedidos,
        GetAllPedidos,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporting the variables, and can be used for GET this variables exported
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
