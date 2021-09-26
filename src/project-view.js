import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";
import { storeTask, storeProject } from "./storage";

export const projectView = (function () {
  const view = document.querySelector(".view");
  // view.textContent = "";

  const heading = document.createElement("h1");
  heading.textContent = "Projects";

  const tasks = storeTask.tasks;
  const taskList = document.createElement("section");
  taskList.classList.add("task-list");
  const projects = tasks.map((task) => task.project.toLowerCase());
  // .filter((task, i) => tasks.indexOf(task) === i);

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
  const renderView = () => {
    view.textContent = "";
    taskList.textContent = "";

    const tasksByProject = makeTasksByProject();

    for (const key in tasksByProject) {
      const project = document.createElement("div");
      project.classList.add("task-group");
      project.textContent = key;
      tasksByProject[key].forEach((task) => {
        const taskItem = buildTaskView(task);
        project.appendChild(taskItem);
      });
      taskList.appendChild(project);
    }
    view.append(heading, taskList);
  };

  function updateView(task) {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "Projects") {
      projectView.renderView();
    }
    renderStats();
  }

  const projectStats = document.querySelector(".project-stats");
  function renderStats() {
    projectStats.textContent = Object.keys(makeTasksByProject()).length;
  }

  // function deleteTask(task) {
  //   renderStats();
  //   updateView();
  // }

  pubsub.subscribe("taskAdded", updateView);
  pubsub.subscribe("taskDeleted", updateView);

  return { renderView, renderStats };
})();
