import '../../src/app/globals.css'

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Todo {
  id: string;
  title: string;
  is_complete: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from Supabase
  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*').order('id');
    if (error) console.error('Error fetching todos:', error.message);
    else setTodos(data || []);
  };

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim()) {
      const { error } = await supabase.from('todos').insert([{ title: newTodo }]);
      if (error) console.error('Error adding todo:', error.message);
      else fetchTodos();
      setNewTodo('');
    }
  };

  // Toggle the completion status of a todo
  const toggleComplete = async (id: string, isComplete: boolean) => {
    const { error } = await supabase.from('todos').update({ is_complete: !isComplete }).eq('id', id);
    if (error) console.error('Error updating todo:', error.message);
    else fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) console.error('Error deleting todo:', error.message);
    else fetchTodos();
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">ToDo-App</h1>
  <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">My Tasks</h1>

  {/* Input and Add Button */}
  <div className="flex items-center justify-between mb-6">
    <input
      className="flex-grow bg-gray-100 border border-gray-300 text-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder="Enter a new task..."
    />
    <button
      className="ml-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:from-blue-600 hover:to-blue-700"
      onClick={addTodo}
    >
      Add
    </button>
  </div>

  {/* Todo List */}
  <ul className="divide-y divide-gray-200">
    {todos.map((todo) => (
      <li key={todo.id} className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.is_complete}
            onChange={() => toggleComplete(todo.id, todo.is_complete)}
            className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 transition duration-150"
          />
          <span
            className={`${
              todo.is_complete ? 'line-through text-gray-400' : 'text-gray-800'
            } font-medium`}
          >
            {todo.title}
          </span>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-red-600 transition duration-200"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>

  {/* No Todos Message */}
  {todos.length === 0 && (
    <div className="mt-6 text-center text-gray-500">
      <p>No tasks available. Start adding some!</p>
    </div>
  )}
</div>

  );
}