import { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/getTodos');
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const toggleTodo = async (id, completed) => {
    await fetch('/api/updateTodo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completed }),
    });
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
  };

  const deleteTodo = async (id) => {
    await fetch('/api/deleteTodo', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => toggleTodo(todo.id, todo.completed)}>Toggle</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
