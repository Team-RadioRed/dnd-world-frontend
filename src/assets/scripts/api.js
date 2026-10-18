import axios from "axios";
const API_URL = import.meta.env.BACKEND_URL;

export async function requestAxios(url, params) {
  const response = await axios({
    method: "GET",
    url: `${API_URL}${url}`,
    params: params,
  }).then((response) => {
    console.log(`response (${url}):`, response);
    return response.data;
  });

  return response;
}
