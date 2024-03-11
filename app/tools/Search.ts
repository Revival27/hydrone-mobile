export const arraySearch = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  return array.filter(value => {
    return value.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
};
