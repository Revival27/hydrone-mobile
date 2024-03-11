import { baseUrl } from '../../../constants/apiUrls';
import { AddMeasurement, EditMeasurement } from '../../models/measurements/AddMeasurement';
import { AxiosFormInstance, AxiosInstance } from '../auth/AxiosInstance';

export const addMeasurement = async (measurement: AddMeasurement) => {
  return AxiosInstance.post(`${baseUrl}measurements`, measurement);
};

export const measurementsURL = `${baseUrl}measurements`;
//get all measurements
export const getAllMeasurements = async () => {
  const response = await AxiosInstance.get(measurementsURL);
  return response.data;
};
//get all measurement types
export const getAllMeasurementTypes = async () => {
  const response = await AxiosInstance.get(`${baseUrl}measurement-types`);
  return response.data;
};
//get images
export const getAllMeasurementImages = async id => {
  const response = await AxiosInstance.get(`${measurementsURL}/${id}/images`);
  return response.data;
};
// get single measurement
export const getMeasurement = async id => {
  const response = await AxiosInstance.get(`${measurementsURL}/${id}`);
  return response.data;
};
//edit measurement
export const updateMeasurement = async (id: number, measurement: EditMeasurement) => {
  return AxiosInstance.put(`${measurementsURL}/${id}`, measurement);
};
//delete measurement
export const removeMeasurement = async id => {
  return AxiosInstance.delete(measurementsURL + '/' + id);
};

//upload images to the measurement
export const uploadImages = async id => {
  return AxiosFormInstance.post(`${baseUrl}measurements/${id}/upload`);
};

export const getImages = async id => {
  const response = await AxiosInstance.get(`${baseUrl}measurements/${id}/images`);
  return response.data;
};

export const deleteImage = async (id, fileId) => {
  return AxiosInstance.delete(`${baseUrl}measurements/${id}/delete-image/${fileId}`);
};

export const uploadVideos = async id => {
  return AxiosFormInstance.post(`${baseUrl}measurements/${id}/upload-video`);
};

export const getVideos = async id => {
  return AxiosInstance.get(`${baseUrl}measurements/${id}/videos`);
};

export const deleteVideo = async (id, fileId) => {
  return AxiosInstance.delete(`${baseUrl}measurements/${id}/delete-video/${fileId}`);
};
