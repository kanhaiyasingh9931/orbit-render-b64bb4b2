import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import './TaskList.css';

/**
 * TaskList component – renders a list of TaskItem components.
 *
 * @param {Object}   props
 * @param {Array}    props.tasks        Array of task objects { id, title, isComplete }.
 * @param {Function} props.onToggle     Callback invoked with a task id when its
 *                                      completion status changes.
 * @param {Function} props.onDelete     Callback invoked with a task id when it
 *                                      should be removed.
 *
 * @returns {JSX.Element}
 */
const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (!tasks.length) {
    return <p className="task-list__empty">No tasks – add one above!</p>;
  }

  return (
    <ul className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;