export const elementIsValid = (el): boolean => {
  if (el !== undefined && el !== null && el !== '' && el !== 0) {
    return true;
  }
  return false;
};

export const validateProps = (...props: any[]): boolean => props.every(prop => elementIsValid(prop));
