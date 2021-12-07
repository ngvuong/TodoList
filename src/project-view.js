import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";
import { storeTask, storeProject } from "./storage";

export const projectView = (function () {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Projects";

  const tasks = storeTask.tasks;
  const taskList = document.createElement("section");
  taskList.classList.add("task-list");

  // Arrange tasks into groups by project
  function makeTasksByProject() {
    const obj = tasks.reduce((acc, task) => {
      const project = task.project.toLowerCase();
      if (acc[project]) {
        acc[project].push(task);
      } else acc[project] = [task];

      return acc;
    }, {});

    return obj;
  }

  function renderView() {
    view.textContent = "";
    taskList.textContent = "";

    const tasksByProject = makeTasksByProject();

    for (const key in tasksByProject) {
      const project = document.createElement("div");
      const projectName = document.createElement("div");
      projectName.textContent = key;
      projectName.classList.add("project-name");
      project.classList.add("task-group");
      project.appendChild(projectName);

      tasksByProject[key].forEach((task) => {
        const taskItem = buildTaskView(task);
        project.appendChild(taskItem);
      });
      taskList.appendChild(project);
    }
    view.append(heading, taskList);
  }

  function updateView() {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "Projects") {
      renderView();
    }
    renderStats();
  }

  const projectStats = document.querySelector(".project-stats");
  function renderStats() {
    projectStats.textContent = Object.keys(makeTasksByProject()).length;
  }

  pubsub.subscribe("taskAdded", updateView);
  pubsub.subscribe("taskDeleted", updateView);
  pubsub.subscribe("taskUpdated", updateView);
  pubsub.subscribe("tasksLoaded", updateView);

  return { renderView, renderStats };
})();
