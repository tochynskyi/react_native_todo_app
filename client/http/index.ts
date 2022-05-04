import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const TODO_APP_API_URL = "http://localhost:4000";

export const instance = axios.create({
  baseURL: TODO_APP_API_URL,
});
export const authInstance = axios.create({
  baseURL: TODO_APP_API_URL,
});

const authInterceptors = async (config) => {
  const token = await AsyncStorage.getItem("token").then((data) => data);
  config.headers.authorization = `Bearer ${token}`;
  return config;
};

authInstance.interceptors.request.use(authInterceptors);
