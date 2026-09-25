import React from 'react';
import PropTypes from 'prop-types';

/**
 * TaskCounter
 *
 * Displays the number of active (incomplete) tasks.
 *
 * @param {Object} props
 * @param {number} props.activeCount - Number of tasks that are not completed.
 * @returns {JSX.Element}
 */
const TaskCounter = ({ activeCount }) => {
  return (
    <div className="task-counter" aria-live="polite">
      {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
    </div>
  );
};

TaskCounter.propTypes = {
  activeCount: PropTypes.number.isRequired,
};

export default TaskCounter;