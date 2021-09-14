export const storeTask = (() => {
  const tasks = [];

  const store = (task) => tasks.push(task);

  return { tasks, store };
})();

export const storeProject = (() => {
  const projects = [];

  const store = (project) => {
    projects.push(project);
  };

  return { projects, store };
})();
