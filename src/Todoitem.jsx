import React, { useState } from 'react';

function TodoItem({ task, index, updateTask, deleteTask, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleSave = () => {
    updateTask(index, editValue);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(index)}
      />
      {isEditing ? (
        <>
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSave}>💾</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => deleteTask(index)}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;