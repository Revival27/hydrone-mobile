import { baseUrl, projectSurveysUrl } from '../../../constants/apiUrls';
import { AddProjectModel } from '../../models/projects/AddProjectModel';
import { AxiosInstance } from '../auth/AxiosInstance';

const projectsUrl = baseUrl + 'projects';

export const getAllProjects = async () => {
  const response = await AxiosInstance.get(projectsUrl);
  return response.data;
};

export const add = async (project: AddProjectModel) => {
  return AxiosInstance.post(projectsUrl, project);
};

export const updateProject = async (id: number, data) => {
  return AxiosInstance.put(projectsUrl + '/' + id, {
    name: data.name,
    description: data.description,
    background_id: data.background_ids,
    survey_ids: data.survey_ids,
  });
};

export const getProjectSurveys = id => {
  return AxiosInstance.get(`${projectSurveysUrl}${id}/get-surveys`);
};

export const getProject = async id => {
  const response = await AxiosInstance.get(projectsUrl + '/' + id);
  return response.data;
};

export const removeProject = async id => {
  return AxiosInstance.delete(projectsUrl + '/' + id);
};
