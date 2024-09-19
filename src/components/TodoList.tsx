import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos');
      const data = await res.json();
      console.log('Fetched Todos:', data); // Add this line to check the response format
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error('Unexpected response format:', data);
      }
    };

    fetchTodos();
  }, []);

  const handleToggle = async (id: number, completed: boolean) => {
    await fetch('/api/todos/edit', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completed }),
    });

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo))
    );
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/todos/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => handleToggle(todo.id, todo.completed)}>Toggle</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
