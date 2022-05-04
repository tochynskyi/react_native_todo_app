import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import ListItem from "./ListItem";
import { deleteTodosDB } from "../../http/todoAPI";
import { deleteTodo } from "../../store/todoSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import HiddenListItem from "./HiddenListItem";

const List: FC = () => {
  const { todos } = useAppSelector((state) => state.todo);
  const [todoId, setTodoId] = useState<string>("");
  const dispatch = useAppDispatch();

  const onRightAction = (id: string) => {
    // This fnc return ListItem ID
    setTodoId(id);
  };

  useEffect(() => {
    const onDelete = async (id: string) => {
      dispatch(deleteTodo(id));
      await deleteTodosDB(id);
    };
    !!todoId && onDelete(todoId);
  }, [todoId]);

  return (
    <View style={styles.container}>
      <SwipeListView
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
        keyExtractor={({ id }) => id}
        renderHiddenItem={HiddenListItem}
        rightActivationValue={-150}
        rightActionValue={-300}
        onRightAction={onRightAction}
        disableRightSwipe
        stopRightSwipe={-300}
        restDisplacementThreshold={100}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginBottom: 10,
    width: "100%",
    maxWidth: 500,
  },
});

export default List;
