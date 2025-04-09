import axios from "axios";
import { API_URL } from "@/storage/constants";

export async function requestAxios(url) {
  const response = await axios({
    method: "GET",
    url: `${API_URL}${url}`,
  }).then((response) => {
    console.log("respons:", response);
    return response.data;
  });

  return response;
}
