import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";
import { addTodosDB } from "../../http/todoAPI";
import { ITodo } from "../../interfaces/ITodo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTodo, fetchTodoError } from "../../store/todoSlice";
import RowOptions from "./RowOptions";
import { Colors } from "../../styles/colors";

const todoPriority = [
  { title: "High", number: 1 },
  { title: "Middle", number: 2 },
  { title: "Low", number: 3 },
  { title: "None", number: 4 },
];

interface TodoFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const TodoForm: FC<TodoFormProps> = ({ isOpen, setIsOpen }) => {
  const [value, setValue] = useState<string>("");
  const [priority, setPriority] = useState<number>(todoPriority[3].number);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const createTodo = async () => {
    try {
      if (value && user) {
        const newTodo: ITodo = {
          id: Date.now().toString(),
          author: user.id,
          checked: false,
          title: value,
          priority: priority,
          addDate: dayjs().format(),
        };
        dispatch(addTodo(newTodo));
        await addTodosDB(newTodo);
        setValue("");
        return;
      }
      return console.log("Todo must have title");
    } catch (error: any) {
      dispatch(fetchTodoError(error));
    }
  };

  return (
    <Pressable style={[styles.formOpen, isOpen && styles.open]} onPress={() => setIsOpen(false)}>
        <Pressable
          style={styles.formOpenContent}
          onPress={(e) => e.stopPropagation()}
        >
          <TextInput
            onChangeText={(text) => setValue(text)}
            value={value}
            placeholder={"Enter you task..."}
            style={styles.input}
          />
          <ModalDropdown
            options={todoPriority.map(({ title }) => title)}
            renderRow={RowOptions}
            renderSeparator={() => false}
            onSelect={(idx) => setPriority(+idx + 1)}
            style={[
              styles.modalBtn,
              priority === todoPriority[0].number && {
                backgroundColor: Colors.red,
              },
              priority === todoPriority[1].number && {
                backgroundColor: Colors.yellow,
              },
              priority === todoPriority[2].number && {
                backgroundColor: Colors.green,
              },
              priority === todoPriority[3].number && {
                backgroundColor: Colors.blue,
              },
            ]}
            dropdownStyle={styles.dropdownList}
          >
            <MaterialCommunityIcons
              name="priority-high"
              size={24}
              color="black"
            />
          </ModalDropdown>
          <Pressable style={styles.addBtn} onPress={createTodo}>
            <Entypo name="add-to-list" size={24} color={Colors.white} />
          </Pressable>
        </Pressable>
    
    </Pressable>
  );
};

const styles = StyleSheet.create({
  formOpen: {
    backgroundColor: Colors.black + 'AA',
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    transform: [{ translateY: -1000 }],
  },
  open: {
    transform: [{ translateY: 0 }],
  },
  formOpenContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    height: 60,
    marginRight: 5,
    maxWidth: 500,
    fontSize: 18,
  },
  modalBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 5,
  },

  dropdownList: {
    position: "relative",
    bottom: 0,
    left: 0,
    flex: 1,
    width: "100%",
    backgroundColor: Colors.background,
    paddingHorizontal: 40,
  },

  addBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 15,
    backgroundColor: Colors.primaryBg,
  },
});

export default TodoForm;
