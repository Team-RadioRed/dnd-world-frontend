import axios from "axios";

const defaultURL = "http://127.0.0.1:3000";

export async function requestAxios(url) {
  const response = await axios({
    method: "GET",
    url: `${defaultURL}${url}`,
  }).then((response) => {
    console.log("respons:", response);
    return response.data;
  });

  return response;
}
