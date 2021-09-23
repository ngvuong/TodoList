export const storeTask = (() => {
  const tasks = [];

  const store = (...task) => tasks.push(...task);

  return { tasks, store };
})();

export const storeProject = (() => {
  const projects = [];

  const store = (...project) => {
    [...project].forEach((project) => {
      project = project.toLowerCase();
      if (!projects.includes(project)) {
        projects.push(project);
      }
    });
    // projects.push(...project.toLowerCase());
  };

  return { projects, store };
})();
