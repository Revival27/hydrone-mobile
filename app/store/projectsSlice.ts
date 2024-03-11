import i18next from 'i18next';

import { createSlice } from '@reduxjs/toolkit';

import { IProject } from '../context/ProjectProvider';
import { add, getAllProjects, removeProject, updateProject } from '../data/api/projects/projectsService';
import { AddProjectModel } from '../data/models/projects/AddProjectModel';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import { toggleLoading } from './loadingSlice';

interface Init {
  projects: IProject[];
}
const initialState: Init = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,

  reducers: {
    setAllProjects: (state, action) => {
      state.projects = action.payload;
    },
    append: (state, action) => {
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    },

    edit: (state, action) => {
      const id = Number(action.payload.id);
      const data = action.payload;
      const projectToUpdate = state.projects.find(p => p.id === id);
      const updatedProject = {
        ...projectToUpdate,
        id: data.id,
        name: data.name,
        location_name: data.location_name,
        project_date: data.project_date,
        description: data.description,
        updated_at: data.updated_at,
        background_id: data.background_id,
        surveys: data.surveys,
      };

      state.projects = state.projects.map(project => (project.id === id ? { ...project, ...updatedProject } : project));
    },
    remove: (state, action) => {
      const id = action.payload;
      state.projects = state.projects.filter(item => item.id !== id);
    },
  },
});

export const { append, setAllProjects, edit, remove } = projectsSlice.actions;

export default projectsSlice.reducer;

export const initializeProjects = () => {
  return async dispatch => {
    const projects = await getAllProjects().catch(err => failedMessage(err));
    dispatch(setAllProjects(projects));
  };
};
export const addProject = (content: AddProjectModel) => {
  return async (dispatch, getState) => {
    dispatch(toggleLoading(true));
    //projects state
    const projects = getState().projects.projects;
    //boolean: checking for duplicate
    let isTaken = projects.some(project => project.name === content.name);
    //checking for empty fields
    let emptyFields = content.name === '' || content.description === '';
    if (emptyFields) {
      dispatch(toggleLoading(false));

      return failedMessage(i18next.t('toast.empty_fields'));
    } else if (isTaken) {
      dispatch(toggleLoading(false));

      return failedMessage(i18next.t('toast.duplicate'));
    } else {
      const res = await add(content);
      await dispatch(append(res.data));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.status === 201 && successfulMessage(i18next.t('project.new_project.add_success'));
      dispatch(toggleLoading(false));
      return res.status;
    }
  };
};

export const editProject = (id: number, data, callback) => {
  return async (dispatch, getState) => {
    await dispatch(toggleLoading(true));
    let emptyFields = data.name === '' || data.description === '';
    const projects = getState().projects.projects;
    let isTaken =
      projects.some(project => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        project.name.includes(data.name) && project.description === data.description;
      }) && data.survey_ids.length === 0;
    const projectToUpdate = projects.find(project => project.id === id);
    // checking for empty strings
    if (emptyFields) {
      await dispatch(toggleLoading(false));
      return failedMessage(i18next.t('toast.empty_fields'));
    }
    // checkoing for change on data
    else if (projectToUpdate.name === data.name && projectToUpdate.description === data.description && projectToUpdate.surveys.length === data.survey_ids.length) {
      dispatch(toggleLoading(false));
      failedMessage(i18next.t('toast.no_change'));
    }
    // checking whether the new name is already taken
    else if (isTaken) {
      dispatch(toggleLoading(false));
      failedMessage(i18next.t('toast.duplicate'));
    }
    // dispatching action if above conditions are not met
    else {
      await updateProject(id, data)
        .then(res => {
          dispatch(edit(res.data));
          successfulMessage(i18next.t('project.one_project.modal.edit_success'));
          dispatch(toggleLoading(false));
          callback();
        })
        .catch(err => {
          console.log(err);

          dispatch(toggleLoading(false));
          failedMessage(err.response.data.message);
        });
    }
  };
};

export const deleteProject = (id, callback) => {
  return async dispatch => {
    await dispatch(toggleLoading(true));

    await removeProject(id)
      .then(() => {
        successfulMessage(i18next.t('project.one_project.modal.success_delete'));
        dispatch(remove(id));
        dispatch(toggleLoading(false));
        callback();
      })
      .catch(err => {
        failedMessage(err.response.data.message);
      });
  };
};
