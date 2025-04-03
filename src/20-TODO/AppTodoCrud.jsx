import React, { useEffect, useState } from 'react';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const AppTodoCrud = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editinText, setEditingText] = useState('');
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json)
      .then((data) => console.log(data));
  });
  return <div></div>;
};

export default AppTodoCrud;
