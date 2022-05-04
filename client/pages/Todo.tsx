import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import List from "../components/List/List";
import TodoForm from "../components/Form/TodoForm";
import { getTodosDB } from "../http/todoAPI";
import {
  fetchTodoError,
  fetchTodos,
  fetchTodosSuccess,
} from "../store/todoSlice";
import { Colors } from "../styles/colors";

const Todo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading, user, userError } = useAppSelector((state) => state.user);
  const { loadingTodos, todoError } = useAppSelector(
    (state) => state.todo
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTodosFromDB = async () => {
      try {
        if (!!user) {
          dispatch(fetchTodos());
          const todos = await getTodosDB(user);
          dispatch(fetchTodosSuccess(todos));
        }
      } catch (e: any) {
        console.log(e.response.data.message);
        dispatch(fetchTodoError(e));
      }
    };
    getTodosFromDB();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {!!todoError && <Text>{todoError}</Text>}
      {!!userError && <Text>{userError}</Text>}
      {!!loading || (!!loadingTodos && <Text>Loading...</Text>)}
      <Text style={styles.title}>What do you do today?</Text>
      <List />
      <Pressable style={styles.openBtn} onPress={() => setIsOpen(true)}>
        <Ionicons name="add" size={42} color={Colors.white} />
      </Pressable>
      <TodoForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 10,
  },
  openBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: Colors.primaryBg,
    backgroundColor: Colors.primaryBg,
    marginRight: 15,
    marginBottom: 15,
  },
});
export default Todo;
