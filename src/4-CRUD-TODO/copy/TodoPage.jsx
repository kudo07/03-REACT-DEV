import React, { useEffect, useState } from 'react';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // add task
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObject = {
      id: Date.now(),
      text: newTask,
      completed: false,
      dueDate: new Date(Date.now() + 60 * 60 * 1000), //1 hour from now
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
    setNewTask('');
  };
  // Toggle complete
  const toggleTask = (id) => {
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  // start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };
  // save edit
  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
  };
  // delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // filter task
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });
  // reminder feature
  useEffect(() => {
    const now = new Date();
    tasks.forEach((task) => {
      if (!task.completed && task.dueDate - now < 10 * 60 * 1000) {
        alert(`Reminder "${task.text} is due soon!`);
      }
    });
  }, [tasks]);
  return (
    <div className="max-w-md mx-auto p-5 bg-gray-100 rounded-lg shadow-lg">
      <h1>todo list</h1>
      <div className="flex gap-2 mb-2">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 flex-grow rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="add  a new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-50 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* filter buttons */}
        <div className="mb-4">
          {['all', 'completed', 'pending'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`mr-2 px-3 py-1 rounded ${
                filter === type ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {/* task list */}
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-2 bg-white mb-2 rounded-2 rounded"
            >
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingId(e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={(e) => e.key === 'enter' && saveEdit(task.id)}
                  autoFocus
                />
              ) : (
                <span className={task.completed ? 'line-through' : ''}>
                  {task.text}
                </span>
              )}
              <div>
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-green-500 mr-2"
                >
                  completed
                </button>
                {editingId === task.id ? (
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="text-blue-500 mr-2"
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-300"
                  >
                    delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
