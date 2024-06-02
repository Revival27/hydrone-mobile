import i18next from 'i18next';

import { createSlice } from '@reduxjs/toolkit';

import {
  addMeasurement,
  deleteImage,
  deleteVideo,
  getAllMeasurements,
  getAllMeasurementTypes,
  removeMeasurement,
  updateMeasurement,
} from '../data/api/measurements/measurementsService';
import { Measurement, MeasurementTypes } from '../data/models/measurements/AddMeasurement';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { toggleLoading } from './loadingSlice';
import { initializeSurveys } from './surveysSlice';
import { fetchUserInfo } from '../data/api/auth/authService';

interface Init {
  measurements: Measurement[];
  measurementTypes: MeasurementTypes[];
}
const initialState: Init = {
  measurements: [],
  measurementTypes: [],
};
export const measurementSlice = createSlice({
  name: 'measurement',
  initialState: initialState,
  reducers: {
    setAllMeasurements: (state, action) => {
      state.measurements = action.payload;
    },
    setAllMeasurementTypes: (state, action) => {
      state.measurementTypes = action.payload;
    },
    append: (state, action) => {
      return {
        ...state,
        measurements: [action.payload, ...state.measurements],
      };
    },

    edit: (state, action) => {
      const id = Number(action.payload.id);
      const data = action.payload;
      const measurementToUpdate = state.measurements.find(p => p.id === id);
      const updatedMeasurement = {
        ...measurementToUpdate,
        id: data.id,
        survey_id: data.survey_id,
        name: data.name,
        description: data.description,
        measurement_type_id: data.measurement_type_id,
        latitude: data.latitude,
        longitude: data.longitude,
        date: data.date,
        time: data.time,
        images: data.images,
        videos: data.videos,
      };
      state.measurements = state.measurements.map(measurement => (measurement.id === id ? { ...measurement, ...updatedMeasurement } : measurement));
    },
    remove: (state, action) => {
      const id = action.payload;
      state.measurements = state.measurements.filter(item => item.id !== id);
    },
  },
});
export const { setAllMeasurements, setAllMeasurementTypes, append, edit, remove } = measurementSlice.actions;
export default measurementSlice.reducer;

export const initializeMeasurements = () => {
  return async dispatch => {
    const measurements = await getAllMeasurements().catch(res => failedMessage(res));
    dispatch(setAllMeasurements(measurements));
  };
};

export const initializeMeasurementTypes = () => {
  return async dispatch => {
    const measurementTypes = await getAllMeasurementTypes().catch(res => failedMessage(res));
    dispatch(setAllMeasurementTypes(measurementTypes));
  };
};

export const add = (data, callback) => {
  return async (dispatch, getState) => {
    dispatch(toggleLoading(true));

    const measurements = getState().measurement.measurements.filter(item => item.measurement_type_id === data.measurement_type_id);
    //boolean: checking for duplicate
    let isTaken = measurements.some(measurement => measurement.name === data.name);

    if (isTaken) {
      dispatch(toggleLoading(false));
      return failedMessage(i18next.t('toast.duplicate'));
    }

    const resposne = await fetchUserInfo();
    const { id } = resposne.data;
    console.log(id);
    const payload = {
      ...data,
      user_id: id,
    };
    console.log(payload);
    addMeasurement(payload)
      .then(async res => {
        await dispatch(append(res.data));
        successfulMessage(i18next.t('survey_measurement.add_new_measurement_success'));

        dispatch(initializeSurveys());
        dispatch(toggleLoading(false));
        callback(res.data);
      })
      .catch(err => {
        console.log(err);
        failedMessage(i18next.t('survey_measurement.add_new_measurement_fail'));
        dispatch(toggleLoading(false));
      });
  };
};
export const editMeasurement = ({ id, data }) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    await updateMeasurement(id, data)
      .then(res => {
        dispatch(edit(res.data));
        successfulMessage(i18next.t('survey_measurement.edit_measurement_success'));
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(toggleLoading(false));
        failedMessage(i18next.t('survey_measurement.edit_measurement_fail'));
      });
  };
};
export const deleteMeasurement = (id, callback) => {
  return async dispatch => {
    await dispatch(toggleLoading(true));
    await removeMeasurement(id)
      .then(() => {
        successfulMessage(i18next.t('survey_measurement.delete_measurement_success'));
        dispatch(remove(id));
        dispatch(initializeSurveys());
        dispatch(toggleLoading(false));
        callback();
      })
      .catch(err => {
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};

export const deleteMeasurementImage = payload => {
  const { id, fileId, measurement } = payload;

  return async dispatch => {
    dispatch(toggleLoading(true));
    await deleteImage(id, fileId)
      .then(() => {
        successfulMessage(i18next.t('toast.success_photo_delete'));
        dispatch(edit(measurement));
        dispatch(initializeSurveys());
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};
export const deleteMeasurementImageV2 = payload => {
  const { id, fileId, measurement } = payload;

  return async dispatch => {
    dispatch(toggleLoading(true));
    await deleteImage(id, fileId)
      .then(() => {
        successfulMessage(i18next.t('toast.success_photo_delete'));
        dispatch(edit(measurement));
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};

export const deleteMeasurementVideo = payload => {
  const { id, fileId, measurement } = payload;

  return async dispatch => {
    dispatch(toggleLoading(true));
    await deleteVideo(id, fileId)
      .then(() => {
        successfulMessage('Successfully Deleted Video');
        dispatch(edit(measurement));
        dispatch(initializeSurveys());
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};
