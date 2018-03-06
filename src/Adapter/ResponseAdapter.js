const ConvertResponseToJson = (response) => {

  return response.json().then((responseJson) => {
    return responseJson.data;
  });
}
export default ConvertResponseToJson;