import axios from "axios";
import { BASE_URL } from "../config";

const token =
  typeof window !== "undefined" ? window.localStorage.getItem("token") : "";

const axiosIntance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: token ? token : "",
  },
});

export default axiosIntance;
