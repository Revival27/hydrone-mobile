import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { baseUrl } from '../../../constants/apiUrls';

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
});
export const getBearerToken = async () => {
  try {
    const data = await AsyncStorage.getItem('BEARER_TOKEN');
    return data;
  } catch (e) {
    return '';
  }
};

AxiosInstance.interceptors.request.use(
  async config => {
    const value = await getBearerToken();
    config.headers = {
      Authorization: `Bearer ${value}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export const AxiosFormInstance = axios.create({
  baseURL: baseUrl,
});
export const getBearerToken2 = async () => {
  try {
    const data = await AsyncStorage.getItem('BEARER_TOKEN');
    return data;
  } catch (e) {
    return '';
  }
};

AxiosFormInstance.interceptors.request.use(
  async config => {
    const value = await getBearerToken2();
    config.headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${value}`,
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);
