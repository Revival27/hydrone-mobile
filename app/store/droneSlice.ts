import { createSlice } from '@reduxjs/toolkit';
import { toggleLoading } from './loadingSlice';

const initialState = {
  device: '',
  battery: 0,
  flightTime: {
    hrs: 0,
    min: 0,
  },
  connected: false,
  removed: false,
};

export const droneSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    initializeDrone: (state, action) => {
      state.connected = action.payload.connected;
      state.device = action.payload.device;
      state.battery = action.payload.battery;
      state.flightTime = action.payload.flightTime;
    },
    disconnect: state => {
      state.battery = initialState.battery;
      state.device = initialState.device;
      state.connected = initialState.connected;
      state.flightTime = initialState.flightTime;
    },
    remove: state => {
      state.removed = true;
      state.connected = false;
    },
    addDevice: state => {
      state.removed = false;
    },
  },
});

export const { initializeDrone, disconnect, remove, addDevice } = droneSlice.actions;
export default droneSlice.reducer;

export const disconnectDrone = () => {
  return async dispatch => {
    dispatch(toggleLoading(true));

    //drone disconnect function, now mimicking it with setTimeout
    setTimeout(() => {
      dispatch(disconnect());
      dispatch(toggleLoading(false));
    }, 500);
  };
};

export const connectDrone = () => {
  return async dispatch => {
    // dispatch(toggleLoading(true));
    //drone connect function, now mimicking it with setTimeout
    // will get droneData here
    //   await dispatch(addDevice());
    //   await dispatch(
    //     initializeDrone({
    //       device: 'DJI Mavic 3',
    //       connected: true,
    //       battery: 39,
    //       flightTime: { hrs: 2, min: 12 },
    //     }),
    //     dispatch(toggleLoading(false)),
    //   );
    // };
  };
};

export const removeDrone = () => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    await dispatch(remove());
    dispatch(toggleLoading(false));
  };
};
