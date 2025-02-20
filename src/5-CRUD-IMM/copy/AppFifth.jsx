import React, { useState } from 'react';

const AppFifth = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  // add task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };
  console.log(tasks);

  // delete
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // toggle
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  // start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // save editing
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: editText } : task))
    );
    setEditText(null);
    setEditingId(null);
  };
  return (
    <div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="new task"
      />
      <button onClick={addTask}>addtask</button>
      {tasks.map((task) => (
        <div id={task.id}>
          {editingId === task.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              className={task.completed ? 'line-through text-gray-500' : ''}
            >
              {task.text}
              {console.log(tasks)}
            </span>
          )}
          <div className="flex gap-4">
            {editingId === task.id ? (
              <button onClick={() => saveEdit(task.id)}>save</button>
            ) : (
              <>
                <button onClick={() => toggleComplete(t.id)}>complete</button>
                <button onClick={() => startEditing(task.id, task.text)}>
                  edit
                </button>
                <button onClick={() => deleteTask(task.id)}>delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppFifth;
