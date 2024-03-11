import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location';

import { hasAndroidPermission } from '../PermissionRequests/Permissions';

export const getCurrentLocation = async () => {
  if (await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
    const res = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    return res;
  }
};
