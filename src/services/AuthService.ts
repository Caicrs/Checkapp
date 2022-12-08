import {AuthData} from '../context/AuthContext';
import api from './Api';

export interface LoginData {
    userName: string;
    password: string;
  }

export const Services = {
  Login: async (data :LoginData) => {
    try {
      const res = await api.post('/api/v1/login/Mobile', data);
      const result = {
        status: res.status,
        data: res.data
      }
      return result;
    } catch (error: any) {
      console.log(error);
    }
  },
};

export const authService = {Services};
