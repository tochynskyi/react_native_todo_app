import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../interfaces/ITodo";

interface TodoState {
  loadingTodos: boolean;
  todos: ITodo[];
  todoError: string;
}

const initialState: TodoState = {
  loadingTodos: false,
  todos: [],
  todoError: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodos(state) {
      state.loadingTodos = true;
    },
    fetchTodosSuccess(state, action: PayloadAction<ITodo[]>) {
      state.loadingTodos = false;
      state.todos = action.payload;
    },
    fetchTodoError(state, action: PayloadAction<string>) {
      state.loadingTodos = false;
      state.todoError = action.payload;
    },
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    checkTodo(state, action: PayloadAction<string>) {
      state.todos.map(
        (todo) => todo.id === action.payload && (todo.checked = !todo.checked)
      );
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    sortByPriority(state) {
      state.todos.sort((a, b) => a.priority - b.priority);
    },
    sortByDate(state) {
		 state.todos.sort((a, b) => {
			 const dateA: any = new Date(a.addDate)
			 const dateB: any = new Date(b.addDate)
			return dateB - dateA
		 })
    },
  },
});

export const {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodoError,
  addTodo,
  checkTodo,
  deleteTodo,
  sortByPriority,
  sortByDate,
} = todoSlice.actions;
export default todoSlice.reducer;
