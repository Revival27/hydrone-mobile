// import Geolocation from 'react-native-geolocation-service';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,

  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
