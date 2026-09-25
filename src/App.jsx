import React, { useState, useCallback, useMemo, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskCounter from './components/TaskCounter';
import './App.css';

/**
 * App – top‑level component for the simple task manager.
 *
 * Manages an array of task objects:
 *   { id: string, title: string, isComplete: boolean }
 *
 * Provides callbacks to add a new task, toggle completion, and delete a task.
 * Renders the input, the list, and the active‑task counter.
 * Persists tasks to localStorage and migrates legacy data.
 */
function App() {
  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------
  const [tasks, setTasks] = useState([]);

  // -------------------------------------------------------------------------
  // Load tasks from localStorage on mount (with migration support)
  // -------------------------------------------------------------------------
  useEffect(() => {
    const raw = localStorage.getItem('tasks');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const migrated = parsed.map((t, idx) => ({
          id: t.id ?? `${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
          title: t.title ?? '',
          isComplete: !!t.isComplete,
        }));
        setTasks(migrated);
      }
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
    }
  }, []);

  // -------------------------------------------------------------------------
  // Persist tasks to localStorage whenever they change
  // -------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  /** Add a new task with a unique id. */
  const handleAddTask = useCallback((title) => {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title,
      isComplete: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  /** Toggle the completion status of a task identified by id. */
  const handleToggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }, []);

  /** Delete a task from the list. */
  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // -------------------------------------------------------------------------
  // Derived data
  // -------------------------------------------------------------------------
  const activeCount = useMemo(
    () => tasks.filter((task) => !task.isComplete).length,
    [tasks]
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="app">
      <h1 className="app__title">Task Manager � Orbit Test</h1>

      <TaskInput onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />

      <TaskCounter activeCount={activeCount} />
    </div>
  );
}

export default App;
