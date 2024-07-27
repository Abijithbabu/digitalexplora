import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";

export const fetchKyc = async (userId) => {
  try {
    const res = await fetchWrapper.get(`${BASE_URL}/user/kyc/${userId}`);
    const resJson = await res.json();

    if (res.ok) {
      return resJson.data;
    } else if (res.status === 400) {
      console.log("400 bad request", resJson.message);
    } else {
      console.log(resJson.message);
    }
  } catch (error) {
    console.log(error);
  }
};
