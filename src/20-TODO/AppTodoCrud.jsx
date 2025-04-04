import React, { useEffect, useState } from 'react';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const AppTodoCrud = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editinText, setEditingText] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFileter] = useState('all');
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data.slice(0, 10)));
  }, []);
  const addTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }
    const newEntry = { id: Date.now(), title: newTodo, completed: false };
    setTodos([newEntry, ...todos]);
    setNewTodo('');
  };
  //   delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  //completed count
  const completedCount = todos.filter((todo) => todo.completed).length;
  //   clear Completed
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  //   toggle complete todos
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // filtered todos
  const filteredTodos = todos.filter((todo) => {
    return (
      todo.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed))
    );
  });
  // startEditing
  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };
  // save edit
  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editinText } : todo
      )
    );
    setEditingId(null);
    setEditingText('');
  };
  return (
    <div className="mx-auto min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg flex flex-col w-lg gap-5 mt-10">
        <h2 className="text-xl font-bold mb-4 text-center text-orange-500">
          TODO APP
        </h2>
        {/* add todo */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="enter new taks"
            className="flex-1 p-2 border rounded-lg text-center"
          />
          <button
            onClick={addTodo}
            className="bg-purple-500 text-white px-4 py-4 rounded-lg"
          >
            ADD
          </button>
        </div>
        {/* search */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH TASKS"
            className="p-2 border rounded-lg flex-1"
          />
          <select
            className="p-2 border rounded-lg "
            onChange={(e) => setFileter(e.target.value)}
            value={filter}
          >
            <option value="all">ALL</option>
            <option value="active">ACTIVE</option>
            <option value="completed">COMPLETED</option>
          </select>
        </div>
        {/* table */}
        <div className="mb-4 flex justify-between items-center">
          <span>
            COMPLETED:{completedCount}/{todos.length}
          </span>
          <button onClick={clearCompleted} className="text-rose-400">
            CLEAR COMPLETED
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">TASK</th>
              <th className="p-2">DONE</th>
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id} className="border-t">
                <td
                  className={`p-2 ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {editingId === todo.id ? (
                    <input
                      value={editinText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                      className="p-1 border rounded-lg w-full"
                    />
                  ) : (
                    todo.title
                  )}
                </td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  {editingId === todo.id ? (
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="bg-amber-500 text-black px-3 py-2 rounded-lg"
                    >
                      SAVE
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo.id, todo.title)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                      >
                        EDIT
                      </button>
                      <button onClick={() => deleteTodo(todo.id)}>
                        DELETE
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppTodoCrud;
