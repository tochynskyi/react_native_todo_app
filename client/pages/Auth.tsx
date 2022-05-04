import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { registration, login } from "../http/userAPI";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUserError,
  userLogin,
  userLoginSuccess,
} from "../store/userSlice";
import { Colors } from "../styles/colors";

const Auth: FC = () => {
  const { userError } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      if (isLogin) {
        dispatch(userLogin());
        const user = await login(username, password);
        dispatch(userLoginSuccess(user));
        return;
      }
      await registration(username, password);
    } catch (e: any) {
      console.log(e.response.data.message);
      dispatch(fetchUserError(e.response.data.message));
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primaryBg, Colors.white]}
      style={styles.container}
    >
      {!!userError && <Text>{userError}</Text>}
      <Text style={styles.title}>{isLogin ? "Sing in" : "Sign up"}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(username) => setUsername(username)}
        placeholder="Username"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
      />
      <Pressable style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitBtnTitle}>
          {isLogin ? "Entry" : "Create account"}
        </Text>
      </Pressable>
      <View style={styles.choiceWrapper}>
        <Text style={styles.choiceTitle}>
          {isLogin ? "Don`t have an account?" : "Already have an account?"}
        </Text>
        <Pressable
          style={styles.choiceBtn}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.choiceBtnTitle}>
            {isLogin ? "Sign up" : "Sign in"}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 46,
    fontWeight: "700",
    marginBottom: 20,
    color: Colors.white,
  },
  input: {
    fontSize: 18,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: "80%",
    height: 50,
    marginBottom: 15,
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    padding: 5,
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primaryBg,
    borderRadius: 15,
    width: "80%",
    height: 50,
    overflow: "hidden",
  },
  submitBtnTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.white,
  },
  choiceWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "65%",
    marginTop: 20,
  },
  choiceTitle: {
    fontSize: 16,
    marginRight: 10,
    color: Colors.gray,
  },
  choiceBtn: {
    height: 23,
  },
  choiceBtnTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
});

export default Auth;
