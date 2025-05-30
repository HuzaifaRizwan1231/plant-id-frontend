import axios from "axios";
import { BACKEND_URL } from "../config/constants";

const api = axios.create({
  baseURL: BACKEND_URL,
});

export default api;
