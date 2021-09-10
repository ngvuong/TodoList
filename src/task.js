export function Task(name, notes, date, project, priority, subtasks = []) {
  const getName = () => name;
  const getNotes = () => notes;
  const getDate = () => date;
  const getProject = () => project;
  const getPriority = () => priority;
  const getSubtasks = () => subtasks;

  const createSubtask = (subtask) => {
    const subtasks = [];
  };

  return {
    getName,
    getNotes,
    getDate,
    getProject,
    getPriority,
    getSubtasks,
    createSubtask,
  };
}

export function createTaskFromInput() {}

export function taskList() {}
