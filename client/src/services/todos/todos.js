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
    const result = await axios.post('http://localhost:9000/create-todo', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
