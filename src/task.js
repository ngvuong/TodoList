export function Task(name, notes, date, priority, subtasks = []) {
  const getName = () => name;
  const getNotes = () => notes;
  const getDate = () => date;
  const getPriority = () => priority;
  const getSubtasks = () => subtasks;

  const createSubtask = (subtask) => {
    const subtasks = [];
  };

  return {
    getName,
    getNotes,
    getDate,
    getPriority,
    getSubtasks,
    createSubtask,
  };
}

export function createTaskFromInput() {}
