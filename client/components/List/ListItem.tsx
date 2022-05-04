import React, { FC, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ITodo } from "../../interfaces/ITodo";
import Checkbox from "react-native-bouncy-checkbox";
import { useAppDispatch } from "../../store/hooks";
import { checkTodosDB } from "../../http/todoAPI";
import { checkTodo } from "../../store/todoSlice";
import { Colors } from "../../styles/colors";
import dayjs from "dayjs";
import PriorityCircle from "../PriorityCircle";

interface TodoProps {
  todo: ITodo;
}

const ListItem: FC<TodoProps> = ({ todo }) => {
  const { id, checked, title, priority, addDate } = todo;
  const dispatch = useAppDispatch();

  const onCheck = () => {
    dispatch(checkTodo(id));
  };

  useEffect(() => {
    checkTodosDB(todo);
  }, [checked]);

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Checkbox
          isChecked={checked}
          useNativeDriver={false}
          onPress={onCheck}
			 iconStyle={styles.checkbox}
			fillColor={Colors.primaryBg}
        />
        <View style={styles.info}>
          <Text style={[styles.title, checked && styles.titleDone]}>{title}</Text>
          <Text style={styles.date}>{dayjs(addDate).format("D MMM")}</Text>
        </View>
        <PriorityCircle priority={priority} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 5,
  },
  checkbox: {
	borderColor: Colors.primaryBg,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.black,
  },
  titleDone: {
	  textDecorationLine: 'line-through',
	  color: Colors.gray,

  },
  date: {
    fontSize: 14,
    color: Colors.gray,
  },
});

export default ListItem;
