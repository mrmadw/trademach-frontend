
import axios from "axios";

const apiLogin = axios.create({
  baseURL: "https://trademach-backend-production.up.railway.app/api",
  withCredentials: true,
});

export default apiLogin;