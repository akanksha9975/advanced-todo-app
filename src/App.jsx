
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom'; // Removed BrowserRouter import
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import './App.css';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Advanced To-Do App</h1>
        {isAuthenticated && <Logout />}
      </header>
      
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <TaskInput />
                <TaskList />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;