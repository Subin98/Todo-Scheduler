import axios from 'axios';
export async function fetchTodos(email, token) {
  const result = await axios.get(`https://todo-scheduler-backend.vercel.app/todos/${email}`, {
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
