import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice';
import { droneSlice } from './droneSlice';
import { loadingSlice } from './loadingSlice';
import { locationSlice } from './locationSlice';
import { measurementSlice } from './measurementSlice';
import { projectsSlice } from './projectsSlice';
import { soilSlice } from './soilSlice';
import { surveysSlice } from './surveysSlice';
import { vegetationSlice } from './vegetationSlice';
import { waterSlice } from './waterSlice';

export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    surveys: surveysSlice.reducer,
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
    drone: droneSlice.reducer,
    location: locationSlice.reducer,
    measurement: measurementSlice.reducer,
    soilMeasurement: soilSlice.reducer,
    vegetationMeasurement: vegetationSlice.reducer,
    waterMeasurement: waterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
