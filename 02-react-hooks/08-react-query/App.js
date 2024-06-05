// 08-react-query/App.js
import React from 'react';
import { useQuery } from 'react-query';

const fetchTodo = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return response.json();
};

const Todo = () => {
  const { data, error, isLoading } = useQuery('todo', fetchTodo);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>ID: {data.id}</p>
      <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

const App = () => {
  return <Todo />;
};

export default App;