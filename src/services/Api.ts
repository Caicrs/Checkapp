import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';




const api = axios.create({
    baseURL:'https://sisconfweb-api.azurewebsites.net',
    headers: {'Authorization': 'Bearer '}
})




  
  export default api;