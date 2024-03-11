import i18next from 'i18next';

import { createSlice } from '@reduxjs/toolkit';

import {
    addWaterMeasurement, editWaterMeasurement, getWaterDischarges, getWaterLevels, getWaterMeasurements, removeWaterMeasurement
} from '../data/api/measurements/waterMeasurementsService';
import { WaterDischarge, WaterLevel, WaterMeasurement } from '../data/models/measurements/WaterMeasurement';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { toggleLoading } from './loadingSlice';

interface Init {
  waterMeasurements: WaterMeasurement[];
  waterDischarges: WaterDischarge[];
  waterLevels: WaterLevel[];
}

const initialState: Init = {
  waterMeasurements: [],
  waterDischarges: [],
  waterLevels: [],
};

export const waterSlice = createSlice({
  name: 'waterMeasurement',
  initialState: initialState,
  reducers: {
    setAllMeasurements: (state, action) => {
      state.waterMeasurements = action.payload;
    },
    setWaterDischarges: (state, action) => {
      state.waterDischarges = action.payload;
    },
    setWaterLevels: (state, action) => {
      state.waterLevels = action.payload;
    },
    append: (state, action) => {
      return {
        ...state,
        measurements: [action.payload, ...state.waterMeasurements],
      };
    },
    edit: (state, action) => {
      const id = Number(action.payload.id);
      const data = action.payload;
      const measurementToUpdate = state.waterMeasurements.find(p => p.id === id);
      const updatedMeasurement = {
        ...measurementToUpdate,
        water_level_id: data.water_level_id,
        water_discharge_id: data.water_discharge_id,
        water_discharge_speed: data.water_discharge_speed,
        river_width_enough: data.river_width_enough,
        river_width_length: data.river_width_length,
        river_bed: data.river_bed,
        river_wall: data.river_wall,
        river_wall_color: data.river_wall_color,
        wildlife: data.wildlife,
        description: data.description,
      };
      state.waterMeasurements = state.waterMeasurements.map(measurement => (measurement.id === id ? { ...measurement, ...updatedMeasurement } : measurement));
    },
    remove: (state, action) => {
      const id = action.payload;
      state.waterMeasurements = state.waterMeasurements.filter(item => item.id !== id);
    },
  },
});

export const { setAllMeasurements, setWaterDischarges, setWaterLevels, append, edit, remove } = waterSlice.actions;
export default waterSlice.reducer;

export const initializeWaterMeasurements = (measurementId: number) => {
  return async dispatch => {
    const measurements = await getWaterMeasurements(measurementId).catch(res => failedMessage(res));
    dispatch(setAllMeasurements(measurements));
  };
};

export const initializeWaterQuestionnaires = () => {
  return async dispatch => {
    const waterDischarges = await getWaterDischarges().catch(res => failedMessage(res));
    const waterLevels = await getWaterLevels().catch(res => failedMessage(res));
    dispatch(setWaterDischarges(waterDischarges));
    dispatch(setWaterLevels(waterLevels));
  };
};

export const addWater = (water_measurement, id, callback) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    addWaterMeasurement(water_measurement, id)
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
export const editWater = (id, data) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    await editWaterMeasurement(data, id)
      .then(async res => {
        await dispatch(edit(res));
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
    await removeWaterMeasurement(id)
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
