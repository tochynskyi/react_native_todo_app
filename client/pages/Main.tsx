import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Auth from "./Auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Todo from "./Todo";
import { check } from "../http/userAPI";
import { FC, useEffect } from "react";
import {
  fetchUserError,
  userLogin,
  userLoginSuccess,
} from "../store/userSlice";

const Main: FC = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch(userLogin());
        const user = await check();
        dispatch(userLoginSuccess(user));
      } catch (e: any) {
        dispatch(fetchUserError(e.response.data.message));
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isAuth ? <Todo /> : <Auth />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
