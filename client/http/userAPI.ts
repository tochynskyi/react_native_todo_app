import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance, authInstance } from "./index";
import jwtDecode from "jwt-decode";
import { IUser } from "../interfaces/IUser";

const REGISTRATION = "/api/user/registration";
const LOGIN = "/api/user/login";
const CHECK_AUTH = "/api/user/auth";

export const registration = async (
  username: string | number,
  password: string | number
): Promise<IUser> => {
  const { data } = await instance.post(REGISTRATION, {
    username,
    password,
  });
  await AsyncStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (
  username: string | number,
  password: string | number
): Promise<IUser> => {
  const { data } = await instance.post(LOGIN, {
    username,
    password,
  });
  await AsyncStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};

export const check = async (): Promise<IUser> => {
  const { data } = await authInstance.get(CHECK_AUTH);
  await AsyncStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
