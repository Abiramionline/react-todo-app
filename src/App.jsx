import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const updateTask = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true :
    filter === 'completed' ? task.completed :
    !task.completed
  );

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <TodoItem
            key={index}
            task={task}
            index={index}
            updateTask={updateTask}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;