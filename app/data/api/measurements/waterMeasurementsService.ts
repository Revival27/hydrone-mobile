import { baseUrl } from '../../../constants/apiUrls';
import { AddWaterMeasurement, EditWaterMeasurement } from '../../models/measurements/WaterMeasurement';
import { AxiosInstance } from '../auth/AxiosInstance';

export const getWaterMeasurements = async (measurementId: number) => {
  const response = await AxiosInstance.get(`${baseUrl}measurements/${measurementId}/water-questionnaires`);
  return response.data;
};

export const getWaterMeasurement = async (id: number) => {
  const response = await AxiosInstance.get(`${baseUrl}water-questionnaires/${id}`);
  return response.data;
};

export const getWaterDischarges = async () => {
  const response = await AxiosInstance.get(`${baseUrl}water-discharges`);
  return response.data;
};

export const getWaterLevels = async () => {
  const response = await AxiosInstance.get(`${baseUrl}water-levels`);
  return response.data;
};

export const addWaterMeasurement = async (waterMeasurement: AddWaterMeasurement, measurementId: number) => {
  const response = await AxiosInstance.post(`${baseUrl}measurements/${measurementId}/water-questionnaires`, waterMeasurement);
  return response.data;
};

export const editWaterMeasurement = async (waterMeasurement: EditWaterMeasurement, waterId: number) => {
  const response = await AxiosInstance.put(`${baseUrl}water-questionnaires/${waterId}`, waterMeasurement);
  return response.data;
};

export const removeWaterMeasurement = async (id: number) => {
  const response = await AxiosInstance.delete(`${baseUrl}water-questionnaires/${id}`);
  return response.data;
};
