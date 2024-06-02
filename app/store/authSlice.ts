import i18next from 'i18next';
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

import { fetchUserInfo, forgotPassword, login, logout, register, resetPassword } from '../data/api/auth/authService';
import { updateUserInfo } from '../data/api/auth/userService';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { connectDrone } from './droneSlice';
import { toggleLoading } from './loadingSlice';
import { initializeMeasurements, initializeMeasurementTypes } from './measurementSlice';
import { initializeProjects, setAllProjects } from './projectsSlice';
import { initializeSurveys } from './surveysSlice';
import { initializeSoilQuestionnaires } from './soilSlice';
import { initializeWaterQuestionnaires } from './waterSlice';

interface IProfile {
  id: number | null;
  email: string | null;
  name: string | null;
  device_name: string;
}

interface Init {
  isAuthenticated: boolean;
  profile: IProfile;
}

const initialState: Init = {
  isAuthenticated: false,
  profile: { id: null, email: '', name: '', device_name: '' },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setDeviceName: (state, action) => {
      state.profile.device_name = action.payload;
    },

    loginHandler: (state, action) => {
      state.isAuthenticated = true;
      state.profile.id = action.payload.id;
      state.profile.email = action.payload.email;
      state.profile.name = action.payload.name;
    },
    logoutHandler: state => {
      state.isAuthenticated = false;
      state.profile = initialState.profile;
    },
    editProfileHandler: (state, action) => {
      state.profile = {
        ...state.profile,
        name: action.payload.name,
        email: action.payload.email,
      };
    },
  },
});

export const { setDeviceName, loginHandler, logoutHandler, editProfileHandler } = authSlice.actions;

export const getDeviceInfo = () => {
  return async dispatch => {
    const deviceName = await DeviceInfo.getDeviceName();
    AsyncStorage.setItem('DEVICE_INFO', deviceName);
    dispatch(setDeviceName(deviceName));
  };
};

export const getCurrentUser = () => {
  return async dispatch => {
    await fetchUserInfo()
      .then(response => {
        const { id, name, email } = response.data;
        const profile = { id, name, email };
        dispatch(loginHandler(profile));
        AsyncStorage.setItem('PROFILE', JSON.stringify(response.data));
      })
      .catch(err => {
        console.log(err);
        logout();
      });
  };
};

export const initializeAppData = () => {
  return async dispatch => {
    await dispatch(getCurrentUser());
    await dispatch(initializeProjects());
    await dispatch(initializeSurveys());
    await dispatch(connectDrone());
    await dispatch(initializeMeasurements());
    await dispatch(initializeSoilQuestionnaires());
    await dispatch(initializeWaterQuestionnaires());
    await dispatch(initializeMeasurementTypes());
  };
};

export const updateUser = (data, callback) => {
  return async (dispatch, getState) => {
    dispatch(toggleLoading(true));
    const updatedData = {
      id: data.id,
      email: data.email,
      name: data.name,
    };
    const user = getState().auth.profile;

    if (user.name === updatedData.name && user.email === updatedData.email) {
      dispatch(toggleLoading(false));
      return failedMessage(i18next.t('toast.no_change'));
    } else if (updatedData.name === '' || updatedData.email === '') {
      dispatch(toggleLoading(false));
      return failedMessage(i18next.t('toast.empty_fields'));
    } else {
      await updateUserInfo(updatedData)
        .then(() => {
          dispatch(toggleLoading(false));
          dispatch(editProfileHandler({ name: data.name, email: data.email }));
          callback();
          return successfulMessage(i18next.t('profile.edit_profile.success'));
        })
        .catch(error => {
          const errors = error.response.data.errors;
          dispatch(toggleLoading(false));
          return failedMessage(errors[Object.keys(errors)[0]][0]);

          // err.response.data.errors.email[0] === 'The email has already been taken.' && failedMessage(i18next.t('toast.duplicate_email'));
        });
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    if (await AsyncStorage.getItem('BEARER_TOKEN')) {
      AsyncStorage.removeItem('BEARER_TOKEN').then(() => {
        dispatch(setAllProjects([]));
        dispatch(logoutHandler());
      });
    }
  };
};

export const handleLogin = (data, callback) => {
  return async (dispatch, getState) => {
    dispatch(toggleLoading(true));
    const device = getState().auth.profile.device_name;
    const user = {
      email: data.email,
      password: data.password,
      device_name: device,
    };
    login(user)
      .then(async res => {
        await AsyncStorage.setItem('BEARER_TOKEN', res.data);

        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('USER_EMAIL', user.email);
        await dispatch(initializeAppData());
        callback();
        dispatch(toggleLoading(false));
      })
      .catch(error => {
        const errors = error.response.data.errors;
        dispatch(toggleLoading(false));
        return failedMessage(errors[Object.keys(errors)[0]][0]);
      });
  };
};

export const handleRegister = (user, callback) => {
  return async (dispatch, getState) => {
    const device = getState().auth.profile.device_name;
    dispatch(toggleLoading(true));
    register({
      name: user.name,
      email: user.email,
      device_name: device,
      password: user.password,
      password_confirmation: user.password_confirmation,
    })
      .then(() => {
        successfulMessage(i18next.t('register.modal.success_message'));
        dispatch(toggleLoading(false));
        callback();
      })

      .catch(err => {
        const errors = err.response.data.errors;
        dispatch(toggleLoading(false));
        failedMessage(errors[Object.keys(errors)[0]][0]);
      });
  };
};

export const editPassword = (data, callback) => {
  return async (dispatch, getState) => {
    dispatch(toggleLoading(true));
    const user = getState().auth.profile;
    resetPassword({
      email: user.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      device_name: user.device_name,
    })
      .then(() => {
        dispatch(toggleLoading(false));
        callback();
        return successfulMessage(i18next.t('profile.change_password.success'));
      })
      .catch(err => {
        const errors = err.response.data.message;
        dispatch(toggleLoading(false));
        failedMessage(errors[Object.keys(errors)[0]][0]);
      });
  };
};

export const forgotPasswordSendEmail = (email, callback) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    await forgotPassword(email)
      .then(res => {
        successfulMessage(res.data.message);
        dispatch(toggleLoading(false));

        callback();
      })
      .catch(err => {
        console.log(err.response.data);
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};
