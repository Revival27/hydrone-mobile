export const formatDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};

export const formatTime = (time: Date) => {
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return `${hour <= 9 ? '0' + hour : hour}:${minutes <= 9 ? '0' + minutes : minutes}:${seconds <= 9 ? '0' + seconds : seconds}`;
};

export const formatDateFromBackend = (date: string) => {
  const newDate = date.split('-');
  const [year, month, day] = newDate;
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const dateFormatEnGB = (date: Date) => {
  var month = String(date.getMonth() + 1).padStart(2, '0'); //months from 1-12
  var day = String(date.getDate()).padStart(2, '0');
  var year = date.getFullYear();

  return day + '/' + month + '/' + year;
};

export const dateFormatEnGbBackend = (date: string | undefined) => {
  return date && date.split('-').reverse().join('/');
};
