import i18next from 'i18next';

import { createSlice } from '@reduxjs/toolkit';

import {
    addSoilMeasurement, editSoilMeasurement, getSoilCompactnesses, getSoilCompositions, getSoilMeasurements, getSoilTypes, removeSoilMeasurement
} from '../data/api/measurements/soilMeasurementsService';
import { SoilCompactness, SoilCompositions, SoilMeasurement, SoilTypes } from '../data/models/measurements/SoilMeasurements';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { toggleLoading } from './loadingSlice';

interface Init {
  soilMeasurements: SoilMeasurement[];
  soilTypes: SoilTypes[];
  soilCompactnesses: SoilCompactness[];
  soilCompositions: SoilCompositions[];
}

const initialState: Init = {
  soilMeasurements: [],
  soilTypes: [],
  soilCompactnesses: [],
  soilCompositions: [],
};

export const soilSlice = createSlice({
  name: 'soilMeasurement',
  initialState: initialState,
  reducers: {
    setAllMeasurements: (state, action) => {
      state.soilMeasurements = action.payload;
    },
    setSoilTypes: (state, action) => {
      state.soilTypes = action.payload;
    },
    setSoilCompactnesses: (state, action) => {
      state.soilCompactnesses = action.payload;
    },
    setSoilCompositions: (state, action) => {
      state.soilCompositions = action.payload;
    },
    append: (state, action) => {
      return {
        ...state,
        measurements: [action.payload, ...state.soilMeasurements],
      };
    },
    edit: (state, action) => {
      const id = Number(action.payload.id);
      const data = action.payload;
      const measurementToUpdate = state.soilMeasurements.find(p => p.id === id);
      const updatedMeasurement = {
        ...measurementToUpdate,
        composition_surface_id: data.composition_surface_id,
        composition_half_meter_id: data.composition_half_meter_id,
        composition_one_meter_id: data.composition_one_meter_id,
        compactness_id: data.compactness_id,
        general_quality: data.general_quality,
        description: data.description,
      };
      state.soilMeasurements = state.soilMeasurements.map(measurement => (measurement.id === id ? { ...measurement, ...updatedMeasurement } : measurement));
    },
    remove: (state, action) => {
      const id = action.payload;
      state.soilMeasurements = state.soilMeasurements.filter(item => item.id !== id);
    },
  },
});

export const { setAllMeasurements, setSoilTypes, setSoilCompositions, setSoilCompactnesses, append, edit, remove } = soilSlice.actions;
export default soilSlice.reducer;

export const initializeSoilMeasurements = (measurementId: number) => {
  return async dispatch => {
    const measurements = await getSoilMeasurements(measurementId).catch(res => failedMessage(res));
    dispatch(setAllMeasurements(measurements));
  };
};

export const initializeSoilQuestionnaires = () => {
  return async dispatch => {
    const soilTypes = await getSoilTypes().catch(res => failedMessage(res));
    const soilCompactnesses = await getSoilCompactnesses().catch(res => failedMessage(res));
    const soilCompositions = await getSoilCompositions().catch(res => failedMessage(res));
    dispatch(setSoilTypes(soilTypes));
    dispatch(setSoilCompactnesses(soilCompactnesses));
    dispatch(setSoilCompositions(soilCompositions));
  };
};

export const addSoil = (soil_measurement, id, callback) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    addSoilMeasurement(soil_measurement, id)
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
export const editSoil = ({ soilId, data }) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    await editSoilMeasurement(data, soilId)
      .then(res => {
        dispatch(edit(res));
        successfulMessage(i18next.t('survey_measurement.edit_measurement_success'));
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(toggleLoading(false));
        failedMessage(i18next.t('survey_measurement.edit_measurement_fail'));
        dispatch(toggleLoading(false));
      });
  };
};
export const deleteMeasurement = id => {
  return async dispatch => {
    await dispatch(toggleLoading(true));
    await removeSoilMeasurement(id)
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
