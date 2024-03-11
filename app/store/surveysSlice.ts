import i18next from 'i18next';

import { createSlice } from '@reduxjs/toolkit';

import { addNewSurvey, getAllSurveys, removeSurvey, updatedSurvey } from '../data/api/surveys/surveyServices';
import { SurveyModel } from '../data/models/surveys/SurveyModel';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { toggleLoading } from './loadingSlice';
import { initializeProjects } from './projectsSlice';

interface Init {
  surveys: SurveyModel[];
}

const initialState: Init = {
  surveys: [],
};

export const surveysSlice = createSlice({
  name: 'surveys',
  initialState: initialState,
  reducers: {
    setAllSurveys: (state, action) => {
      state.surveys = action.payload;
    },

    append: (state, action) => {
      return {
        ...state,
        surveys: [action.payload, ...state.surveys],
      };
    },

    edit: (state, action) => {
      const id = Number(action.payload.id);
      const data = action.payload.data;
      const surveyToUpdate = state.surveys.find(p => p.id === id);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const updatedSurvey = {
        ...surveyToUpdate,
        ...data,
      };

      state.surveys = state.surveys.map(survey => (survey.id === id ? { ...survey, ...updatedSurvey } : survey));
    },

    remove: (state, action) => {
      const id = action.payload;
      state.surveys = state.surveys.filter(item => item.id !== id);
    },

    searchSurveys: (state, action) => {
      const filtered = state.surveys.filter(project => project.name?.toLowerCase().includes(action.payload.toLowerCase()));
      return {
        ...state,
        filteredSurveys: action.payload.length > 0 ? filtered : [...state.surveys],
      };
    },
  },
});

export const { setAllSurveys, append, edit, remove, searchSurveys } = surveysSlice.actions;

export default surveysSlice.reducer;

export const initializeSurveys = () => {
  return async dispatch => {
    const surveys = await getAllSurveys();
    dispatch(setAllSurveys(surveys));
  };
};

export const addSurvey = (content, callBack) => {
  return async (dispatch, getState) => {
    const surveys = getState().surveys.surveys;
    let isTaken = surveys.some(survey => survey.name === content.name);
    let emptyFields = content.name === '' || content.description === '';
    if (emptyFields) {
      failedMessage(i18next.t('toast.empty_fields'));
      dispatch(toggleLoading(false));
    } else if (isTaken) {
      failedMessage(i18next.t('toast.duplicate'));
      dispatch(toggleLoading(false));
    } else {
      await dispatch(toggleLoading(true));
      await addNewSurvey(content)
        .then(res => {
          dispatch(append(res.data));
          dispatch(initializeProjects());
          successfulMessage(i18next.t('survey.new_survey.add_success'));
          dispatch(toggleLoading(false));
          callBack();
        })
        .catch(err => {
          const errors = err.response.data.errors;
          failedMessage(errors[Object.keys(errors)[0]][0]);
          dispatch(toggleLoading(false));
        });
    }
  };
};

export const deleteSurvey = id => {
  return async dispatch => {
    await dispatch(toggleLoading(true));

    await removeSurvey(id)
      .then(() => {
        successfulMessage(i18next.t('survey.one_survey.modal.success_delete'));
        dispatch(remove(id));
        dispatch(initializeProjects());
        dispatch(toggleLoading(false));
      })
      .catch(err => {
        failedMessage(err.response.data.message);
        dispatch(toggleLoading(false));
      });
  };
};

export const editSurvey = (id: number, data, callBack?) => {
  return async (dispatch, getState) => {
    let emptyFields = data.name === '' || data.description === '';
    const surveys = getState().surveys.surveys;
    let isTaken = surveys.some(survey => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      survey.name.includes(data.name) && survey.description === data.description;
    });

    const surveyToUpdate = surveys.find(survey => survey.id === id);
    await dispatch(toggleLoading(true));

    const newSurvey = {
      ...surveyToUpdate,
      name: data.name,
      description: data.description,
      updated_at: data.updated_at,
      project_ids: data.project_ids,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    if (emptyFields) {
      dispatch(toggleLoading(false));
      failedMessage(i18next.t('toast.empty_fields'));
    } else if (
      surveyToUpdate.name === data.name &&
      surveyToUpdate.description === data.description &&
      surveyToUpdate.longitude === data.longitude &&
      surveyToUpdate.latitude === data.latitude
    ) {
      dispatch(toggleLoading(false));
      failedMessage(i18next.t('toast.no_change'));
    } else if (isTaken) {
      dispatch(toggleLoading(false));
      failedMessage(i18next.t('toast.duplicate'));
    } else {
      await updatedSurvey(id, newSurvey)
        .then(() => {
          successfulMessage(i18next.t('project.one_project.modal.edit_success'));
          dispatch(initializeSurveys());
          dispatch(toggleLoading(false));
          callBack();
        })
        .catch(err => {
          dispatch(toggleLoading(false));
          failedMessage(err.response.data.message);
        });
    }
  };
};
