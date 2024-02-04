import axios from 'axios';

export async function fetchTodos(email, token) {
  const result = await axios.get(`http://localhost:9000/todos/${email}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result.data;
}

export async function createTodo(data, token) {
  try {
    console.log(token);
    const result = await axios.post('https://todo-scheduler-backend.vercel.app/create-todo', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function updateTodo(data, token) {
  try {
    console.log(token);
    const result = await axios.post('http://localhost:9000/update-todo', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getTodo(data, token) {
  try {
    const result = await axios.get(`http://localhost:9000/get-todo/${data}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const todo = result.data[0];
    console.log(todo);
    return todo;
  } catch (e) {
    console.log(e);
  }
}

export const deleteTodoById = async (todoId, token) => {
  try {
    const result = await axios.delete(`http://localhost:9000/delete-todo/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
