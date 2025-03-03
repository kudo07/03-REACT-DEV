import React, { useState } from 'react';

const AppTodo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [editingTodo, setEditingTodo] = useState('');
  const [editingText, setEditingText] = useState('');
  const todosPerPage = 5;
  const addTodo = () => {
    if (newTodo.trim() === '') {
      setError('Todo cannot be empty');
      return;
    }
    if (newTodo.length < 3) {
      setError('todo must be atleast 3 char long');
      return;
    }
    const newTask = { id: Date.now(), text: newTodo, status: 'incomplete' };
    setTodos([newTask, ...todos]);
    setNewTodo('');
    setError('');
  };
  //  save edit
  const saveEdit = (id) => {
    if (editingText.trim() === '') {
      setError('todo cannot be empty');
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingTodo(null);
    setEditingText('');
  };
  // cancel edit
  const cancelEdit = () => {
    setEditingText('');
    setEditingTodo(null);
  };
  //toggle status
  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'complete' ? 'incomplete' : 'complete',
            }
          : todo
      )
    );
  };
  // start editing
  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditingText(todo.text);
  };
  // delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // filtered todos
  const filteredTodos = todos.filter((todo) => {
    return 'ewfd';
  });
  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">TODO APP</h1>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTodo}
          className="cursor-pointer px-4 py-2 bg-orange-400 text-white rounded-2xl"
        >
          ADD
        </button>
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Search by title or number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="p-3 border border-gray-300 mb-3 flex justify-between items-center"
          >
            {editingTodo === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <h1 className={todo.status === 'complete' ? 'line-through' : ''}>
                {todo.text}
              </h1>
            )}
            <div className="flex gap-3">
              {editingTodo === todo.id ? (
                <>
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="px-3 py-1 bg-emerald-400 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={cancelEdit}
                  >
                    Calcel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => toggleStatus(todo.id)}
                    className="px-3 bg-rose-400 text-white rounded"
                  >
                    {todo.status === 'complete' ? 'undo' : 'complete'}
                  </button>
                  <button
                    onClick={() => startEditing(todo)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    DELETE
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppTodo;
