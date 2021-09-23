import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";
import { storeTask, storeProject } from "./storage";

export const projectView = (function () {
  const view = document.querySelector(".view");
  // view.textContent = "";

  const heading = document.createElement("h1");
  heading.textContent = "Projects";

  const projects = storeProject.projects;
  const tasks = storeTask.tasks;
  const projectList = document.createElement("section");
  projectList.classList.add("project-list");

  const renderView = () => {
    view.textContent = "";
    projectList.textContent = "";

    const tasksByProject = tasks.reduce((acc, task) => {
      const project = task.project.toLowerCase();
      if (acc[project]) {
        acc[project].push(task);
      } else acc[project] = [task];

      return acc;
    }, {});

    for (const key in tasksByProject) {
      const project = document.createElement("div");
      project.textContent = key;

      tasksByProject[key].forEach((task) => {
        const taskItem = buildTaskView(task);
        project.appendChild(taskItem);
      });
      projectList.appendChild(project);
    }
    view.append(heading, projectList);
  };

  function updateView(task) {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "Projects") {
      projectView.renderView();
    }
  }

  const projectStats = document.querySelector(".project-stats");
  function renderStats() {
    projectStats.textContent = projects.length;
  }
  function updateStats() {
    projectStats.textContent = projects.length;
  }
  pubsub.subscribe("taskAdded", updateView, updateStats);

  return { renderView, renderStats };
})();
