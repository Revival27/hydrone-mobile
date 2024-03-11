import { baseUrl } from '../../../constants/apiUrls';
import { AddSurveyModel } from '../../models/surveys/AddSurvey.Model';
import { SurveyModel } from '../../models/surveys/SurveyModel';
import { AxiosInstance } from '../auth/AxiosInstance';

const surveyUrl = baseUrl + 'surveys';
const projectSurveysUrl = `${baseUrl}projects/`;

export const addNewSurvey = async (survey: AddSurveyModel) => {
  return AxiosInstance.post(surveyUrl, survey);
};

export const getProjectSurveys = (id: number) => {
  AxiosInstance.get(`${projectSurveysUrl}${id}/get-surveys`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      console.log('Finally called');
    });
};

export const getAllSurveys = async () => {
  const response = await AxiosInstance.get(surveyUrl);
  return response.data;
};

export const removeSurvey = async id => {
  return AxiosInstance.delete(surveyUrl + '/' + id);
};

export const getSurvey = (id: number) => {
  return AxiosInstance.get(`${surveyUrl}/${id}`);
};

export const updatedSurvey = (id: number, survey: SurveyModel) => {
  return AxiosInstance.put(`${surveyUrl}/${id}`, survey);
};
