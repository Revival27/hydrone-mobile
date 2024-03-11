/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseUrl } from '../../../constants/apiUrls';
import { AddSoilMeasurement, EditSoilMeasurement } from '../../models/measurements/SoilMeasurements';
import { AxiosFormInstance, AxiosInstance } from '../auth/AxiosInstance';

export const getSoilMeasurements = async (measurementId: number) => {
  const response = await AxiosInstance.get(`${baseUrl}measurements/${measurementId}/soil-questionnaires`);
  return response.data;
};

export const getSoilTypes = async () => {
  const response = await AxiosInstance.get(`${baseUrl}soil-types`);
  return response.data;
};

export const getSoilCompactnesses = async () => {
  const response = await AxiosInstance.get(`${baseUrl}soil-compactnesses`);
  return response.data;
};

export const getSoilCompositions = async () => {
  const response = await AxiosInstance.get(`${baseUrl}soil-compositions`);
  return response.data;
};

export const getSoilMeasurement = async (id: number) => {
  const response = await AxiosInstance.get(`${baseUrl}soil-questionnaires/${id}`);
  return response.data;
};

export const addSoilMeasurement = async (soilMeasurement: AddSoilMeasurement, measurementId: number) => {
  const response = await AxiosInstance.post(`${baseUrl}measurements/${measurementId}/soil-questionnaires`, soilMeasurement);
  return response.data;
};

export const editSoilMeasurement = async (soilMeasurement: EditSoilMeasurement, soilId: number) => {
  const response = await AxiosInstance.put(`${baseUrl}soil-questionnaires/${soilId}`, soilMeasurement);
  return response.data;
};

export const removeSoilMeasurement = async (id: number) => {
  const response = await AxiosInstance.delete(`${baseUrl}soil-questionnaires/${id}`);
  return response.data;
};
