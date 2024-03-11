import { Backgrounds } from '../constants/Backgrounds';

export const getRandomIndex = () => {
  return Math.floor((Math.random() * 100) % Backgrounds.length);
};
