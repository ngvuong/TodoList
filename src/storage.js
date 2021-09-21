export const storeTask = (() => {
  const tasks = [];

  const store = (...task) => tasks.push(...task);

  return { tasks, store };
})();

export const storeProject = (() => {
  const projects = [];

  const store = (...project) => {
    [...project].forEach((project) => {
      if (!projects.includes(project)) {
        projects.push(project.toLowerCase());
      }
    });
    // projects.push(...project.toLowerCase());
  };

  return { projects, store };
})();
