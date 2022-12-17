import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import api from '../services/Api';
import Geolocation from '@react-native-community/geolocation';
import {AllToast} from '../components/toast';
import Sound from 'react-native-sound';

interface AuthContextData {
  token: any;
  longitude: any;
  latitude: any;
  backPage: any;
  user: any;
  playSound: (type:number) => void;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  GetAllPedidos: () => Promise<any>;
  PostPedido: (data: any) => Promise<any>;
  Loading: any;
  setLoading: any;
  pedidos: any;
  myLocation: () => void;
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
  const backPage = useRef<number>(0)
  const [Loading, setLoading] = useState<any>(false);
  const [pedidos, setPedidos] = useState<any>(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const playSound = (type: number) => {
    switch (type) {
      case 1:
        {
          var sound1 = new Sound(require('../assets/sound.mp3'), error => {
            if (error) {
              alert('error' + error.message);
              return;
            }
            sound1.play(() => {
              sound1.release();
            });
          });
        }
        break;
      case 2:
        {
          var sound1 = new Sound(
            require('../assets/entregaFinalizadaSound.mp3'),
            error => {
              if (error) {
                alert('error' + error.message);
                return;
              }
              sound1.play(() => {
                sound1.release();
              });
            },
          );
        }
        break;
      case 3:
        {
          var sound1 = new Sound(
            require('../assets/itemAlreadyChecked.wav'),
            error => {
              if (error) {
                alert('error' + error.message);
                return;
              }
              sound1.play(() => {
                sound1.release();
              });
            },
          );
        }
        break;
      case 4:
        {
          var sound1 = new Sound(
            require('../assets/itemDoenstExist.wav'),
            error => {
              if (error) {
                alert('error' + error.message);
                return;
              }
              sound1.play(() => {
                sound1.release();
              });
            },
          );
        }
        break;
    }
  };

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
    const tkn = await token.replace(/("|')/g, '');
    console.log(tkn);
    try {
      const res = await api.get('/api/v1/cargaEntrada/obter-entrada', {
        headers: {
          Authorization: `Bearer ${tkn}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setPedidos(res.data.data);
      return res;
    } catch (error: any) {
      console.log(error);
      AllToast.ToastError('Desculpe...ocorreu um erro');
    }
  }

  // Post Pedidos function
  async function PostPedido(data: any) {
    const tkn = await token.replace(/("|')/g, '');
    try {
      const res = await api.post(
        '/api/v1/cargaEntrega/finalizar-conferencia',
        data,
        {
          headers: {
            Authorization: `Bearer ${tkn}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res.status);
      if (res.status === 200) {
        AllToast.ToastError('Entrega finalizada !');
        backPage.current = 1
        playSound(2)
      }
      
      return res;
    } catch (error: any) {
      console.log(error);
      AllToast.ToastError('Desculpe...ocorreu um erro');
    }
  
  }

  const [longitude, setLongitude] = useState<number | boolean>(0);
  const [latitude, setLatitude] = useState<number | boolean>(0);

  const myLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        setLongitude(false);
        setLatitude(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

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
        playSound,
        backPage,
        myLocation,
        longitude,
        latitude,
        token,
        user,
        Loading,
        setLoading,
        signIn,
        signOut,
        pedidos,
        GetAllPedidos,
        PostPedido,
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
