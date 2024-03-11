import i18next from 'i18next';

import { createSlice } from '@reduxjs/toolkit';

import {
    addVegetationMeasurement, editVegetationMeasurement, getVegetationMeasurements, removeVegetationMeasurement
} from '../data/api/measurements/vegetationMeasurementsService';
import { VegetationMeasurement } from '../data/models/measurements/VegetationMeasurements';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { toggleLoading } from './loadingSlice';

interface Init {
  vegetationMeasurements: VegetationMeasurement[];
}

const initialState: Init = {
  vegetationMeasurements: [],
};

export const vegetationSlice = createSlice({
  name: 'vegetationMeasurement',
  initialState: initialState,
  reducers: {
    setAllMeasurements: (state, action) => {
      state.vegetationMeasurements = action.payload;
    },
    append: (state, action) => {
      return {
        ...state,
        measurements: [action.payload, ...state.vegetationMeasurements],
      };
    },
    edit: (state, action) => {
      const id = Number(action.payload.id);
      const data = action.payload;
      const measurementToUpdate = state.vegetationMeasurements.find(p => p.id === id);
      const updatedMeasurement = {
        ...measurementToUpdate,
        foliage: data.foliage,
        undergrowth: data.undergrowth,
        wildLife: data.wildLife,
        replace: data.replantation,
        description: data.description,
      };
      state.vegetationMeasurements = state.vegetationMeasurements.map(measurement => (measurement.id === id ? { ...measurement, ...updatedMeasurement } : measurement));
    },
    remove: (state, action) => {
      const id = action.payload;
      state.vegetationMeasurements = state.vegetationMeasurements.filter(item => item.id !== id);
    },
  },
});

export const { setAllMeasurements, append, edit, remove } = vegetationSlice.actions;
export default vegetationSlice.reducer;

export const initializeSoilMeasurements = (measurementId: number) => {
  return async dispatch => {
    const measurements = await getVegetationMeasurements(measurementId).catch(res => failedMessage(res));
    dispatch(setAllMeasurements(measurements));
  };
};

export const addVegetation = (vegetation_measurement, id, callback) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    addVegetationMeasurement(vegetation_measurement, id)
      .then(async res => {
        await dispatch(append(res.data));
        successfulMessage(i18next.t('survey_measurement.add_new_measurement_success'));
        callback(res);
        dispatch(toggleLoading(false));
      })
      .catch(() => {
        failedMessage(i18next.t('survey_measurement.add_new_measurement_fail'));
        dispatch(toggleLoading(false));
      });
  };
};
export const editVegetation = ({ vegetationId, data }) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    await editVegetationMeasurement(data, vegetationId)
      .then(res => {
        dispatch(edit(res));
        successfulMessage(i18next.t('survey_measurement.edit_measurement_success'));
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        console.log(err);
        successfulMessage(i18next.t('survey_measurement.edit_measurement_success'));
        dispatch(toggleLoading(false));
      });
  };
};
export const deleteMeasurement = id => {
  return async dispatch => {
    await dispatch(toggleLoading(true));
    await removeVegetationMeasurement(id)
      .then(() => {
        successfulMessage(i18next.t('survey_measurement.delete_measurement_success'));
        dispatch(remove(id));
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};
