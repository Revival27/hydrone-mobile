import { baseUrl } from '../../../constants/apiUrls';
import { AddVegetationMeasurement, EditVegetationMeasurement } from '../../models/measurements/VegetationMeasurements';
import { AxiosInstance } from '../auth/AxiosInstance';

export const getVegetationMeasurements = async (measurementId: number) => {
  const response = await AxiosInstance.get(`${baseUrl}measurements/${measurementId}/vegetation-questionnaires`);
  return response.data;
};

export const getVegetationMeasurement = async (id: number) => {
  const response = await AxiosInstance.get(`${baseUrl}vegetation-questionnaires/${id}`);
  return response.data;
};

export const addVegetationMeasurement = async (vegetationMeasurement: AddVegetationMeasurement, measurementId: number) => {
  const response = await AxiosInstance.post(`${baseUrl}measurements/${measurementId}/vegetation-questionnaires`, vegetationMeasurement);
  return response.data;
};

export const editVegetationMeasurement = async (soilMeasurement: EditVegetationMeasurement, vegetationId: number) => {
  const response = await AxiosInstance.put(`${baseUrl}vegetation-questionnaires/${vegetationId}`, soilMeasurement);
  return response.data;
};

export const removeVegetationMeasurement = async (id: number) => {
  const response = await AxiosInstance.delete(`${baseUrl}vegetation-questionnaires/${id}`);
  return response.data;
};
