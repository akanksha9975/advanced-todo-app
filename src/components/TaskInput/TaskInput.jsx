import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskStart } from '../../features/tasks/taskSlice';
import './TaskInput.css';

export default function TaskInput() {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(addTaskStart({ text: taskText, priority }));
      setTaskText('');
      setPriority('Medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}