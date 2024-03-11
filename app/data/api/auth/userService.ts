import { baseUrl } from '../../../constants/apiUrls';
import { AxiosInstance } from './AxiosInstance';

const userUrl = baseUrl + 'user/';

export const updateUserInfo = userInfo => {
  return AxiosInstance.put(`${userUrl}${userInfo.id}`, { name: userInfo.name, email: userInfo.email });
};
