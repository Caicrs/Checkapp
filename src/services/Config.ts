import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';



const config = {
  headers: {Authorization: 'Bearer ' },
};

export default config;
