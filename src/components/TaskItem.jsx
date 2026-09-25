import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

/**
 * TaskItem component – renders a single task with controls to toggle its
 * completion status and to delete it.
 *
 * @param {Object}   props
 * @param {Object}   props.task        The task object { id, title, isComplete }
 * @param {Function} props.onToggle    Callback invoked with the task id when the
 *                                      completion checkbox is toggled.
 * @param {Function} props.onDelete    Callback invoked with the task id when the
 *                                      delete button is pressed.
 *
 * @returns {JSX.Element}
 */
const TaskItem = ({ task, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li className={`task-item ${task.isComplete ? 'completed' : ''}`}>
      <label className="task-item__label">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={handleToggle}
          className="task-item__checkbox"
          aria-label={`Mark "${task.title}" as ${task.isComplete ? 'incomplete' : 'complete'}`}
        />
        <span className="task-item__title">{task.title}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={handleDelete}
        aria-label={`Delete "${task.title}"`}
      >
        &times;
      </button>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;