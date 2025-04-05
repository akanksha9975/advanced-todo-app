import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTaskPriority, setFilter } from '../../features/tasks/taskSlice';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import './TaskList.css';

export default function TaskList() {

    const { tasks, currentFilter } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        return task.priority.toLowerCase() === currentFilter.toLowerCase();
    });


    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    return (
        <div className="task-list-container">
            <div className="task-filters">
                <button
                    onClick={() => dispatch(setFilter('all'))}
                    className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        console.log('Setting filter to High');
                        dispatch(setFilter('High'));
                    }}
                    className={`filter-btn ${currentFilter.toLowerCase() === 'high' ? 'active' : ''}`}
                >
                    High
                </button>
                <button
                    onClick={() => {
                        console.log('Setting filter to Medium');
                        dispatch(setFilter('Medium'));
                    }}
                    className={`filter-btn ${currentFilter.toLowerCase() === 'medium' ? 'active' : ''}`}
                >
                    Medium
                </button>
                <button
                    onClick={() => {
                        console.log('Setting filter to Low');
                        dispatch(setFilter('Low'));
                    }}
                    className={`filter-btn ${currentFilter.toLowerCase() === 'low' ? 'active' : ''}`}
                >
                    Low
                </button>
            </div>

            {filteredTasks.length === 0 ? (
                <p className="no-tasks">
                    {tasks.length === 0
                        ? 'No tasks found. Add some tasks!'
                        : `No ${currentFilter} priority tasks found.`}
                </p>
            ) : (
                <ul className="task-list">
                    {filteredTasks.map(task => {
                        return (
                            <li key={task.id} className={`task-item ${getPriorityColor(task.priority)}`}>
                                <div className="task-content">
                                    <span className="task-text">{task.text}</span>
                                    {(
                                        true // Force show for testing
                                    ) && (
                                            <div className="weather-wrapper" style={{ border: '2px solid red' }}>
                                                <WeatherInfo taskText={task.text} />
                                            </div>
                                        )}
                                </div>
                                <div className="task-actions">
                                    <select
                                        value={task.priority}
                                        onChange={(e) => {
                                            console.log('Updating priority:', e.target.value);
                                            dispatch(updateTaskPriority({
                                                id: task.id,
                                                priority: e.target.value
                                            }));
                                        }}
                                        className="priority-select"
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <button
                                        onClick={() => {
                                            console.log('Deleting task:', task.id);
                                            dispatch(deleteTask(task.id));
                                        }}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

// Helper function for weather display logic
function shouldShowWeather(text) {
    const keywords = ['outdoor', 'park', 'hike', 'walk', 'run', 'beach'];
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword));
}