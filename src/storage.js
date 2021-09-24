import { pubsub } from "./pubsub";
export const storeTask = (() => {
  const tasks = [];

  const store = (...task) => tasks.push(...task);
  const modify = (task) => {
    console.log(tasks.findIndex((t) => t === task));
  };
  pubsub.subscribe("taskChecked", modify);
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
