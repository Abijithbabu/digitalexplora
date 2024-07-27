import axios from "axios";
import { BASE_URL } from "../config";

const useAxios = (token) => {
  console.log(token);
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export default useAxios;
