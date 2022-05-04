import { authInstance } from "./index";
import { ITodo } from "../interfaces/ITodo";
import { IUser } from "../interfaces/IUser";

const GET_TODOS = "/api/todos/getTodos/";
const ADD_TODO = "/api/todos/addTodo";
const CHECK_TODO = "/api/todos/checkTodo";
const DELETE_TODO = "/api/todos/deleteTodo/";

export const getTodosDB = async ({
  id,
}: Pick<IUser, "id">): Promise<ITodo[]> => {
  const { data } = await authInstance.get<ITodo[]>(`${GET_TODOS}${id}`);
  return data;
};

export const addTodosDB = async (todo: ITodo) => {
  await authInstance.post(ADD_TODO, todo);
};

export const checkTodosDB = async ({
  id,
  checked,
}: Pick<ITodo, "id" | "checked">) => {
  await authInstance.post(CHECK_TODO, {
    id,
    checked,
  });
};

export const deleteTodosDB = async (id: string) => {
  await authInstance.delete(`${DELETE_TODO}${id}`);
};
