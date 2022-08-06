export const queryParams = (queryString) => {
  let query = queryString.slice(1);
  let queryList = query.split("&");
  const result = {};

  queryList.forEach((element) => {
    const temp = element.split("=");
    result[temp[0]] = temp[1];
    // if (temp)
  });
  return result;
};
