import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TaskInput – a controlled component that lets the user type a new task
 * and submit it either by pressing Enter or clicking the Add button.
 *
 * Props
 * -----
 * onAddTask: (title: string) => void
 *   Callback invoked with the trimmed task title when the user submits.
 */
function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      onAddTask(trimmed);
      setTitle('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit} noValidate>
      {/* Visually hidden label for accessibility */}
      <label htmlFor="new-task" className="sr-only">
        New task
      </label>

      <input
        id="new-task"
        type="text"
        className="task-input__field"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
        required
      />

      <button type="submit" className="task-input__button" aria-label="Add task">
        Add
      </button>
    </form>
  );
}

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskInput;