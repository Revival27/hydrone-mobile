import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { baseUrl } from '../../../constants/apiUrls';
import { IRegister } from '../../models/auth/RegisterModel';
import { IResetPassword } from '../../models/auth/ResetPasswordModel';
import { IVerifyToken } from '../../models/auth/VerifyTokenModel';
import { AxiosInstance } from './AxiosInstance';

export const authUrl = baseUrl + 'auth/';

// POST request for registration
export const register = (user: IRegister) => {
  return axios.post(`${authUrl}register`, user);
};

// POST request for login
export const login = user => {
  return axios.post(`${authUrl}login`, user);
};

export const logout = () => {
  AsyncStorage.removeItem('BEARER_TOKEN');
};

export const forgotPassword = (email: string) => {
  const emailObj = {
    email: email,
  };
  return axios.post(`${baseUrl}forgot-password`, emailObj);
};

export const verifyPasswordResetToken = (user: IVerifyToken) => {
  return axios
    .post(`${baseUrl}verify/pin`, user)
    .then(res => res)
    .catch(err => err.response.data);
};

export const resetPassword = (user: IResetPassword) => {
  return axios.post(`${baseUrl}reset-password`, user);
};

export const fetchUserInfo = async () => {
  return AxiosInstance.get(`${baseUrl}user`);
};
