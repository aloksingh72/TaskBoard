import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div>
      <h1>My Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}
